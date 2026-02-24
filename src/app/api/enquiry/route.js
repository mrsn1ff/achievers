import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import Otp from "@/models/Otp";

/* ===========================
   POST - Save New Enquiry
=========================== */
export async function POST(req) {
  try {
    await connectDB();

    const { name, phone, className } = await req.json();

    // ✅ Check OTP verified
    const otpRecord = await Otp.findOne({
      phone,
      isVerified: true,
    });

    if (!otpRecord) {
      return Response.json(
        { success: false, message: "Phone not verified" },
        { status: 400 }
      );
    }

    /* =============================
       ✅ SAVE IN DATABASE
    ============================== */
    const saved = await Enquiry.create({
      name,
      phone,
      className,
    });

    /* =============================
       ✅ SEND DATA TO PABBLY WEBHOOK
    ============================== */
    try {
      await fetch(
        "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjcwNTZjMDYzZTA0MzE1MjZiNTUzMTUxMzMi_pc",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            phone: phone,
            className: className,
            source: "Website Enquiry",
            createdAt: new Date().toISOString(),
          }),
        }
      );
    } catch (webhookError) {
      console.log("Pabbly webhook error:", webhookError.message);
      // ❗ Do NOT break main flow if webhook fails
    }

    /* =============================
       ✅ SEND APPROVED TEMPLATE SMS
    ============================== */
    const message = `Dear ${name}, Thank you for showing interest in ${className}. Your enquiry has been received. Our team will contact you shortly. For any query or discussion, feel free to contact us. AC: 8802666661 | DC: 9599454547 – JR Classes`;

    const smsUrl = `https://api.datagenit.com/sms?auth=D!~9470KFxSoomlA0&msisdn=${phone}&senderid=ECOCLS&message=${encodeURIComponent(message)}`;

    await fetch(smsUrl);

    /* =============================
       ✅ CLEANUP OTP
    ============================== */
    await Otp.deleteMany({ phone });

    return Response.json(
      { success: true, data: saved },
      { status: 201 }
    );

  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/* ===========================
   GET - Fetch All Enquiries
=========================== */
export async function GET() {
  try {
    await connectDB();

    const enquiries = await Enquiry.find({})
      .sort({ createdAt: -1 });

    return Response.json(
      { success: true, count: enquiries.length, data: enquiries },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET ERROR:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
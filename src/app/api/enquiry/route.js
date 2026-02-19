import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

/* ===========================
   POST - Save New Enquiry
=========================== */
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const saved = await Enquiry.create({
      name: body.name,
      phone: body.phone,
      message: body.message,
    });

    /* 🔔 Send data to Pabbly Webhook */
    try {
      await fetch(
        "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjcwNTZjMDYzZTA0MzE1MjZiNTUzMTUxMzMi_pc",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: saved.name,
            phone: saved.phone,
            message: saved.message,
            createdAt: saved.createdAt,
          }),
        }
      );
    } catch (webhookError) {
      console.error("Pabbly Webhook Error:", webhookError);
      // webhook fail ho jaye tab bhi enquiry save rahegi
    }

    return Response.json(
      { success: true, data: saved },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST ERROR:", error);
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

    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });

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

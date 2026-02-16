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

    const enquiries = await Enquiry.find({})
      .sort({ createdAt: -1 }); // latest first

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

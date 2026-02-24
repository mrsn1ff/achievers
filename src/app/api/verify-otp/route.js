import { connectDB } from "@/lib/mongodb";
import Otp from "@/models/Otp";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { phone, otp } = await req.json();

    const record = await Otp.findOne({ phone });

    if (!record) {
      return NextResponse.json(
        { success: false, message: "OTP expired" },
        { status: 400 }
      );
    }

    if (record.otp !== otp) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP" },
        { status: 400 }
      );
    }

    record.isVerified = true;
    await record.save();

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
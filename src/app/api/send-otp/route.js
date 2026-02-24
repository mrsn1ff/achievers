import { connectDB } from "@/lib/mongodb";
import Otp from "@/models/Otp";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { phone } = await req.json();

    if (!phone || phone.length !== 10) {
      return NextResponse.json(
        { success: false, message: "Invalid phone number" },
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    await Otp.deleteMany({ phone });

    await Otp.create({
      phone,
      otp,
      expiresAt,
    });

    // 🔥 Replace {#var#} with OTP
    const message = `${otp} is your One Time Password (OTP) for login/signup at ECONOMICS CLASSES. This OTP will only be valid for 10 minutes - ECOBYJR`;

    const smsUrl = `https://api.datagenit.com/sms?auth=D!~9470KFxSoomlA0&msisdn=${phone}&senderid=ECOCLS&message=${encodeURIComponent(message)}`;

    await fetch(smsUrl);

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
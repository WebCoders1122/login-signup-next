import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import bcryptjs from "bcryptjs";
import { User } from "@/model/userModel";
import connectDB from "@/dbConfig/dbConfig";

connectDB();
export async function Post(request: NextRequest) {
  const { email } = await request.json();
  const resetUser = await User.findOne({ email: email });
  if (!resetUser)
    return NextResponse.json(
      { message: "No user found with this email" },
      { status: 404, statusText: "User Not Found" }
    );
  // if user found we'll send an email
  const emailResponse = await sendEmail({
    email,
    emailType: "RESET",
    userID: resetUser._id,
  });
  return emailResponse;
}

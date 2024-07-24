import connectDB from "@/dbConfig/dbConfig";
import { User } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDB(); //this needs in next js to connect DB on every Route of API

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
      status: 200,
      success: true,
      statusText: "Logged out successfully",
    });
    // generating cookie with same name so that it expires immediatley after resetting in browser
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: Date.now(),
    });
    return response;
  } catch (error) {
    return NextResponse.json(error);
  }
}

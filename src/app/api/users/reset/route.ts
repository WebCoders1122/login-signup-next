import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import bcryptjs from "bcryptjs";
export async function Post(request: NextRequest) {
  return <div>route</div>;
}

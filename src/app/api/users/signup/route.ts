import connectDB from "@/dbConfig/dbConfig";
import { User } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDB(); //this needs in next js to connect DB on every Route of API

export async function POST(request: NextRequest) {
  console.log("signup route");
  try {
    const { username, email, password } = await request.json();
    //response for duplicate username or email
    const user = await User.findOne({ email: email });
    if (user) {
      return NextResponse.json(
        { message: "User already Exists" },
        { status: 400 }
      );
    }

    //  else if (user.name === username) {
    //   return NextResponse.json({ message: "username already taken" });
    // }
    //creating hashedPassword and saving user to DB
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    //to send email
    console.log("signup, to be send");
    await sendEmail({ email, emailType: "VERIFY", userID: savedUser._id });
    console.log("signup, emailsent");
    //return response on successful user creation
    return NextResponse.json(
      { savedUser, message: "Registered! Check Email to Verify" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}

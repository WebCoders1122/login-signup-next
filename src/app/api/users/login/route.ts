import connectDB from "@/dbConfig/dbConfig";
import { User } from "@/model/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connectDB(); //this needs in next js to connect DB on every Route of API

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    console.log({ email, password });
    //response for user not found
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return NextResponse.json({ message: "User not Exists" }, { status: 400 });
    }
    console.log("user exists on login");

    //verifying hashedPassword
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword)
      return NextResponse.json(
        {
          message: "Invalid Email or Password",
        },
        { status: 400 }
      );
    console.log("Email and password matched at login");

    // making token for user
    const tokenData = {
      id: user._id,
      email: email,
      username: user.username,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    console.log(token, "Token Value at login");
    // generating response and includig cookie in it
    const response = NextResponse.json(
      { message: "Login Success", username: user.username },
      {
        status: 200,
        statusText: "Logged In successfully",
      }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(error);
  }
}

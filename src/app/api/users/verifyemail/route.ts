import connectDB from "@/dbConfig/dbConfig";
import { User } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB(); //this needs in next js to connect DB on every Route of API

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    // const token = request.nextUrl.searchParams.get("token");
    console.log(token);
    // find user based on token to verify
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    // user not fount or token expired
    if (!user) {
      return NextResponse.json(
        { message: "User not Exists or Link Expired", success: false },
        {
          status: 401,
        }
      );
    }
    //changing properties of user in DB
    console.log("User Found to verify", user);
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    const updateUser = await user.save();
    console.log(updateUser, "updated user");
    //user to be send to front end
    const responseUser = {
      username: updateUser.username,
      email: updateUser.email,
    };
    console.log(responseUser, "response user");
    //return response on successful user verification
    return NextResponse.json(
      { message: "Verified Successfully!", user: responseUser },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

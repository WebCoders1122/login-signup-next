import { getDataFromToken } from "@/helpers/getDataFromToken";
import { User } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    //returning if !token
    if (!token || token === "")
      return NextResponse.json({ message: "Token not found" });
    const userID = getDataFromToken(token);
    const user = await User.findOne({ _id: userID }).select(
      "-password -isVerified -isAdmin -verifyToken -verifyTokenExpiry -__v"
    );
    console.log(user);
    return NextResponse.json(
      { message: "User Found", user: user, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Toekn error" },
      { status: 500, [error]: error.message }
    );
  }
}

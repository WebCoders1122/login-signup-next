import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const publicURI = ["/login", "/signup", "/verifyemail", "/"];

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  const isPublicPath = publicURI.includes(path);
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  NextResponse.next();
}

//mather that will be outside middleware function always

export const config = {
  matcher: ["/profile/:path*"],
};

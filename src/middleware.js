import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");
  const userCookie = req.cookies.get("user");

  if (!token || !userCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const user = JSON.parse(userCookie.value);

  if (
    user.profile_type === "barbeiro" &&
    req.url.includes("/dashboard/customers")
  ) {
    return NextResponse.redirect(new URL("/dashboard/barbers", req.url));
  }

  if (
    user.profile_type === "cliente" &&
    req.url.includes("/dashboard/barbers")
  ) {
    return NextResponse.redirect(new URL("/dashboard/customers", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/barbers/:path*", "/dashboard/customers/:path*"],
};

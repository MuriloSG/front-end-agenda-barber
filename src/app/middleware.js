import { NextResponse } from "next/server";
import Cookies from "js-cookie";

export function middleware(req) {
    const token = req.cookies.get("token");
    const user = req.cookies.get("user");
    console.log(user)
    console.log(token)

    if (!token || !user) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const parsedUser = JSON.parse(user);
    if (!parsedUser || !parsedUser.profile_type) {
        return NextResponse.redirect(new URL("/login", req.url)); 
    }

    if (parsedUser.profile_type === "barbeiro" && req.url.includes("/dashboard/customers")) {
        return NextResponse.redirect(new URL("dashboard/barbers", req.url));
    }

    if (parsedUser.profile_type === "cliente" && req.url.includes("/dashboard/barbers")) {
        return NextResponse.redirect(new URL("/dashboard/customers", req.url));
    }
    return NextResponse.next();
    }

    export const config = {
    matcher: ["/dashboard/barbers/:path*", "/dashboard/customers/:path*"],
    };

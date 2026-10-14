import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.cookies.set("sykkel_admin_access", "", { httpOnly: true, path: "/", maxAge: 0 });
  response.cookies.set("sykkel_admin_refresh", "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}

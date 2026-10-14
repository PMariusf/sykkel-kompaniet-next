import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/konto", request.url), 303);
  response.cookies.set("sykkel_customer_access", "", { httpOnly: true, path: "/", maxAge: 0 });
  response.cookies.set("sykkel_customer_refresh", "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}

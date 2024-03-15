import type { NextRequest, NextFetchEvent } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

import { NextResponse } from "next/server";
import { verify } from "./utils/jwtUitls";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { auth, token } from "./auth";
// import { supabase } from "./lib";

// const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
// const supabaseServerKey: string = process.env.NEXT_PUBLIC_SUPABASE_ARON_KEY || "";

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/Member/login", req.url));
  }

  return res;
}
export const config = {
  matcher: ["/Member/mypage"],
};

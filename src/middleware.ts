import type { NextRequest, NextFetchEvent } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

import { NextResponse } from "next/server";
import { verify } from "./utils/jwtUitls";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

import { supabase } from "./lib";

// const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
// const supabaseServerKey: string = process.env.NEXT_PUBLIC_SUPABASE_ARON_KEY || "";

//middleware로 guest
export async function middleware(req: NextRequest, event: NextFetchEvent) {
  //미들웨어 한개더추가할것 만료된경우 강제 로그아웃 해야함
  const res = NextResponse.next();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  // console.log(session, "session", !session);

  if (!session) {
    //세션만료되면 로그아웃

    // const { error } = await supabase.auth.signOut();
    //로그아웃하면 메인페이지로 이동

    return NextResponse.redirect(new URL("/Member/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/Member/mypage", "/order/:order_code*"],
};

// /, "/Order/:order_code*"

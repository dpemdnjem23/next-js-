import type { NextRequest, NextFetchEvent } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { verify } from "./utils/jwtUitls";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

import { getUser, supabase } from "./lib";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const session = await getUser();
  if (!session) {
    return NextResponse.redirect(new URL("/Member/login", req.url));
  }

  console.log(session);

  return session;
}

export const config = {
  matcher: ["/Member/mypage", "/order/:order_code*"],
};

//미들웨어 한개더추가할것 만료된경우 강제 로그아웃 해야함

// const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '');

// const { data, error } = await supabase.auth.getSession();

// console.log(data);
// // console.log(session, "session", !session);

// if (!data) {
//세션만료되면 로그아웃

// const { error } = await supabase.auth.signOut();
//로그아웃하면 메인페이지로 이동

//   return NextResponse.redirect(new URL("/Member/login", req.url));
// }

// return res;
// }

// // /, "/Order/:order_code*"

// import { type NextRequest } from "next/server";
// import { updateSession } from "@/lib/middleware";

// export async function middleware(request: NextRequest) {
//   return await updateSession(request);
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * Feel free to modify this pattern to include more paths.
//      */
//     "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//   ],
// };

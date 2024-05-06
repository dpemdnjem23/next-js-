"use server";

import { cookies } from "next/headers";
// import { serialize } from 'cookie';
import { randomBytes } from "crypto";

//접속했을때 cookie를 만들고 저장한다.
//저장할 값은,custoid(아ㅇ),custoNo.

const generateCartId = () => {
  return randomBytes(64).toString("hex");
};

//
const cookieCreate = async (name: string) => {
  cookies().set({
    name: `${name}`,
    value: generateCartId(),
    httpOnly: true,
    sameSite: "lax",
    maxAge:60*360,
    secure: true,
    path: "/",
  });
};
const cookieGet = async (name: string) => {
  return cookies().get(name)?.value;
};

const cookieDel = async (data) => {
  cookies().set("refresh", "", { maxAge: 0 });
};

export { cookieCreate, cookieDel, cookieGet };

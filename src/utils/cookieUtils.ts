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
    maxAge: 60 * 360,
    secure: true,
    path: "/",
  });
};
const cookieGet = async (name: string) => {
  try {
    return cookies().get(name)?.value;
  } catch (error) {
    console.error("쿠키 불러오는 중 오류 발생:", error);
  }
};

const cookieDel = async (name: string) => {
  try {
    cookies().set(name, "", { maxAge: 0 });
  } catch (error) {
    console.error("쿠키 삭제 중 오류 발생:", error);
  }
};

export { cookieCreate, cookieDel, cookieGet };

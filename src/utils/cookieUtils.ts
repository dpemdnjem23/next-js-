"use server";

import { cookies } from "next/headers";

const cookieCreate = async (data: string) => {
  console.log(data);
  cookies().set({
    name: "refresh",
    value: data,
    httpOnly: true,
    secure: true,
    path: "/",
  });
};

const cookieDel = async (data) => {
  cookies().set("refresh", "", { maxAge: 0 });
};

export { cookieCreate, cookieDel };

"use client";

import { useEffect } from "react";
import { handler } from "./api";

export default function Home() {
  const jwt: any = localStorage.getItem("sb-ywlqsicsvqoghciafcpw-auth-token");
  const user: any = localStorage.getItem("userLogin");
  console.log(user);
  //   console.log(jwt);
  useEffect(() => {
    

    
  })

  handler(jwt?.refresh_token);
  return "hi";
}

"use client";

import { useEffect } from "react";
import { handler } from "./api";
import Mypage from "./mypage";

export default function Page() {
  return (
    <section className=" after:clear-both after:block">
      <div className="pt-[55px] pb-[36px] relative min-w-[1240px]">
        <h2 className="text-[#000] font-extralight font-sans text-[44px] text-center uppercase">
          MY PAGE
        </h2>
      </div>
      <div>
        <Mypage></Mypage>
      </div>
    </section>
  );
}

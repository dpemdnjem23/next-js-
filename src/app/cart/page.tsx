// "use client";
import Image from "next/image";
import CartItem from "./cartItem";
import { Suspense, useEffect, useState } from "react";
import * as PortOne from "@portone/browser-sdk/v2";

// import { Router } from "next/router";
import FullScreenLoading from "../_component/fullScreenLoading";
import { useSelector } from "react-redux";
import Loading from "./loading";
export default function Cart() {
  //cartItem

  return (
    // <div className="relative mb-[60px]">
    <Suspense fallback={<Loading></Loading>}>
      <div>
        <CartItem></CartItem>
      </div>
    </Suspense>
  );
}

"use server";
import Image from "next/image";
import CartItem from "./cartItem";
import { Suspense, useEffect, useState } from "react";
import * as PortOne from "@portone/browser-sdk/v2";

// import { Router } from "next/router";
import FullScreenLoading from "../_component/fullScreenLoading";
import { useSelector } from "react-redux";
import Loading from "../_lib/loading";
import PendingLoading from "./_component/pendingLoading";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getCartItems } from "./_lib/getCartItmes";
import { getUser, supabase } from "@/lib";
import { cookieGet } from "@/utils/cookieUtils";
// import { auth } from "@/auth";
export default async function Cart() {
  //cartItem

  const user = await getUser();
  const cartId = await cookieGet("cartId");
  // const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
  // const userLogin = JSON.parse(localStorage.getItem("userLogin") || "{}");

  // console.log(await auth(), "sdfasdf");
  // if (await auth()) {
  //   return null;
  // }
  //cart는 2가지 케이스다 로그인 vs 비로그인

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["cart", user?.id || "guest"],

    queryFn: getCartItems,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    // <div className="relative mb-[60px]">
    <div>
      <HydrationBoundary state={dehydratedState}>
        <CartItem></CartItem>
      </HydrationBoundary>
    </div>
  );
}

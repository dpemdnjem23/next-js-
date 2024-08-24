// "use client";
import Image from "next/image";
import CartItem from "./cartItem";
import { Suspense, useEffect, useState } from "react";
import * as PortOne from "@portone/browser-sdk/v2";

// import { Router } from "next/router";
import FullScreenLoading from "../_component/fullScreenLoading";
import { useSelector } from "react-redux";
import Loading from "../_lib/loading";
import PendingLoading from "./_component/pendingLoading";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getCartItems } from "./_lib/getCartItmes";
import { supabase } from "@/lib";
// import { auth } from "@/auth";
export default async function Cart() {
  //cartItem

  // const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
  // const userLogin = JSON.parse(localStorage.getItem("userLogin") || "{}");

  // console.log(await auth(), "sdfasdf");
  // if (await auth()) {
  //   return null;
  // }
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["cart"],

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

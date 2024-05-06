"use client";
import Image from "next/image";
import CartItem from "./cartItem";
import { Suspense, useEffect, useState } from "react";

// import { Router } from "next/router";
import FullScreenLoading from "../_component/fullScreenLoading";
import { useSelector } from "react-redux";
export default function Cart() {
  const isLoading = useSelector((state) => state?.cart?.pageRouterLoading);
  //cartItem
  return (
    // <div className="relative mb-[60px]">
    <div>
      {isLoading ? <FullScreenLoading></FullScreenLoading> : null}

      <CartItem></CartItem>
    </div>
  );
}

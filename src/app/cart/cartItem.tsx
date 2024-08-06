"use client";

import { supabase } from "@/lib";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CartButton from "./_component/cartButton";

import { useDispatch, useSelector } from "react-redux";
import { Cart, setBoxObj } from "@/reducers/slices/CartSlice";
import { update } from "lodash";
import CartPayment from "./cartpaymet";
import useIntersectionObserver from "@/lib/useIntersectionObserver";
import { root } from "postcss";
import CartTable from "./_component/cartTable";
import { cookieGet } from "@/utils/cookieUtils";
import { getCartItems } from "./_lib/getCartItmes";

export default function CartItem() {
  const [work, setWork] = useState<boolean>(false);

  const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "{}");

  const targetRef = useRef();
  const targetRef2 = useRef();
  //버튼 활성화 밑 색깔 바꾸기
  const [count, setCount] = useState<number>(0);

  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const [absoluteIntersecting, setAbsoluteIntersecting] =
    useState<boolean>(false);
  const controlQuantity = useSelector((state) => state.cart?.controlQuantity);

  //캐싱 쿼리를 사용하는경우 querykey를

  // if (isRefetching) {
  //   checkAll();
  // }
  //수량
  const dispatch = useDispatch();

  const queryClient = new QueryClient();

  const {
    data: cartItems,
    isLoading,
    error,
    isSuccess,
    refetch,
    isRefetching,
    isError,
  } = useQuery({
    queryKey: ["carts"],
    queryFn: () => getCartItems(userLogin, user),
  });

  useEffect(() => {
    const checkAll = () => {
      console.log(cartItems);
      const check = cartItems?.data?.reduce(
        (
          acc: unknown,

          curr
        ) => [
          ...acc,
          ...curr?.options.map((option: string, index: number) => ({
            id: curr?.id,
            option,
            product_code: curr?.product_id?.product_code,
            brand: curr?.product_id?.brand,
            front_multiline: curr?.product_id?.front_multiline,
            thumbnail: curr?.product_id?.thumbnail,
            price: curr?.product_id?.price,
            discount: curr?.product_id?.discount,
            quantity: curr.quantity[index],
            isChecked: true,
          })),
        ],
        []
      );

      dispatch(setBoxObj(check));

      //모두 체크 해제하기 조건 - 모든 체크가 들어와있으면
      //모든 체크가 들어와있는지 확인하는 방법
      //arr length 를 계산

      //모두 체크하기
      //새로고침할때는 문제
    };

    checkAll();
  }, []);

  //isSuccess

  const countCart = () => {
    let count = 0;

    cartItems?.data?.map((el) => {
      count = count + el?.options.length - 1;
    });

    setCount(count);
  };
  // const cartCount  = countCart()
  useEffect(() => {
    countCart();
  }, [cartItems, work]);

  const [rootMargin, setRootMargin] = useState("0px");

  const handleResize = () => {
    // viewport의 너비를 가져옵니다.
    const viewportHeight = window.innerHeight;
    // rootMargin 값을 동적으로 설정합니다.

    if (viewportHeight <= 396) {
      const newRootMargin = `0px 0px 20px 0px`;
      setRootMargin(newRootMargin);
      return;
    }
    const newRootMargin = `0px 0px ${-viewportHeight * 0.57}px 0px`; // 예: 너비의 10%

    setRootMargin(newRootMargin);
  };
  useEffect(() => {
    handleResize();

    // 컴포넌트가 언마운트될 때 resize 이벤트 핸들러를 제거합니다.

    // resize 이벤트를 수신하여 viewport의 크기가 변경될 때마다 rootMargin을 조정합니다.
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setRootMargin]);

  const options: { root: null; rootMargin: string; threshold: number } =
    useMemo(
      () => ({
        root: null,
        rootMargin: rootMargin,
        threshold: 0,
      }),
      [rootMargin]
    );

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // // console.log("fixed");
        // console.log("여기는 auto인곳");
        setIsIntersecting(true);
        setAbsoluteIntersecting(false);
      } else {
        setIsIntersecting(false);
        setAbsoluteIntersecting(false);
      }
    }, options);

    const target = targetRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [targetRef, options]);

  const options2: { root: null; rootMargin: string; threshold: number[] } =
    useMemo(
      () => ({
        root: null,
        rootMargin: "-90% 0px 0px 0px",
        threshold: [0, 1],
      }),
      []
    );

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);

        setAbsoluteIntersecting(false);

        // if (entry.intersectionRatio >= 0 && entry.intersectionRatio < 0.15) {
        // }
        // else if (entry.intersectionRatio >= 0.15) {
        //   console.log("absolute");
        //   setIsIntersecting(false);
        //   setAbsoluteIntersecting(true);
        // }
      } else {
        setAbsoluteIntersecting(true);
        setIsIntersecting(false);
      }
    }, options2);
    const target = targetRef2.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [targetRef, options2]);
  //

  // console.log(isIntersecting, absoluteIntersecting, "sdfasfsadfsadfabosdf");
  return (
    <section>
      <div
        id="cart_header"
        className="pt-[70px] pb-[36px] relative min-w-[1240px]"
      >
        <h2 className=" text-[#000] font-sans font-thin text-[44px] leading-[44px] text-center uppercase">
          SHOPPING BAG
        </h2>
      </div>

      <div ref={targetRef2} className="w-[1240px] mx-auto my-0">
        <ul className="w-[305px] my-[80px] "></ul>

        <div className="relative  mb-[60px] after:clear-both after:block">
          <div ref={targetRef} className="float-left w-[920px]">
            <h3 className="relative mb-[15px] text-[24px] leading-[34px]">
              쇼핑백 상품
              {`(${count > 0 ? count : 0})`}
            </h3>
            <CartTable></CartTable>
            <CartButton></CartButton>
          </div>
          <CartPayment
            absoluteIntersecting={absoluteIntersecting}
            targetRef2={targetRef}
            isIntersecting={isIntersecting}
          ></CartPayment>
        </div>
      </div>
    </section>
  );
}

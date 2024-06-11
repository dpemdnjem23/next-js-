"use client";
import FullScreenLoading from "@/app/_component/fullScreenLoading";
import ShipmentInfo from "./shipmentInfo";
import { useDispatch, useSelector } from "react-redux";
import { setPostModal, setSelectState } from "@/reducers/slices/OrderSlice";
import PostModal from "./component/postModal";
import DaumPostcode from "react-daum-postcode";
import { useEffect, useRef, useState } from "react";
import OrderProduct from "./orderProduct";
import Checkout from "./checkout";
import PaymentProduct from "./paymentProduct";
import CouponInfo from "./couponInfo";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib";
import { useParams } from "next/navigation";
import PaymentSystem from "./component/paymentSystem";

export default function Order() {
  const params = useParams();

  const fetchData = async () => {
    const response = await supabase
      .from("order")
      .select()
      .eq("id", params.order_code);

    return response;
  };

  const {
    data: cartItems,
    isError,
    error,
  } = useQuery({
    queryKey: ["order"],
    queryFn: fetchData,
  });

  if (isError) {
    throw error;
  }

  const isLoading = useSelector((state) => state.user.isLoading);

  const postModal = useSelector((state) => state.order.postModal);
  //cartItem
  const dispatch = useDispatch();

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

  //

  return (
    <section>
      <div className="pt-[55px] pb-[36px] relative  min-w-[1240px] ">
        <h2 className="text-[#000] font-sans font-normal  text-[44px] leading-[44px] text-center uppercase">
          <span>주문/결제</span>
        </h2>
      </div>

      <div
        className="w-[1240px] my-0 mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-[60px] after:block after:clear-both">
          <div className="w-[960px] float-left">
            <ShipmentInfo></ShipmentInfo>
            <OrderProduct></OrderProduct>
            <CouponInfo></CouponInfo>
            <PaymentProduct></PaymentProduct>
          </div>

          <Checkout></Checkout>
        </div>
      </div>

      {isLoading ? <FullScreenLoading></FullScreenLoading> : ""}

      {postModal ? <PostModal></PostModal> : ""}
    </section>
  );
}

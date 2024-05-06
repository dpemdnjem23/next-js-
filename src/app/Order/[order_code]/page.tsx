"use client";
import FullScreenLoading from "@/app/_component/fullScreenLoading";
import ShipmentInfo from "./shipmentInfo";
import { useDispatch, useSelector } from "react-redux";
import { setPostModal, setSelectState } from "@/reducers/slices/OrderSlice";
import PostModal from "./component/postModal";
import DaumPostcode from "react-daum-postcode";
import { useEffect, useRef } from "react";

export default function Order() {
  const isLoading = useSelector((state) => state.user.isLoading);

  const postModal = useSelector((state) => state.order.postModal);
  //cartItem
  const dispatch = useDispatch();

 

  return (
    <section>
      {isLoading ? <FullScreenLoading></FullScreenLoading> : ""}

      {postModal ? <PostModal></PostModal> : ""}
      <div className="pt-[55px] pb-[36px] relative  min-w-[1240px] ">
        <h2 className="text-[#000] font-sans font-normal  text-[44px] leading-[44px] text-center uppercase">
          <span>주문/결제</span>
        </h2>
      </div>

      <div className="w-[1240px] mx-auto" onClick={(e) => e.stopPropagation()}>
        <ShipmentInfo></ShipmentInfo>
      </div>
    </section>
  );
}

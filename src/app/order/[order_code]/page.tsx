import ShipmentInfo from "./shipmentInfo";
import { useDispatch, useSelector } from "react-redux";
import { setPostModal, setSelectState } from "@/reducers/slices/OrderSlice";
import PostModal from "./_component/postModal";
import DaumPostcode from "react-daum-postcode";
import { Suspense, useEffect, useRef, useState } from "react";
import OrderProduct from "./orderProduct";
import Checkout from "./checkout";
import PaymentProduct from "./paymentProduct";
import CouponInfo from "./couponInfo";
import {
  dehydrate,
  HydrationBoundary,
  useQuery,
  QueryClient,
} from "@tanstack/react-query";
import { supabase } from "@/lib";
import { useParams } from "next/navigation";
import PaymentSystem from "./_component/paymentSystem";
import Loading from "@/app/_lib/loading";
import { getOrderData } from "./_lib/getOrderData";
import ResponsiveRootMargin from "./_component/ResponsiveRootMargin";

export default async function Page({ params }) {
  // const postModal = useSelector((state) => state.order.postModal);
  //cartItem

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["orders", params.order_code],
    queryFn: getOrderData,
  });

  const dehydrateState = dehydrate(queryClient);

  return (
    // <ResponsiveRootMargin>
    <>
      <HydrationBoundary state={dehydrateState}>
        <ResponsiveRootMargin>
          <div className="pt-[55px] pb-[36px] relative  min-w-[1240px] ">
            <h2 className="text-[#000] font-sans font-normal  text-[44px] leading-[44px] text-center uppercase">
              <span>주문/결제</span>
            </h2>
          </div>

          <div className="w-[1240px] my-0 mx-auto">
            <div className="relative mb-[60px] after:block after:clear-both">
              <div className="w-[960px] float-left">
                <Suspense fallback={<Loading></Loading>}>
                  <ShipmentInfo></ShipmentInfo>
                  <OrderProduct></OrderProduct>
                  <CouponInfo></CouponInfo>
                  <PaymentProduct></PaymentProduct>
                </Suspense>
              </div>

              <Checkout></Checkout>
            </div>
          </div>
        </ResponsiveRootMargin>
      </HydrationBoundary>
    </>

  );
}

import Checkout from "./_component/button";
import ZoomLens from "./zoomlens";
import ProductDetail from "./productDetail";
import CardInfoModal from "./_component/cardInfoModal";
import { useDispatch, useSelector } from "react-redux";
import PointsInfoModal from "./_component/pointsInfoModal";
import { setFavorites, setIsHeart } from "@/reducers/slices/UserSlice";
import { useEffect } from "react";
import { supabase } from "@/lib";
import { setIsImage, setProduct } from "@/reducers/slices/ProductSlice";
import CartCheckModal from "./_component/cartCheckModal";
import RootLayout from "@/app/layout";
import Loading from "@/app/_lib/loading";
import Modals from "./_component/modals";
import { QueryClient } from "@tanstack/react-query";
import { getProductData } from "./_lib/getProductData";
import { useRouter } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { product_code: string };
}) {
  //haert를 클릭햇을때 집어넣거나빼고, heart를 불러와서 heart를찍은 사람 수 만큼넣어주기
  //heart는 product번호랑 매칭시켜야한다.

  const queryClient = new QueryClient();

  const { product_code } = params;

   await queryClient.prefetchQuery({
    queryKey: ["product", product_code],
    queryFn: getProductData,
  });

  return (
    <section className=" block">
      <Modals></Modals>
      <ProductDetail></ProductDetail>
      {/* <Checkout></Checkout> */}
      <ZoomLens></ZoomLens>

      {/* <Loading></Loading> */}
      {/* <LoadingComponent></LoadingComponent> */}
    </section>
  );
}

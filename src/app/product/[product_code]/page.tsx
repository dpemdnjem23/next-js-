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
import { useParams } from "next/navigation";
import CartCheckModal from "./_component/cartCheckModal";
import RootLayout from "@/app/layout";
import Loading from "@/app/_lib/loading";
import Modals from "./_component/modals";

export default function ProductBuyingPage() {
  const personalHeart = useSelector((state) => state?.user?.personalHeart);
  const cartCheckModal = useSelector((state) => state?.product?.cartCheckModal);
  const favorites = useSelector((state) => state?.user.favorites);

  const cardInfoModal = useSelector((state)=> state?.product.cardInfoModal)
  const product = useSelector((state) => state?.product.product);

  const pointsModal = useSelector((state) => state?.product.pointsInfoModal);
  const dispatch = useDispatch();

  const isHeart = useSelector((state) => state?.user.isHeart);
  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "{}");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const { product_code } = useParams();

  //haert를 클릭햇을때 집어넣거나빼고, heart를 불러와서 heart를찍은 사람 수 만큼넣어주기
  //heart는 product번호랑 매칭시켜야한다.

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

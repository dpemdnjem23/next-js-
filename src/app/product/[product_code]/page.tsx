"use client";
import Checkout from "./_component/button";
import ZoomLens from "./zoomlens";
import ProductDetail from "./productDetail";
import CardInfoModal from "./_component/cardInfoModal";
import { useDispatch, useSelector } from "react-redux";
import PointsInfoModal from "./_component/pointsInfoModal";
import { setIsHeart, setPersonalHeart } from "@/reducers/slices/UserSlice";
import { useEffect } from "react";
import { supabase } from "@/lib";
import { setIsImage, setProduct } from "@/reducers/slices/ProductSlice";
import { useParams } from "next/navigation";
import CartCheckModal from "./_component/cartCheckModal";

export default function ProductBuyingPage() {
  const cardModal = useSelector((state) => state?.product?.cardInfoModal);
  const personalHeart = useSelector((state) => state?.user?.personalHeart);
  const cartCheckModal = useSelector((state) => state?.product?.cartCheckModal);

  const product = useSelector((state) => state?.product.product);

  const pointsModal = useSelector((state) => state?.product.pointsInfoModal);
  const dispatch = useDispatch();

  const isHeart = useSelector((state) => state?.user.isHeart);
  const userLogin = JSON.parse(localStorage.getItem("userLogin")) || [];
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || [];
  const { product_code } = useParams();

  //haert를 클릭햇을때 집어넣거나빼고, heart를 불러와서 heart를찍은 사람 수 만큼넣어주기
  //heart는 product번호랑 매칭시켜야한다.
  useEffect(() => {
    let ignore = false;
    const result = async () => {
      try {
        if (!product.id) {
          return; // product.id가 없으면 요청을 보내지 않고 함수를 종료
        }

        const { data, error }: any = await supabase
          .from("favorite")
          .select()
          .eq("user_id", userInfo?.user?.id)
          .eq("product_id", product?.id);

        // if (response.error) {
        //   throw response.error;
        // }

        if (!ignore) {
          dispatch(setPersonalHeart(data));
        }
      } catch (err) {
        throw err;
      }
    };

    result();

    return () => {
      ignore = true;
    };
  }, [product?.id]);

  useEffect(() => {
    let ignore = false;

    try {
      if (!product.id) {
        return; // product.id가 없으면 요청을 보내지 않고 함수를 종료
      }

      const result = async () => {
        const { data, error }: any = await supabase
          .from("favorite")
          .select()
          .eq("product_id", product?.id);

        // if (error) {
        //   throw error;
        // }

        if (!ignore) {
          dispatch(setIsHeart(data));
        }
      };

      result();

      return () => {
        ignore = true;
      };
    } catch (err) {
      throw err;
    }
  }, [personalHeart, product?.id]);
  return (
    <section className=" block">
      {cardModal ? <CardInfoModal></CardInfoModal> : null}
      {pointsModal ? <PointsInfoModal></PointsInfoModal> : null}
      {cartCheckModal ? <CartCheckModal></CartCheckModal> : null}
      <ProductDetail></ProductDetail>
      {/* <Checkout></Checkout> */}
      <ZoomLens></ZoomLens>
    </section>
  );
}

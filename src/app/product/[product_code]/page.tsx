"use client";
import Checkout from "./_component/button";
import ZoomLens from "./zoomlens";
import ProductDetail from "./productDetail";
import CardInfoModal from "./_component/cardInfoModal";
import { useSelector } from "react-redux";
import PointsInfoModal from "./_component/pointsInfoModal";

export default function ProductBuyingPage() {
  const cardModal = useSelector((state) => state.product.cardInfoModal);

  const pointsModal = useSelector((state) => state.product.pointsInfoModal);
  return (
    <section>
      {cardModal ? <CardInfoModal></CardInfoModal> : null}
      {pointsModal ? <PointsInfoModal></PointsInfoModal> : null}
      <ProductDetail></ProductDetail>
      {/* <Checkout></Checkout> */}
      <ZoomLens></ZoomLens>
    </section>
  );
}

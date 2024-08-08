"use client";
import { useSelector } from "react-redux";
import CardInfoModal from "./_component/cardInfoModal";
import PointsInfoModal from "./_component/pointsInfoModal";
import CartCheckModal from "./_component/cartCheckModal";

export default function Modals() {
  const cartCheckModal = useSelector((state) => state?.product?.cartCheckModal);
  const favorites = useSelector((state) => state?.user.favorites);
  const cardInfoModal = useSelector((state) => state?.product.cardInfoModal);

  const product = useSelector((state) => state?.product.product);

  const pointsModal = useSelector((state) => state?.product.pointsInfoModal);
  return (
    <>
      {cardInfoModal ? <CardInfoModal></CardInfoModal> : null}
      {pointsModal ? <PointsInfoModal></PointsInfoModal> : null}
      {cartCheckModal ? <CartCheckModal></CartCheckModal> : null}
    </>
  );
}

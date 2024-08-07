import { useSelector } from "react-redux";
import CardInfoModal from "./cardInfoModal";
import PointsInfoModal from "./pointsInfoModal";
import CartCheckModal from "./cartCheckModal";

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

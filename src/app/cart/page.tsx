import Image from "next/image";
import CartItem from "./cartItem";
import CartPayment from "./cartpaymet";

export default function Cart() {
  //cartItem
  return (
    <div>
          <CartItem></CartItem>
          <CartPayment></CartPayment>
      {/* <h4>머릿말</h4> */}
    </div>
  );
}

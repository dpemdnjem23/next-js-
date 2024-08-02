"use client";

import OrderTable from "./_component/orderTable";

export default function OrderProduct() {
  return (
    <>
      <h3 className="relative mb-[15px] text-[24px] leading-[32px] font-normal">
        주문상품
      </h3>
      <OrderTable></OrderTable>
      <ul className=" mt-[-40px] mb-[60px] text-[12px] text-[#666] leading-5 tracking-[-.24px]">
        <li>* 제주/도서산간 지역의 경우 추가 배송비가 발생할 수 있습니다.</li>
      </ul>
    </>
  );
}

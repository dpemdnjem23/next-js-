"use client";

import { supabase } from "@/lib";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function ClaimButton() {
  //이전하면 추소전으로
  const storeId: string | undefined = process.env.NEXT_PUBLIC_ID;
  const { order_code } = useParams();

  const router = useRouter();
  const queryClient = useQueryClient();
  const cancelItems = queryClient.getQueryData(["cancel"]);
  console.log(cancelItems, "can");
  const claim = async () => {
    const check = confirm("취소 하시겠습니까?");

    if (check) {
      try {
        await requestCancel(cancelItems?.data[0].payment_id);
        //   if(ca)
        const update = await supabase
          .from("payment")
          .update({ progress: "환불완료" })
          .eq("order_id", order_code);
        
        

        router.push("/Member/mypage/orderList");
      } catch (err: any) {
        throw Error(err);
      }
    } else if (!check) {
      return;
    }
  };

  const requestCancel = async (merchant_uid: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/payment/cancel",
        {
          merchant_uid,
        }
      );

      const result = response.data;

      if (result.success) {
        alert("Payment cancelled successfully");
      } else {
        alert("Failed to cancel payment: " + result.message);
      }
    } catch (error) {
      alert("An error occurred while cancelling payment");
    }
  };
  return (
    <div className="text-center mx-[10px]">
      <button
        className="mr-[10px]
                border-[1px] border-[#000] w-[150px] h-[40px] font-medium text-[13px]"
        type="button"
      >
        <Link href={"/Member/mypage/orderList"}> 이전</Link>
      </button>
      <button
        onClick={claim}
        className="
                border-[1px] bg-[#000] text-[#fff] border-[#000] w-[150px] h-[40px] font-medium text-[13px]"
        type="button"
      >
        취소신청
      </button>
    </div>
  );
}

"use client";
import { useState } from "react";
import PointModal from "../pointModal";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { setPoint } from "@/reducers/slices/OrderSlice";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CouponTable() {
  const [showModal, setShowModal] = useState(false);
  const params = useParams()

  const [dummy, setDummy] = useState<number>(0);
  const point = useSelector((state) => state.order.point);

  const dispatch = useDispatch();
  const handleMouseEnter = () => {
    setShowModal(true);
  };

  const handleMouseLeave = () => {
    setShowModal(false);
  };

  const handleBlur = (e) => {
    if (dummy < 0 || dummy > 100) {
      alert("잔액을 초과해서 사용할수 없습니다.");
      dispatch(setPoint(0));
      setDummy(0);
    } else {
      dispatch(setPoint(e.target.value));
    }
  };

  const queryClient = useQueryClient();

  const cartItems = queryClient.getQueryData(["order"]);

  return (
    <table
      className="w-[100%]
        table-fixed mb-[60px] border-[#171717] border-t-[2px] border-b-[1px]"
    >
      <colgroup>
        <col className="w-[230px]"></col>
        <col></col>
      </colgroup>

      <tbody>
        <tr>
          <th className=" text-[14px] text-left text-[#333] h-[68px] pl-[43px] font-sans font-normal">
            결제 예정금액
          </th>
          <td
            className=" border-[#e9e9e9] text-[#333] font-normal
          font-sans pl-[19px] text-[14px]
          "
          >
            <em className=" not-italic text-[16px]">
              {cartItems?.data[0]?.total_cost?.toLocaleString()}
            </em>
            원
          </td>
        </tr>
        <tr>
          <th className=" text-[14px] text-left text-[#333] h-[68px] pl-[43px] font-sans font-normal">
            할인쿠폰
          </th>
          <td
            className=" border-[#e9e9e9] text-[#333] font-normal
          font-sans pl-[19px] text-[14px]
          "
          >
            <input
              disabled={true}
              type="text"
              value={0}
              className="bg-[#f2f2f2] text-[#aaa]
              h-[40px] leading-[38px] pl-[20px] font-normal
              text-[16px] w-[250px] inline-block "
            ></input>
            <strong className=" text-[14px] font-normal w-[31px] ml-[10px] leading-10">
              원
            </strong>
            <button
              className="
              inline-block text-center border-[#333] 
              min-w-[115px] h-[40px] text-[14px] leading-[38px]"
              type="button"
            >
              쿠폰 조회 적용
            </button>
          </td>
        </tr>
        <tr>
          
          <th className=" text-[14px] text-left text-[#333] h-[68px] pl-[43px] font-sans font-normal">
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className=" inline-block relative cursor-pointer"
            >
              <em
                className=" not-italic 
              "
              >
                W POINT
                <span
                  style={{
                    background: `url(https://i.ibb.co/JQ1djD8/spr-common.png) -150px -60px no-repeat`,
                  }}

                className="text-[14px] cursor-pointer
                inline-block ml-[3px] align-middle
                 w-[16px] h-[16px] "
                ></span>

              </em>
              {showModal ? <PointModal></PointModal> : ""}
            </div>
          </th>

          <td
            className=" border-[#e9e9e9] text-[#333] font-normal
          font-sans pl-[19px] test-[14px]
          "
          >
            <input
              type="text"
              value={dummy}
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => setDummy(e.target.value)}
              className="bg-[#f2f2f2]
              focus:bg-[#f2f2f2] focus:border-[#f2f2f2] focus:border-[1px] 
              h-[40px] leading-[38px] pl-[20px] font-normal
              text-[16px] w-[250px] inline-block "
            ></input>
            <strong className=" text-[14px] font-normal w-[31px] ml-[10px] leading-10">
              P
            </strong>

            <p className="font-normal ml-[16px] text-[12px] leading-[40px] align-top inline-block">
              잔액
              <em className=" text-[14px] ml-[9px] text-[#000] not-italic">
                100
              </em>
              P
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

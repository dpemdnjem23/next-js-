"use client";
import { supabase } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export default function Cancel() {
  const fetchData = async () => {
    const response = await supabase.from("payment").select();

    return response;
  };

  const {
    data: cancelItems,
    isError,
    error,
  } = useQuery({
    queryKey: ["payment"],
    queryFn: fetchData,
  });

  if (isError) {
    throw error;
  }

  console.log(cancelItems?.data);

  const dateFrom = (date: Date) => {
    const dbDate = new Date(date);

    const month = dbDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.
    const day = dbDate.getDate();
    const formattedDate = `${month}/${day}`;

    return formattedDate;
  };
  return (
    <div className="w-[1240px] mx-auto">
      <div className=" h-[41px] relative">
        <h3
          className="text-[#000] font-normal text-[24px] leading-[36px] inline-block absolute
  top-0 left-0
"
        >
          취소/교환/반품
        </h3>
      </div>

      <div className="block">
        <table className="border-[#171717] border-t-[2px] border-b-[1px] mb-[60px]">
          <colgroup>
            <col className="w-[100px]"></col>
            <col className="w-[120px]"></col>
            <col className="w-[100px]"></col>
            <col></col>
            <col className="w-[173px]"></col>
            <col className="w-[195px]"></col>
            <col className="w-[155px]"></col>
          </colgroup>
          <thead>
            <tr>
              <th className=" h-[68px] p-0 text-[14px] font-medium text-[#000] text-center align-middle border-[#b5b5b5] border-b-[1px]">
                신청일
              </th>
              <th className=" h-[68px] p-0 text-[14px] font-medium text-[#000] text-center align-middle border-[#b5b5b5] border-b-[1px]">
                주문번호
              </th>
              <th className=" h-[68px] p-0 text-[14px] font-medium text-[#000] text-center align-middle border-[#b5b5b5] border-b-[1px]">
                유형
              </th>
              <th className=" h-[68px] p-0 text-[14px] font-medium text-[#000] text-center align-middle border-[#b5b5b5] border-b-[1px]">
                상품정보
              </th>
              <th className=" h-[68px] p-0 text-[14px] font-medium text-[#000] text-center align-middle border-[#b5b5b5] border-b-[1px]">
                수량
              </th>
              <th className=" h-[68px] p-0 text-[14px] font-medium text-[#000] text-center align-middle border-[#b5b5b5] border-b-[1px]">
                상품금액
              </th>
              <th className=" h-[68px] p-0 text-[14px] font-medium text-[#000] text-center align-middle border-[#b5b5b5] border-b-[1px]">
                진행상황
              </th>
            </tr>
          </thead>
          <tbody>
            {/* <td
                className=" text-[13px] text-[#333] h-[68px] font-normal text-center align-middle py-[14px]"
                colSpan={7}
              >
                취소/교환/반품 신청하신 내역이 없습니다.
              </td>
              <td>
                


              </td>
               */}
            {cancelItems?.data?.map((el) => {
              return (
                <tr key={el.id}>
                  <td>{dateFrom(el.created_at) }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

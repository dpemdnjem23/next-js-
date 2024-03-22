import Image from "next/image";
import Link from "next/link";

export default function CartItem() {


  
  //cartItem
  return (
    <section>
      <div className="pt-[70px] pb-[36px] relative min-w-[1240px]">
        <h2 className=" text-[#000] font-sans font-thin text-[44px] leading-[44px] text-center uppercase">
          SHOPPING BAG
        </h2>
      </div>
      <div className="w-[1240px] mx-auto my-0">
        <ul className="w-[305px] my-[80px] "></ul>

        <div className="relative mb-[60px]">
          <div className="flat-left w-[920px]">
            <h3 className="relative mb-[15px] text-[24px] leading-[34px]">
              쇼핑백 상품
            </h3>
            <table>
              <colgroup>
                <col className="w-[20px]"></col>
                <col></col>
                <col className="w-[80px]"></col>
                <col className="w-[150px]"></col>
                <col className="w-[150px]"></col>
                <col className="w-[130px]"></col>
                <col className="w-[30px]"></col>
              </colgroup>
              <thead>
                <tr>
                  {/* 체크박스 */}
                  <th
                    className="
                  h-[68px] font-sans font-medium text-[14px] text-[#000] text-center align-middle
                  py-[25px] border-[#d9d9d9] border-b-[1px]"
                  >
                    <span className="w-[17px] mr-0 inline-block relative">
                      <input
                        type="checkbox"
                        className=" opacity-0  w-[20px] h-[20px]"
                      ></input>
                      <label></label>
                    </span>
                    {/* <input></input> */}
                  </th>
                  <th className=" h-[68px] text-[14px] text-[#000] text-center align-middle py-[25px] border-[#d9d9d9] border-b-[1px]">
                    상품정보
                  </th>

                  <th className="h-[68px] text-[14px] text-[#000] text-center align-middle py-[25px] border-[#d9d9d9] border-b-[1px]">
                    수량
                  </th>
                  <th className="h-[68px] text-[14px] text-[#000] text-center align-middle py-[25px] border-[#d9d9d9] border-b-[1px]">
                    가격
                  </th>
                  <th className="h-[68px] text-[14px] text-[#000] text-center align-middle py-[25px] border-[#d9d9d9] border-b-[1px]">
                    쿠폰할인
                  </th>
                  <th
                    colSpan={2}
                    className="h-[68px] text-[14px] text-[#000] text-center align-middle py-[25px] border-[#d9d9d9] border-b-[1px]"
                  >
                    선택
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td
                    className="py-[20px] float-left font-sans h-auto 
                  text-[14px] text-[#000]
                  border-t-[0]
                  
                  flex justify-start items-start  px-[10px]"
                  >
                    <div className="w-[80px] relative mr-[16px] "></div>
                    <div className="w-[calc(100% - 96px)]"></div>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

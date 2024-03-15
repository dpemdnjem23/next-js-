import Image from "next/image";
import giftImage from "../../../../../public/ico_prod_gift.svg";
import heartOffImage from "../../../../../public/ico_prod_heart_off.svg";
import heartOnImage from "../../../../../public/ico_prod_heart_on.svg";

export default function ButtonBox() {
  //옵션 이 있을때 구매가 가능하도록한다.

  return (
    <ul className="flex w-[660px] justify-between items-center py-[30px]">
      <li className="min-w-[250px] flex ml-[10px] relative flex-1">
        <button
          className="w-[100%] border-[1px] px-[20px]  h-[70px] font-sans font-medium leading-[68px] text-[20px] border-[#000]"
          type="button"
        >
          바로 구매
        </button>
      </li>
      <li className="flex-1 min-w-[250px] ml-[10px] relative ">
        <button className="w-[100%] h-[70px] font-sans font-medium leading-[68px] text-[20px] bg-[#000] text-[#fff] border-[#000]">
          쇼핑백 담기
        </button>
      </li>
      <li className=" min-w-[70px] w-[70px] ml-[10px] relative">
        <button
          className="bg-[#fa5500] text-center flex-col w-[70px] h-[70px] relative  flex items-center  justify-center"
          type="button"
        >
          <Image
            className="px-auto"
            width={34}
            height={34}
            alt=""
            src={giftImage}
          ></Image>
          <span className="text-[13px] text-[#fff] font-medium block ">
            선물하기
          </span>
        </button>
      </li>
      <li>
        <button
          className=" border-[1px] border-[#ccc] text-center flex-col w-[70px] h-[70px] ml-[2px] flex items-center   justify-center"
          type="button"
        >
          <Image
            width={34}
            height={34}
            alt=""
            src={heartOffImage}
          ></Image>
          <p className=" font-semibold text-[13px] leading-[20px] pt-[-5px] text-[#7d7d7d]">
            365
          </p>
        </button>
      </li>
    </ul>
  );
}

"use client";
import { supabase } from "@/lib";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { delAction } from "./actions";
import { setIsLogout } from "@/reducers/slices/UserSlice";
import { useDispatch } from "react-redux";

export default function Withdrawal() {
  const router = useRouter();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [placeholder, setPlaceholder] = useState<string>(
    "의견이 있으시면 기재 부탁드립니다."
  );
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [isCheck, setIsCheck] = useState<{
    [key: string]: boolean;
  }>({
    group1: false,
    group2: false,
    group3: false,
    group4: false,
    group5: false,
    group6: false,
    group7: false,
    group8: false,
  });

  const dispatch = useDispatch();

  const handleFocus = () => {
    setPlaceholder("");
  };

  const handleBlur = () => {
    setPlaceholder("의견이 있으시면 기재 부탁드립니다.");
  };

  const handleCheckboxChange = (event: MouseEvent) => {
    const target = event.currentTarget;
    const name = target?.getAttribute("name");
    console.log(name);
    setIsCheck((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));

    if (name === "group8") {
      setDisabled(isCheck[name]);
    }
  };

  //취소 하면 member mypage
  //탈퇴하면 mainpage로

  const handleSuccess = async () => {
    //탈퇴는 confrim 통해
    delAction(user);

    // console.log(emailIdentity);
    const hasTrueValue = Object.entries(isCheck).some(
      ([key, value]) => value === true
    );

    if (hasTrueValue === false) {
      alert("탈퇴 사유를 입력해주세요");
      return;
    }
    //버튼을 클릭했을때 check가
    const userConfirmed = confirm("회원탈퇴를 정말하시겠습니까?");

    if (userConfirmed) {
      const { error: delError } = await supabase.auth.admin.deleteUser(
        user?.user?.id
      );
      if (!delError) {
        throw delError;
      }
      //성공하면 로그아웃, 하고  원상태로

      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }

      dispatch(setIsLogout());
      window.location.assign("/");
      // router.push("/");
      //확인을 누르면 탈퇴 절차가 진행, 완료되면 메인페이지로
    } else {
      return;
      //취소를 누르는경우 진행되지 않도록
    }
    //confirm에서
  };

  return (
    <div className="w-[1240px] mx-auto">
      <div className=" relative h-[42px]">
        <h4 className=" text-[18px] font-normal leading-[36px] inline-block absolute top-0 left-0">
          회원탈퇴 신청
        </h4>
      </div>
      <colgroup></colgroup>
      <table className=" border-[#171717] border-t-[2px] border-b-[1px]">
        <colgroup>
          <col className=" w-[315px]"></col>
          <col></col>
        </colgroup>
        <tbody>
          <tr>
            <th className=" h-[68px] pl-[43px] font-normal text-[#333] text-[14px] text-left">
              탈퇴사유
            </th>
            <td className="text-[#000] text-[14px] py-[14px] ">
              <span className=" pr-[30px] pb-[14px] relative inline-block">
                <label className=" block text-[#000] text-[14px] font-normal leading-[25px] pl-[35px] relative ">
                  <div
                    name="group1"
                    onClick={(e) => handleCheckboxChange(e)}
                    style={{
                      background: isCheck["group1"]
                        ? "url(https://i.ibb.co/zPQyzrN/spr-input.png) -30px 0 no-repeat"
                        : "url(https://i.ibb.co/zPQyzrN/spr-input.png) 0 0 no-repeat",
                    }}
                    className=" block w-[25px] h-[25px] absolute top-0 left-0"
                  ></div>
                  배송서비스가 마음에 들지 않아요
                </label>
              </span>
              <span className=" pr-[30px] pb-[14px] relative inline-block">
                <label className=" block text-[#000] text-[14px] font-normal leading-[25px] pl-[35px] relative ">
                  <div
                    name="group2"
                    onClick={(e) => handleCheckboxChange(e)}
                    style={{
                      background: isCheck["group2"]
                        ? "url(https://i.ibb.co/zPQyzrN/spr-input.png) -30px 0 no-repeat"
                        : "url(https://i.ibb.co/zPQyzrN/spr-input.png) 0 0 no-repeat",
                    }}
                    className=" block w-[25px] h-[25px] absolute top-0 left-0"
                  ></div>
                  상품, 가격, 품질이 마음에 들지 않아요
                </label>
              </span>{" "}
              <span className=" pr-[30px] pb-[14px] relative inline-block">
                <label className=" block text-[#000] text-[14px] font-normal leading-[25px] pl-[35px] relative ">
                  <div
                    name="group3"
                    onClick={(e) => handleCheckboxChange(e)}
                    style={{
                      background: isCheck["group3"]
                        ? "url(https://i.ibb.co/zPQyzrN/spr-input.png) -30px 0 no-repeat"
                        : "url(https://i.ibb.co/zPQyzrN/spr-input.png) 0 0 no-repeat",
                    }}
                    className=" block w-[25px] h-[25px] absolute top-0 left-0"
                  ></div>
                  교환/반품 서비스가 마음에 들지 않아요
                </label>
              </span>{" "}
              <span className=" pr-[30px] pb-[14px] relative inline-block">
                <label className=" block text-[#000] text-[14px] font-normal leading-[25px] pl-[35px] relative ">
                  <div
                    name="group4"
                    onClick={(e) => handleCheckboxChange(e)}
                    style={{
                      background: isCheck["group"]
                        ? "url(https://i.ibb.co/zPQyzrN/spr-input.png) -30px 0 no-repeat"
                        : "url(https://i.ibb.co/zPQyzrN/spr-input.png) 0 0 no-repeat",
                    }}
                    className=" block w-[25px] h-[25px] absolute top-0 left-0"
                  ></div>
                  회원 혜택이 부족해요
                </label>
              </span>{" "}
              <span className=" pr-[30px] pb-[14px] relative inline-block">
                <label className=" block text-[#000] text-[14px] font-normal leading-[25px] pl-[35px] relative ">
                  <div
                    name="group5"
                    onClick={(e) => handleCheckboxChange(e)}
                    style={{
                      background: isCheck["group5"]
                        ? "url(https://i.ibb.co/zPQyzrN/spr-input.png) -30px 0 no-repeat"
                        : "url(https://i.ibb.co/zPQyzrN/spr-input.png) 0 0 no-repeat",
                    }}
                    className=" block w-[25px] h-[25px] absolute top-0 left-0"
                  ></div>
                  개인정보 유출이 우려돼요
                </label>
              </span>{" "}
              <span className=" pr-[30px] pb-[14px] relative inline-block">
                <label className=" block text-[#000] text-[14px] font-normal leading-[25px] pl-[35px] relative ">
                  <div
                    name="group6"
                    onClick={(e) => handleCheckboxChange(e)}
                    style={{
                      background: isCheck["group6"]
                        ? "url(https://i.ibb.co/zPQyzrN/spr-input.png) -30px 0 no-repeat"
                        : "url(https://i.ibb.co/zPQyzrN/spr-input.png) 0 0 no-repeat",
                    }}
                    className=" block w-[25px] h-[25px] absolute top-0 left-0"
                  ></div>
                  이용빈도가 낮아요
                </label>
              </span>{" "}
              <span className=" pr-[30px] pb-[14px] relative inline-block">
                <label className=" block text-[#000] text-[14px] font-normal leading-[25px] pl-[35px] relative ">
                  <div
                    name="group7"
                    onClick={(e) => handleCheckboxChange(e)}
                    style={{
                      background: isCheck["group7"]
                        ? "url(https://i.ibb.co/zPQyzrN/spr-input.png) -30px 0 no-repeat"
                        : "url(https://i.ibb.co/zPQyzrN/spr-input.png) 0 0 no-repeat",
                    }}
                    className=" block w-[25px] h-[25px] absolute top-0 left-0"
                  ></div>
                  사이트 이용이 불편해요
                </label>
              </span>{" "}
              <span className=" pr-[30px] pb-[14px] relative inline-block">
                <label className=" block text-[#000] text-[14px] font-normal leading-[25px] pl-[35px] relative ">
                  <div
                    name="group8"
                    onClick={(e) => handleCheckboxChange(e)}
                    style={{
                      background: isCheck["group8"]
                        ? "url(https://i.ibb.co/zPQyzrN/spr-input.png) -30px 0 no-repeat"
                        : "url(https://i.ibb.co/zPQyzrN/spr-input.png) 0 0 no-repeat",
                    }}
                    className=" block w-[25px] h-[25px] absolute top-0 left-0"
                  ></div>
                  기타{" "}
                </label>
              </span>{" "}
            </td>
          </tr>
          <tr>
            <th className=" h-[68px] pl-[43px] font-normal text-[#333] text-[14px] text-left">
              고객님의 의견
            </th>
            <td className=" py-[14px] text-[#000] text-[14px] border-[#d9d9d9] border-t-[1px]">
              <textarea
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={disabled}
                placeholder={placeholder}
                className={`text-[14px] leading-[22px] py-[14px] px-[20px] tracking-[-.28px] w-[820px] h-[270px]
                
                focus:bg-[#fff] focus:border-[#000] focus:border-[1px]
                outline-none font-normal border-[#f2f2f2] bg-[#f2f2f2] border-[1px]
                `}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <form action={() => delAction(user)} className=" text-center mt-[30px]">
        <button
          onClick={() => router.push("/Member/mypage")}
          type="button"
          className=" mr-[16px] text-[16px] inline-block min-w-[180px] px-[20px] h-[50px] text-center leading-[48px] border-[#333] border-[1px] bg-[#fff] text-[#000] font-medium "
        >
          취소
        </button>

        <button
          className=" mr-[16px] text-[16px] inline-block min-w-[180px] px-[20px] h-[50px] text-center leading-[48px] border-[#000] border-[1px] bg-[#000] text-[#fff] font-medium "
          onClick={handleSuccess}
          type="button"
        >
          탈퇴
        </button>
      </form>
      <div className=" my-[60px]">
        <h3 className=" leading-4 align-middle mb-[8px] text-[16px] font-normal">
          안내드립니다.
        </h3>
        <ul className="pl-[7px]">
          <li
            className=" 
          before:w-[2px] before:h-[2px] before:bg-[#666] before:absolute before:top-[9px] before:left-0 before:block
          text-[12px] leading-[22px] relative pl-[11px] text-[#333] font-normal"
          >
            회원 탈퇴 시점을 기준으로 배송중 혹은 반품이나 교환 중에 있는 물품이
            없을 때만 탈퇴 처리가 가능합니다.
          </li>
          <li
            className=" 
          before:w-[2px] before:h-[2px] before:bg-[#666] before:absolute before:top-[9px] before:left-0 before:block
          text-[12px] leading-[22px] relative pl-[11px] text-[#333] font-normal"
          >
            회원 탈퇴 시 보유하고 계신 쿠폰 및 포인트, 상품권이 자동 소멸되며
            복구되지 않습니다. 회원 탈퇴 후 30일 동안 재가입이 제한됩니다.
          </li>

          <li
            className=" 
          before:w-[2px] before:h-[2px] before:bg-[#666] before:absolute before:top-[9px] before:left-0 before:block
          text-[12px] leading-[22px] relative pl-[11px] text-[#333] font-normal"
          >
            회원 탈퇴 후 재가입 방지 목적으로 30일 동안 개인정보(이메일아이디,
            CI/DI, 휴대폰번호)를 보관하며, 재가입 제한 기간 경과 후 즉시
            파기됩니다.
          </li>

          <li
            className=" 
          before:w-[2px] before:h-[2px] before:bg-[#666] before:absolute before:top-[9px] before:left-0 before:block
          text-[12px] leading-[22px] relative pl-[11px] text-[#333] font-normal"
          >
            단, 전자상거래 등에서의 소비자보호에 관한 법률, 통신비밀보호법 등
            관련 법령의 규정에 의하여 아래와 같이 개인정보가 일정 기간
            보관됩니다.
            <p>
              {" "}
              - 계약 또는 청약철회 등에 관한 기록 : 5년, 대금결제 및 재화 등의
              공급에 관한 기록 : 5년, 소비자의 불만 또는 분쟁처리에 관한 기록 :
              3년, 웹사이트 방문 기록 : 3개월
            </p>
          </li>
          <li
            className=" 
          before:w-[2px] before:h-[2px] before:bg-[#666] before:absolute before:top-[9px] before:left-0 before:block
          text-[12px] leading-[22px] relative pl-[11px] text-[#333] font-normal"
          >
            SMS, E-MAIL 광고를 수신하셨다면 탈퇴 이후 약 2일~3일 정도까지 광고가
            전송될 수 있사오니, 이 점 양해 부탁드립니다.
          </li>

          <li
            className=" 
          before:w-[2px] before:h-[2px] before:bg-[#666] before:absolute before:top-[9px] before:left-0 before:block
          text-[12px] leading-[22px] relative pl-[11px] text-[#333] font-normal"
          >
            W컨셉 삼성카드 가입회원의 회원 탈퇴 시 삼성카드 혜택이 지급되지
            않습니다.
          </li>
        </ul>
      </div>
    </div>
  );
}

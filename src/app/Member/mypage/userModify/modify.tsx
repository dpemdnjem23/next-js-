"use client";

import { supabase } from "@/lib";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface alertData {
  passwordAlert: string;
  confirmPasswordAlert: string;
}
interface formData {
  password: string;
  confirmPassword: string;
}
export default function Modify() {
  const data = JSON.parse(localStorage.getItem("userInfo"));

  const router = useRouter();

  const [formData, setFormData] = useState<formData>({
    password: "",
    confirmPassword: "",
  });

  const [alertData, setAlertData] = useState<alertData>({
    passwordAlert: "",
    confirmPasswordAlert: "",
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordBlur = () => {
    if (!passwordLength(formData.password)) {
      setFormData({
        ...formData,
        password: "",
      });
      alert("8자 이상 입력해주세요");
    } else if (!strongPassword(formData.password)) {
      setFormData({
        ...formData,
        password: "",
      });
      alert("영문, 숫자, 특수문자를 모두 사용하여 입력해주세요.");
    }
  };

  const passwordLength = (password: string) => {
    if (password.length < 8) {
      return false;
    } else return true;
  };

  const strongPassword = (password: string) => {
    // 영문, 숫자, 특수문자가 모두 포함되어 있는지 확인
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasLetter || !hasNumber || !hasSpecialChar) {
      console.log(password);

      return false;
    } else {
      return true;
    }
  };

  const isMatch = (password1: string, password2: string) => {
    return password1 === password2;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    //모든 요소를 만족하고, 닉네임읋 확인했을때
    if (
      passwordLength(formData.password) &&
      strongPassword(formData.password) &&
      isMatch(formData.password, formData.confirmPassword)
    ) {
      try {
        const { error } = await supabase.auth.updateUser({
          password: formData.password,
        });

        //비밀번호 변경 실패
        if (error) {
          alert("비밀번호가 같습니다 다시 입력해주세요");
          throw error;
        }
        //비밀 번호 변경 성공
        router.push("/");
      } catch (error) {
        console.error("Error signing up:", error.message);
      }
    } else if (!isMatch(formData.password, formData.confirmPassword)) {
      alert("비밀번호가 일치하지 않습니다.");
    }
    //submit을했을때 없는것부터 아이디 -> 비밀번호 ->닉네임 순으로 입력해달라고하기

    //닉네임까지 모두 채웠다면
  };

  return (
    <div className="w-[1240px] mx-auto">
      <div className=" relative h-[41px] ">
        <h3
          className=" text-[#000] font-normal text-[24px] leading-[36px] inline-block absolute top-0 left\
        "
        >
          회원정보 수정
        </h3>
      </div>
      <form>
        <table className="border-[#171717] border-t-[2px] border-b-[1px] mb-[60px] table-fixed w-[100%]">
          <colgroup>
            <col className="w-[315px]"></col>
            <col></col>
          </colgroup>
          <tbody>
            <tr>
              <th
                className="
              text-[14px] text-left
              h-[68px] pl-[43px] font-normal font-sans text-[#333]"
              >
                이메일 아이디
              </th>
              <td className="px-[19px] text-[#000] text-[14px]">
                {data?.user?.email}
              </td>
            </tr>
            <tr>
              <th
                className="
              text-[14px] text-left
              h-[68px] pl-[43px] font-normal font-sans text-[#333]"
              >
                비밀번호 변경
              </th>
              <input
                value={formData.password}
                name="password"
                type="password"
                onBlur={handlePasswordBlur}
                onChange={handlePasswordChange}
                maxLength={16}
                className=" 
              focus:bg-[#fff] focus:border-[#000] focus:border-[1px] focus:outline-none
              w-[200px] h-[40px] leading-[38px] pl-[20px] bg-[#f2f2f2] border-[#f2f2f2] border-[1px]"
              ></input>
            </tr>
            <tr>
              <th
                className="
              text-[14px] text-left
              h-[68px] pl-[43px] font-normal font-sans text-[#333]"
              >
                비밀번호 확인
              </th>
              <input
                type="password"
                value={formData.confirmPassword}
                name="confirmPassword"
                onChange={handlePasswordChange}
                maxLength={16}
                className=" 
              focus:bg-[#fff] focus:border-[#000] focus:border-[1px] focus:outline-none
              w-[200px] h-[40px] leading-[38px] pl-[20px] bg-[#f2f2f2] border-[#f2f2f2] border-[1px]"
              ></input>
            </tr>
          </tbody>
        </table>
        {/* 버튼 부분 */}
        <div className=" text-center">
          <button
            className="
                  border-[#333] border-[1px]
                  mr-[16px] inline-block min-w-[180px] px-[20px] text-[16px] leading-[48px] text-[#000] h-[50px] text-center"
            type="button"
          >
            <Link href={"/Member/mypage"}>취소</Link>
          </button>
          <button
            onClick={(e) => handleSubmit(e)}
            className="
                  border-[#000] border-[1px] bg-[#000]
                  mr-[16px] inline-block min-w-[180px] px-[20px] text-[16px] leading-[48px] text-[#fff] h-[50px] text-center"
            type="button"
          >
            수정
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supbabase";
import { comparePassword } from "@/app/api/auth";

export default function LoginPage() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const onSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setMessage("");

    //로그인하기, 아이디 비밀번호 입력 -> 비밀번호 암호화로 검증필요
    //로그인 성공시 user 정보가 담겨야한다.

    try {
      // comparePassword(data?.password,password)

      //아이디로 우선 검증한다. 아이디를 못찾는경우 아이디를 검색할수 없다.
      //아이디를 찾는경우 비밀번호 검증으로
      if (id) {
        const { data, error }: any = await supabase
          .from("user")
          .select()
          .eq("user", id)
          .single();
        console.log(data);

        if (!data) {
          setMessage(
            "아이디 또는 비밀번호가 일치하지 않습니다. 다시 입력해주세요"
          );
        }
        setMessage("");

        //비밀번호가 일치하는 경우
        if (await comparePassword(password, data.password)) {
          console.log("일치");

          //비밀번호가 일치하면  로그인상태를 유지한다.
        } else {
          console.log("불일치");
          setMessage(
            "아이디 또는 비밀번호가 일치하지 않습니다. 다시 입력해주세요"
          );
        }
        //비밀번호가 일치하지 않는경우

        // }
        //   if (!response?.ok) {
        //     setMessage("아이디와 비밀번호가 일치하지 않습니다.");
        //   } else {
        //     router.replace("/");
        //   }
      } else {
        setMessage("아이디를 입력해주세요");
      }
    } catch (err) {
      console.error(err);
      setMessage("아이디와 비밀번호가 일치하지 않습니다.");
    }
  };

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="pt-[55px] pb-[36px] relative min-w-[1200px]">
        <h3 className=" text-[40px] text-center uppercase">Login</h3>
      </div>
      <div className="w-[1240px] mx-auto my- border-t-[2px] ">
        <div className="pt-[60px] border-t-[2px] border-[#171717]">
          <div className="w-[735px] mx-auto my-0">
            <div className="relative float-left w-[525px] pb-[16px] mb-[26px]">
              <div className="m-0">
                <label className="float-left w-[105px] pb-0 leading-[40px]">
                  아이디
                </label>
                <input
                  onChange={onChangeId}
                  className="float-left w-[420px] h-[40px] leading-[38px] pl-[20px] bg-[#f2f2f2] border-[1px] border-[#f2f2f2] text-[14px]  outline-none"
                  type="text"
                  name="custId"
                  // maxLength={20}
                  placeholder="아이디를 입력해주세요"
                ></input>
              </div>

              <div className="mt-[60px]">
                <label className="float-left w-[105px] pb-0 leading-[40px]">
                  비밀번호
                </label>
                <input
                  onChange={onChangePassword}
                  className="float-left w-[420px] h-[40px] leading-[38px] pl-[20px] bg-[#f2f2f2] border-[1px] border-[#f2f2f2] text-[14px]  outline-none"
                  type="password"
                  name="custId"
                  maxLength={20}
                  placeholder="비밀번호를 입력해주세요"
                ></input>
              </div>
              {message ? (
                <p className="ml-[95px]  absolute bottom-[-40px] left-0 text-[#fa5500] text-[12px]">
                  <svg
                    className="inline-block align-text-top mt-[1px] mb- ml-[16px] mr-[4px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                  >
                    <g
                      data-name="Rectangle 104"
                      style={{ fill: "#fff", stroke: "#fa5500" }}
                    >
                      <rect
                        width="11"
                        height="11"
                        rx="5.5"
                        style={{ stroke: "none" }}
                      />
                      <rect
                        x=".5"
                        y=".5"
                        width="10"
                        height="10"
                        rx="5"
                        style={{ fill: "none " }}
                      />
                    </g>
                    <path
                      data-name="Union 7"
                      d="M9163 5V2h1v3zm0-4V0h1v1z"
                      transform="translate(-9158 3)"
                      style={{ fill: "#fa5500" }}
                    />
                  </svg>

                  <label>{message}</label>
                </p>
              ) : (
                ""
              )}
            </div>
            <form className="float-right w-[190px]">
              <button
                onClick={onSubmit}
                type="submit"
                className="  mb-0 w-[100%] text-[16px] bg-[#000] text-[white] h-[100px]"
              >
                로그인
              </button>
              <ul className="text-[0px] mt-[20px] text-center text-[#777]">
                <li className="m-0 text-[12px] p-0 list-none  inline-block relative">
                  아이디 찾기
                  <div className="left-[70px] top-[3px] absolute w-[1px] h-[12px] bg-[#e2e2e2] "></div>
                </li>
                <li className="text-[12px] px-[20px] py-[5px] inline-block list-none relative m-0 p-0">
                  비밀번호 찾기
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";
// import { signup } from "@/app/api/auth/page";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
// import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

interface alertData {
  emailAlert: string;
  passwordAlert: string;
  confirmPasswordAlert: string;
  nicknameAlert: string;
}
interface formData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

import { useState, useReducer, useEffect } from "react";

export default function Signup() {
  const [emailState, setEmailState] = useState<boolean>(false);
  const [formData, setFormData] = useState<formData>({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  const [alertData, setAlertData] = useState<alertData>({
    emailAlert: "본인 소유의 이메일을 입력해주세요",
    passwordAlert: "",
    confirmPasswordAlert: "",
    nicknameAlert: "",
  });

  const router = useRouter();

  //아이디 확인
  // const handleUserBlur = async () => {
  //   //유효성 검사 모두 통과한후
  //   if (isValidEmail(formData.email) && idLength(formData.email)) {
  //     try {
  //       const { data, error } = await supabase
  //         .from("auth.Users")
  //         .select("user")
  //         .eq("email", formData.email);
  //       console.log(data, error);

  //       if (data?.length === 0) {
  //         setAlertData({
  //           ...alertData,
  //           emailAlert: "사용가능한 아이디 입니다.",
  //         });
  //         setEmailState(true);
  //         return;

  //         //check했을때 이메일이 존재하지 않는경우
  //       }
  //       setAlertData({
  //         ...alertData,
  //         emailAlert: "중복된 아이디 입니다.",
  //       });
  //       setEmailState(false);
  //     } catch (err) {
  //       console.error(err);
  //       throw err;
  //     }
  //   }
  // };

  const handleUserPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (!idLength(formData.email)) {
      setTimeout(() => {
        setAlertData({
          ...alertData,
          emailAlert: "아이디는 5자이상으로 입력해주세요",
        });
      }, 100);
    } else if (!isValidEmail(formData.email)) {
      setTimeout(() => {
        setAlertData({
          ...alertData,
          emailAlert: "아이디는 이메일 형식으로 입력해주세요",
        });
      }, 100);
    } else {
      setTimeout(() => {
        setAlertData({
          ...alertData,
          emailAlert: "",
        });
      }, 100);
    }
    if (!formData.email) {
      setTimeout(() => {
        setAlertData({
          ...alertData,
          emailAlert: "본인 소유의 이메일을 입력하세요",
        });
      }, 100);
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (!idLength(formData.email)) {
      setTimeout(() => {
        setAlertData({
          ...alertData,
          emailAlert: "아이디는 5자이상으로 입력해주세요",
        });
      }, 100);
    } else if (!isValidEmail(formData.email)) {
      setTimeout(() => {
        setAlertData({
          ...alertData,
          emailAlert: "아이디는 이메일 형식으로 입력해주세요",
        });
      }, 100);
    } else {
      setTimeout(() => {
        setAlertData({
          ...alertData,
          emailAlert: "",
        });
      }, 100);
    }
  };

  // const handleUserBlur = () => {};

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

  const handleNickChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      nickname: e.target.value,
    });
  };

  const handlePasswordCheckBlur = () => {
    if (!isMatch(formData.password, formData.confirmPassword)) {
      setAlertData({
        ...alertData,
        confirmPasswordAlert: "비밀번호 정보가 일치하지 않습니다.",
      });
    } else {
      setAlertData({
        ...alertData,
        confirmPasswordAlert: "",
      });
    }
  };

  // 비밀번호 1. 8자를 안채우면 8~16자 이내로 안내
  // 비밀번호 2. 8자를 채우면 영어 숫자 특수문자 조합
  //

  const handlePasswordBlur = () => {
    if (!passwordLength(formData.password)) {
      setAlertData({
        ...alertData,
        passwordAlert: "8자~16자 이내로 입력해주세요",
      });

      setFormData({
        ...formData,
        password: "",
      });
    } else if (!strongPassword(formData.password)) {
      setAlertData({
        ...alertData,
        passwordAlert: "영문, 숫자, 특수문자를 모두 사용하여 입력해주세요.",
      });
      setFormData({
        ...formData,
        password: "",
      });
    } else {
      setAlertData({
        ...alertData,
        passwordAlert: "사용 가능합니다.",
      });
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    //모든 요소를 만족하고, 닉네임읋 확인했을때
    console.log("zmfflr");
    if (
      passwordLength(formData.password) &&
      strongPassword(formData.password) &&
      isValidEmail(formData.email) &&
      idLength(formData.email)
    ) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              first_name: "John",
              age: 27,
            },
          },
        });

        if (error) {
          setAlertData({
            ...alertData,
            emailAlert: "이미 등록된 이메일 입니다.",
          });
          throw error;
        }
        router.push("/");
      } catch (error) {
        setAlertData({
          ...alertData,
          emailAlert: "이미 등록된 이메일 입니다.",
        });
        console.error("Error signing up:", error.message);
      }

      //회원가입 성공
    } else if (!formData.email) {
      console.log("username");
      setAlertData({
        ...alertData,
      });
    } else if (!formData.password) {
      setAlertData({
        ...alertData,
        passwordAlert: "비밀번호를 입력해주세요",
      });
    } else if (!formData.confirmPassword) {
      setAlertData({
        ...alertData,
        passwordAlert: "비밀번호 확인 을 입력해주세요",
      });
    }
    //submit을했을때 없는것부터 아이디 -> 비밀번호 ->닉네임 순으로 입력해달라고하기

    //닉네임까지 모두 채웠다면
  };

  //아이디의 길이
  const idLength = (value: string) => {
    return value.length >= 5;
  };
  //아이디는 영어 숫자만 가능하다.
  function isValidEmail(str: string) {
    // 이메일 유효성 검사 정규 표현식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
  }

  //8글자 이상, 영문, 숫자, 특수문자 사용
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

  // if (formData.email === "") {
  //   console.log("여기");
  //   setAlertData({
  //     ...alertData,
  //     emailAlert: "본인 소유의 이메일을 입력하세요",
  //   });
  // }
  return (
    <>
      <div className="pt-[55px] pb-[35px] relative min-w-[1240px]">
        <h2 className="text-[44px] font-sans font-thin leading-[44px] text-center uppercase">
          signup member
        </h2>
      </div>
      <div className="w-[1240px] my-0 mx-auto">
        <p className=" text-right mb-[3px] align-middle text-[#666] font-sans text-[12px] ">
          <span className="text-[#ff1414] align-middle inline-block">*</span>
          필수 입력 항목
        </p>
        <table className=" border-t-[2px] border-[#171717] w-[100%] border-b-[1px] table-fixed mb-[60px]">
          <colgroup>
            <col className="w-[280px]"></col>
          </colgroup>
          <tbody>
            <tr>
              <td className="p-0 border-none" colSpan={2}>
                <div className="bg-[#ff6160] text-[#fff] text-center table w-[100%] h-[50px]">
                  <strong className="text-[20px] font-normal table-cell align-middle">
                    회원으로 가입하시면 즉시 사용가능한
                    <span className="text-[18px]"> 10%</span> 할인쿠폰을
                    드립니다.
                  </strong>
                </div>
              </td>
            </tr>
            <tr>
              <th className="h-[70px] pl-[42px] font-sans font-light text-[14px] text-left border-t-[1px] border-[#d9d9d9]">
                이메일 아이디
                <span className=" inline-block text-[#ff1414] pt-[2px]">*</span>
              </th>

              <td className="py-0 px-[19px] text-[14px] border-t-[1px] border-[#d9d9d9]">
                <p className=" align-middle inline-block">
                  <input
                    placeholder="아이디"
                    name="email"
                    // onBlur={handleUserBlur}
                    onPaste={handleUserPaste}
                    value={formData.email}
                    onChange={handleUserChange}
                    className=" w-[400px] h-[40px] leading-[38px] bg-[#f2f2f2] border-[1px] border-[#f2f2f2] text-[14px] font-sans font-light"
                    type="text"
                  ></input>
                </p>
                {alertData.emailAlert ? (
                  <p className="text-[12px] text-[#fa5500] inline-block">
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

                    <label>{alertData.emailAlert}</label>
                  </p>
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <th className="h-[70px] pl-[42px] font-sans font-light text-[14px] text-left border-t-[1px] border-[#d9d9d9]">
                비밀번호
                <span className=" inline-block text-[#ff1414] pt-[2px]">*</span>
              </th>

              <td className="py-0 px-[19px] text-[14px] border-t-[1px] border-[#d9d9d9]">
                <p className=" align-middle inline-block">
                  <input
                    name="password"
                    maxLength={16}
                    placeholder="영문+숫자+특수문자 조합 8~16자"
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    value={formData.password}
                    className=" w-[400px] h-[40px] leading-[38px] bg-[#f2f2f2] border-[1px] border-[#f2f2f2] text-[14px] font-sans font-light"
                    type="text"
                  ></input>
                </p>
                {alertData.passwordAlert ? (
                  <p className="text-[12px] text-[#fa5500] inline-block">
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

                    <label>{alertData.passwordAlert}</label>
                  </p>
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <th className="h-[70px] pl-[42px] font-sans font-light text-[14px] text-left border-t-[1px] border-[#d9d9d9]">
                비밀번호 확인
                <span className=" inline-block text-[#ff1414] pt-[2px]">*</span>
              </th>

              <td className="py-0 px-[19px] text-[14px] border-t-[1px] border-[#d9d9d9]">
                <p className=" align-middle inline-block">
                  <input
                    name="confirmPassword"
                    maxLength={16}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordCheckBlur}
                    value={formData.confirmPassword}
                    className=" w-[400px] h-[40px] leading-[38px] bg-[#f2f2f2] border-[1px] border-[#f2f2f2] text-[14px] font-sans font-light"
                    type="text"
                  ></input>
                </p>
                {alertData.confirmPasswordAlert ? (
                  <p className="text-[12px] text-[#fa5500] inline-block">
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

                    <label>{alertData.confirmPasswordAlert}</label>
                  </p>
                ) : (
                  ""
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <form className="text-center min-w-[1240px]">
        <button className=" my-0 mx-[8px] inline-block w-auto min-w-[180px] py-0 px-[20px] h-[50px] text-center border-[1px] bg-[#fff] text-[#000] border-[#000] text-[14px] font-medium">
          취소
        </button>
        <button
          onClick={handleSubmit}
          className=" my-0 mx-[8px] inline-block w-auto min-w-[180px] py-0 px-[20px] h-[50px] text-center border-[1px] bg-[#000] text-[#fff] border-[#000] text-[14px] font-medium"
        >
          확인
        </button>
      </form>
    </>
  );
}

"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logOutImage from "../../../../public/ico_logout.svg";

export default function LogoutButton() {
  const router = useRouter();
  //useSession 훅을 사용하면 로그인한 유저의 정보를 가져온다.

  const onLogout = () => {
    // 클라이언트 컴포넌트이므로 서버의 리다이렉트를 off 하고
    // useRouter 훅을 통해 리다이렉트 해준다.
    signOut({ redirect: false }).then(() => {
      router.refresh();
      router.replace("/");
    });
  };

  return (
    <div onClick={onLogout} className=" block relative p-[20px] cursor-pointer">
      <Image alt="" src={logOutImage}></Image>
      <strong className=" absolute bottom-0 left-0 right-0 text-[12px] line-[12px]">
        Logout
      </strong>
    </div>
  );
}

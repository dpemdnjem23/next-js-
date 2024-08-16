"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logOutImage from "../../../public/ico_logout.svg";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin, setIsLogout } from "@/reducers/slices/UserSlice";
import { cookieDel } from "@/utils/cookieUtils";
import { supabase } from "@/lib";
import { signOut } from "../_lib/signOut";

export default function LogoutButton() {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken") || undefined;

  //useSession 훅을 사용하면 로그인한 유저의 정보를 가져온다.
  const onLogout = async () => {
    //쿠키삭제, localstorage 삭제,
    const { errorMessage } = await signOut();
    if (errorMessage) {
      throw Error(errorMessage);
    } else {
      dispatch(setIsLogout());
      window.location.assign("/");
    }
  };

  return (
    <button
      onClick={onLogout}
      className=" block uppercase relative p-[20px] cursor-pointer"
    >
      <Image alt="" src={logOutImage}></Image>
      <strong className=" absolute bottom-0 left-0 right-0 text-[12px] line-[12px]">
        Logout
      </strong>
    </button>
  );
}

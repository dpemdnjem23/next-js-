import { useQuery } from "react-query";
import { cookieGet } from "@/utils/cookieUtils";

export const useCartData =async  (userId: string) => {
  const cookie = await cookieGet("cartId");

  return useQuery(
    ["userData", userId || "guest", cookie || "no-cookie"], // 캐시 키 구성
    {
      enabled: Boolean(userId) || Boolean(cookie), // userId나 cookie가 있을 때만 fetch
    }
  );
};

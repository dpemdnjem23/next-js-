"use client";
import { setFavorites, setIsHeart } from "@/reducers/slices/UserSlice";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useHeartState() {
  const personalHeart = useSelector((state) => state?.user?.personalHeart);
  const cartCheckModal = useSelector((state) => state?.product?.cartCheckModal);
  const favorites = useSelector((state) => state?.user.favorites);
  const cardInfoModal = useSelector((state)=> state?.product.cardInfoModal)

  const product = useSelector((state) => state?.product.product);

  const pointsModal = useSelector((state) => state?.product.pointsInfoModal);
  const dispatch = useDispatch();

  const isHeart = useSelector((state) => state?.user.isHeart);
  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "{}");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const { product_code } = useParams();

  useEffect(() => {
    let ignore = false;
    const result = async () => {
      try {
        if (!product.id) {
          return; // product.id가 없으면 요청을 보내지 않고 함수를 종료
        }
        const { data, error }: any = await supabase
          .from("favorite")
          .select()
          .eq("user_id", userInfo?.user?.id)
          .eq("product_id", product?.id);

        // if (response.error) {
        //   throw response.error;
        // }

        if (!ignore) {
          dispatch(setFavorites(data));
        }
      } catch (err) {
        throw err;
      }
    };

    result();

    return () => {
      ignore = true;
    };
  }, [product?.id]);

  useEffect(() => {
    let ignore = false;

    try {
      if (!product.id) {
        return; // product.id가 없으면 요청을 보내지 않고 함수를 종료
      }

      const result = async () => {
        const { data, error }: any = await supabase
          .from("favorite")
          .select()
          .eq("product_id", product?.id);

        // if (error) {
        //   throw error;
        // }

        if (!ignore) {
          dispatch(setIsHeart(data));
        }
      };

      result();

      return () => {
        ignore = true;
      };
    } catch (err) {
      throw err;
    }
  }, [dispatch, favorites, product.id]);
}

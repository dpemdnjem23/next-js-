"use client";

import { clearOption } from "@/reducers/slices/ProductSlice";
import { useDispatch } from "react-redux";

export const useClickProduct = () => {
  //product중 id, 브랜드, front 사진 만저장

  // 현재 날짜 객체 생성
  var currentDate = new Date();

  const dispatch = useDispatch();

  // 원하는 형식으로 날짜를 문자열로 변환
  var formattedDate =
    currentDate.getFullYear() +
    "." +
    ("0" + (currentDate.getMonth() + 1)).slice(-2) +
    "." +
    ("0" + currentDate.getDate()).slice(-2);

  const handleProductClick = (product, id, index) => {
    const history = {
      product_code: product[index].product_code,

      today: formattedDate,
      id: product[index].id,
      front: product[index].front,
      front_multiline: product[index].front_multiline,

      brand: product[index].brand,
      thumbnail: product[index].thumbnail,
    };
    const items = JSON.parse(localStorage.getItem("history") || "{}");
    let isExist = false;
    //중복확인 절차.

    //쭉나열해놓으면 그걸로 그룹핑을해서 하면되겟다.
    // product 는 [{},{}] ...
    items?.forEach((item) => {
      if (item.id === history.id) {
        isExist = true;
      }
    });

    if (isExist) {
      return;
    }
    dispatch(clearOption()); // 옵션 초기화

    localStorage.setItem("history", JSON.stringify([...items, history]));
  };

  return { handleProductClick };
};


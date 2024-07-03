"use client";
export const onClickProduct = (product, id: number, index: number) => {
  //product중 id, 브랜드, front 사진 만저장

  // 현재 날짜 객체 생성
  var currentDate = new Date();

  console.log(product[index]);
  // 원하는 형식으로 날짜를 문자열로 변환
  var formattedDate =
    currentDate.getFullYear() +
    "." +
    ("0" + (currentDate.getMonth() + 1)).slice(-2) +
    "." +
    ("0" + currentDate.getDate()).slice(-2);

  const history = {
    product_code: product[index].product_code,

    today: formattedDate,
    id: product[index].id,
    front: product[index].front,
    front_multiline:product[index].front_multiline,

    brand: product[index].brand,
    thumbnail: product[index].thumbnail,
  };
  const items = JSON.parse(localStorage.getItem("history") || "{}");
  let isExist = false;
  //중복확인 절차.


  //쭉나열해놓으면 그걸로 그룹핑을해서 하면되겟다.
  // product 는 [{},{}] ...
  items?.forEach((item) => {
    console.log(item.id === history.id, item.id, product.id);
    if (item.id === history.id) {
      isExist = true;
    }
  });

  if (isExist) {
    return;
  }

  localStorage.setItem("history", JSON.stringify([...items, history]));
};

export const getHistory = () => {
  return JSON.parse(localStorage.getItem("history") || "{}");
};

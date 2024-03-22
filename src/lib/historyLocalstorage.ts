export const onClickProduct = (product) => {
  //product중 id, 브랜드, front 사진 만저장

  // 현재 날짜 객체 생성
  var currentDate = new Date();

  // 원하는 형식으로 날짜를 문자열로 변환
  var formattedDate =
    currentDate.getFullYear() +
    "." +
    ("0" + (currentDate.getMonth() + 1)).slice(-2) +
    "." +
    ("0" + currentDate.getDate()).slice(-2);

  const history = {
    product_code: product[0].product_code,

    today: formattedDate,
    id: product[0].id,
    front: product[0].front,
    brand: product[0].brand,
    thumbnail: product[0].thumbnail,
  };
  const items = JSON.parse(localStorage.getItem("history")) || [];
  let isExist = false;
  //중복확인 절차.

  console.log(history);
  items?.forEach((item) => {
    console.log(item.id === history.id, item.id, product.id);
    if (item.id === history.id) {
      isExist = true;
    }
  });

  if (isExist) {
    return;
  }

  localStorage.setItem("history", JSON.stringify([history]));
};

export const getHistory = () => {
  return JSON.parse(localStorage.getItem("history")) || [];
};

"usc client";
import { supabase } from "@/lib";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function CartButton() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [selectedItems, setSelectedItems] = useState<[]>([]);

  const boxObj = useSelector((state) => state?.cart?.boxObj);

  const cartItems = queryClient.getQueryData(["carts"]);

  const updatedData = async (el) => {
    const { data, error } = await supabase
      .from("cart")
      .update({ options: el.options, quantity: el.quantity })
      .eq("id", el.id)

      .select();

    console.log(data, "up");
  };

  const deleteData = async (el) => {
    const { data, error } = await supabase
      .from("cart")
      .delete()
      .eq("id", el.id)
      .select();

    console.log(data);

    return data;
  };

  const mutation2 = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const mutation = useMutation({
    mutationFn: updatedData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  //선택 삭제하기가 아니라 quantity, options update하기
  // 배열에 end만 남아있으면 삭제

  const handleDelete = () => {
    let result;
    if (boxObj.length === 0) {
      alert("삭제하실 상품을 선택");
    } else {
      result = window.confirm(
        "선택하신 상품을 장바구니에서 삭제 하시겠습니까?"
      );
    }

    if (result) {
      alertDelete();

      // router.refresh();
    }
  };
  //end를 남겨 놓아야한다.

  const alertDelete = async () => {
    // boxObj중에 setChecked true인것만 다시 뺀다.

    const mergedData = Object.values(
      boxObj.reduce((acc, item) => {
        if (!acc[item.id]) {
          acc[item.id] = { id: item.id, quantity: [], option: [] };
        }

        // const optionWithEnd = item.option.map((option) => option + "end");

        if (item?.isChecked === false) {
          acc[item.id].quantity.push(item?.quantity);
          acc[item.id].option.push(item?.option);
        }

        return acc;
      }, {})
    );

    console.log(mergedData, "mer");
    const selectedIdsToRemove = mergedData?.map((item) => item.id);

    const updatedCartItems = cartItems?.data?.map((item, idx) => {
      //mergedData에서 사용할

      const selectedOptionsToRemove = mergedData?.find((selectedItem) => {
        console.log("selected", selectedItem);
        return selectedItem.id === item.id;
      });

      //end를 넣어야되고 qunatity도 줄여야한다.
      console.log(selectedOptionsToRemove, "selectedOption");
      return {
        ...item,
        options: item.options.filter((option, index) => {
          console.log(
            selectedOptionsToRemove,
            "remove",
            selectedIdsToRemove.includes(item.id)
          );
          if (selectedIdsToRemove.includes(item.id)) {
            console.log(
              option,
              // selectedOptionsToRemove?.option,
              selectedOptionsToRemove?.option.includes(option),
              "item.id가 포함된경우"
            );
            return (
              option === "end" ||
              selectedOptionsToRemove?.option.includes(option)
            );
          }
          return true;
        }),
        quantity: item.quantity.filter((quant, index) => {
          if (selectedIdsToRemove.includes(item.id)) {
            console.log(
              quant,
              selectedOptionsToRemove,
              selectedOptionsToRemove?.quantity,
              selectedOptionsToRemove?.quantity === quant,
              "quant"
            );
            return (
              // quant !== undefined &&
              selectedOptionsToRemove?.quantity[index] === quant
            );
          }
          return true;
        }),
      };

      // return el
    });

    // updatedCartItems.option.push("end");
    // return;
    //체크된 cart를 합쳐놨다.
    //cartItems와 비교해서 같은것 제외. 만약 option에
    //아무것도 존재하지않으면 [] delete 존재하면 upsert 한다.

    //supabase에서 options를 업데이트

    //upsert로 반영 하면된다.
    //updateCartItems id가 여러개일텐데,
    //
    //2개이상인경우 upsert로 그대로 넣어준다.

    updatedCartItems?.forEach(async (el) => {
      //op

      if (el?.options?.length >= 2) {
        mutation.mutate(el);
        // window.location.reload();
      } else if (el?.options?.length <= 1) {
        mutation2.mutate(el);
        // window.location.reload();
      }
    });

    // console.log(data, "sdfsdfas");

    //option에 end만 남아있는경우 삭제
    //box obj를

    //체크한 cart들을 가지고 option에서 제거,quantity제거

    //id가 1개고 box obj 는 여러개
  };

  //cartItem
  return (
    <div className=" mt-[-10px] overflow-hidden flex justify-between items-start">
      <div>
        <button
          onClick={handleDelete}
          className="mr-[10px] h-[50px] leading-50px] 
      text-[#000] bg-[#fff]
      border-[#333333]
      inline-block min-w-[180px] text-[14px] px-[20px] border-[1px] text-center"
          type="button"
        >
          선택 상품 삭제
        </button>
        <button
          onClick={() => router.back()}
          className="mr-[10px] h-[50px] leading-50px] 
            text-[#fff] bg-[#7d7d7d] 
            border-[#7d7d7d]
            inline-block min-w-[180px] text-[14px] px-[20px] border-[1px] text-center"
          type="button"
        >
          쇼핑계속하기
        </button>
      </div>
    </div>
  );
}

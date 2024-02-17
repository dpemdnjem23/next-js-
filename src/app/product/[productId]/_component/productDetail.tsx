"use client";
import { useEffect, useState } from "react";
import { Post } from "@/model/Post";
import { useParams } from "next/navigation";

export default function ProductDetail() {
  const [product, setProduct] = useState<Post[]>([]);
  const navigation = useParams();
  
  useEffect(() => {
    try {
      const result = async () => {
        const response = await fetch(`{http://localhost:8080/post/product`, {
          method: "get",
        });

        setProduct(await response.json());
      };
      result();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div className="float-right w-[660px]">
        <form>
          <div className="relative">
            {/* 상품명 정보 */}
            <h2 className="text-[24px] font-semibold cursor-pointer text-[2e2e2e] w-auto m-0 leading-[29px]"></h2>
          </div>
        </form>
      </div>
    </>
  );
}

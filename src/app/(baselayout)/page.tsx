"use client";
import Image from "next/image";
import Slider from "./components/slider";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import mainSliderImage from "../../../public/pc04_1920x600_pre_20240104180145.jpg";
import mainSliderImage2 from "../../../public/pc07_1920x600_pre_20240104180315.jpg";
import mainSliderImage3 from "../../../public/pc08_1920x600_pre_20240104180340.jpg";
import mainSliderImage4 from "../../../public/pc10_1920x600_pre_20240104180425.jpg";
import mainSliderImage5 from "../../../public/pc11_1920x600_pre_20240104180452.jpg";
import { useEffect, useState } from "react";
import ThumbnailList from "./components/thumbnailList";
import { useInView } from "react-intersection-observer";
import ScrollButton from "@/app/(baselayout)/components/ScrollButton";
import Header from "../_component/header";
import { setIsHeader, setIsModal } from "@/reducers/slices/HomeSlice";
import { result } from "lodash";
import { Post } from "@/model/Post";
import ShoppingHistoryModal from "../@ modal/shoppingHistory/page";
import { supabase } from "@/lib";
const Home = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState<any>([]);
  useEffect(() => {
    try {
      const result = async () => {
        const { data: product, error } = await supabase.from("product").select(`
        id,brand,front,front_multiline,price,discount,imageArr,general_info,thumbnail,option,product_code,
        category(id, category_name
        )
      
        `);

        console.log(product);
        setProduct(product);
      };
      result();
    } catch (err) {
      console.log(err);
    }
  }, []);
  console.log(product, "product");

  // const closeModal = () => {
  //   dispatch(setIsModal(false));
  // };

  return (
    <div className="">
      <Slider>
        <Image
          // width={}
          className="block h-[600px] relative w-[100%]"
          objectFit="cover"
          alt=""
          src={mainSliderImage}
          // layout="fill"
        ></Image>
        <Image
          className="block h-[600px] relative w-[100%]"
          objectFit="cover"
          alt=""
          src={mainSliderImage2}
        ></Image>
        <Image
          className="block h-[600px] relative w-[100%]"
          objectFit="cover"
          alt=""
          src={mainSliderImage3}
        ></Image>
        <Image
          className="block h-[600px] relative w-[100%]"
          objectFit="cover"
          alt=""
          src={mainSliderImage4}
        ></Image>
        <Image
          className="block h-[600px] relative w-[100%]"
          objectFit="cover"
          alt=""
          src={mainSliderImage5}
        ></Image>
      </Slider>
      <div className=" w-[1350px]">
        <ThumbnailList
          title={"MEN"}
          child={product.filter((el) => el.category.category_name === "men")}
          link={"/men"}
        ></ThumbnailList>
        <ThumbnailList
          title={"WOMEN"}
          child={product.filter((el) => el.category.category_name === "women")}
          link={"/women"}
        ></ThumbnailList>
        <ThumbnailList
          title={"LIFE"}
          child={product.filter((el) => el.category.category_name === "life")}
          link={"/life"}
        ></ThumbnailList>
        <ThumbnailList
          title={"BEAUTY"}
          child={product.filter((el) => el.category.category_name === "beauty")}
          link={"/beauty"}
        ></ThumbnailList>
        <ThumbnailList
          title={"NEW"}
          child={product.filter((el) => el.category.category_name === "women")}
          link={"/new"}
        ></ThumbnailList>
      </div>
    </div>
  );
};
export default Home;

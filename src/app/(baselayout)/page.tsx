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
import { setIsHeader } from "@/reducers/slices/HomeSlice";
import { result } from "lodash";
import { Post } from "@/model/Post";
import ShoppingHistoryModal from "../@ modal/shoppingHistory/page";
const arr = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
const Home = () => {
  // const [product, setProduct] = useState<Post[]>([]);
  // const isModal = useSelector((state) => state?.home.isModal);
  // useEffect(() => {
  //   try {
  //     const result = async () => {
  //       const response = await fetch(`http://localhost:8080/post/product`, {
  //         method: "get",
  //       });
  //       setProduct(await response.json());
  //     };
  //     result();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);
  // console.log(isModal);
  // return (
  //   <div className="">
  //     <Slider>
  //       <Image className="block h-[600px]" alt="" src={mainSliderImage}></Image>
  //       <Image
  //         className="block h-[600px]"
  //         alt=""
  //         src={mainSliderImage2}
  //       ></Image>
  //       <Image
  //         className="block h-[600px]"
  //         alt=""
  //         src={mainSliderImage3}
  //       ></Image>
  //       <Image
  //         className="block h-[600px]"
  //         alt=""
  //         src={mainSliderImage4}
  //       ></Image>
  //       <Image
  //         className="block h-[600px]"
  //         alt=""
  //         src={mainSliderImage5}
  //       ></Image>
  //     </Slider>
  //     <div className=" w-[1350px]">
  //       <ThumbnailList
  //         title={"MEN"}
  //         child={product.filter((el) => el.category === "men")}
  //         link={"/men"}
  //       ></ThumbnailList>
  //       <ThumbnailList
  //         title={"WOMEN"}
  //         child={product.filter((el) => el.category === "women")}
  //         link={"/women"}
  //       ></ThumbnailList>
  //       <ThumbnailList
  //         title={"LIFE"}
  //         child={product.filter((el) => el.category === "life")}
  //         link={"/life"}
  //       ></ThumbnailList>
  //       <ThumbnailList
  //         title={"BEAUTY"}
  //         child={product.filter((el) => el.category === "beauty")}
  //         link={"/beauty"}
  //       ></ThumbnailList>
  //       <ThumbnailList
  //         title={"NEW"}
  //         child={product.filter((el) => el.category === "women")}
  //         link={"/new"}
  //       ></ThumbnailList>
  //     </div>
  //     <div
  //       //   // ref={ref}
  //       id="scroll_menu"
  //       className={`   ${isModal ? "active2" : ""}  `}
  //     >
  //       <ScrollButton></ScrollButton>
  //       <ShoppingHistoryModal></ShoppingHistoryModal>
  //     </div>
  //   </div>
  // );
};
export default Home;

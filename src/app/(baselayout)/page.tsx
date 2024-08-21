import Image from "next/image";
import Slider from "./_components/slider";
import { useDispatch, useSelector } from "react-redux";
import mainSliderImage from "../../../public/pc04_1920x600_pre_20240104180145.jpg";
import mainSliderImage2 from "../../../public/pc07_1920x600_pre_20240104180315.jpg";
import mainSliderImage3 from "../../../public/pc08_1920x600_pre_20240104180340.jpg";
import mainSliderImage4 from "../../../public/pc10_1920x600_pre_20240104180425.jpg";
import mainSliderImage5 from "../../../public/pc11_1920x600_pre_20240104180452.jpg";
import { useEffect, useState } from "react";
import ThumbnailList from "./_components/thumbnailList";
import { useInView } from "react-intersection-observer";
import ScrollButton from "@/app/(baselayout)/_components/ScrollButton";
import Header from "../_component/header";
import { setIsHeader, setIsModal } from "@/reducers/slices/HomeSlice";
import { result } from "lodash";
import ShoppingHistoryModal from "../@ modal/shoppingHistory/page";
import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getProductsData } from "./_lib/getProductsData";
import { getUser, supabase } from "@/lib";

export const metadata: Metadata = {
  title: "홈 / W",
  description: "홈",
};

import { NextResponse, type NextRequest } from "next/server";

import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getHeartData } from "./_lib/getHeartData";

const Home = async (req: NextRequest) => {
  const res = NextResponse.next();

  const queryClient = new QueryClient();
  // // console.log(request, "request");
  const user = await getUser();
  // const res = NextResponse.next();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProductsData,
  });
  if (user) {
    await queryClient.prefetchQuery({
      queryKey: ["favorites", user?.id],
      queryFn: getHeartData,
    });
  }

  const dehydratedState = dehydrate(queryClient);
  return (
    <section className="">
      <Slider>
        <span className=" relative block h-[600px] w-100% ">
          <Image
            fill
            className=" object-cover"
            // className="object-cover h-[600px]"

            priority
            alt=""
            src={mainSliderImage}
          ></Image>
        </span>

        <span className=" relative block h-[600px] w-100% ">
          <Image
            fill
            className=" object-cover"
            alt=""
            src={mainSliderImage2}
          ></Image>
        </span>
        <span className=" relative block h-[600px] w-100% ">
          <Image
            fill
            className=" object-cover"
            alt=""
            src={mainSliderImage3}
          ></Image>
        </span>

        <span className=" relative block h-[600px] w-100% ">
          <Image
            fill
            className=" object-cover"
            alt=""
            src={mainSliderImage4}
          ></Image>
        </span>

        <span className=" relative block h-[600px] w-100% ">
          <Image
            fill
            className=" object-cover"
            alt=""
            src={mainSliderImage5}
            sizes="100vw"
          ></Image>
        </span>
      </Slider>
      <div className=" w-[1350px]">
        <HydrationBoundary state={dehydratedState}>
          <ThumbnailList
            title={"MEN"}
            categoryName={"men"}
            link={"/men"}
          ></ThumbnailList>
          <ThumbnailList
            title={"WOMEN"}
            categoryName={"women"}
            link={"/women"}
          ></ThumbnailList>
          <ThumbnailList
            title={"LIFE"}
            categoryName={"life"}
            link={"/life"}
          ></ThumbnailList>
          <ThumbnailList
            title={"BEAUTY"}
            categoryName={"beauty"}
            link={"/beauty"}
          ></ThumbnailList>
        </HydrationBoundary>
      </div>
    </section>
  );
};
export default Home;

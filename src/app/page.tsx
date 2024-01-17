// "use client";

import Image from "next/image";
import Slider from "../components/slider";
import Link from "next/link";
import mainSliderImage from "../../public/pc04_1920x600_pre_20240104180145.jpg";
import mainSliderImage2 from "../../public/pc07_1920x600_pre_20240104180315.jpg";
import mainSliderImage3 from "../../public/pc08_1920x600_pre_20240104180340.jpg";
import mainSliderImage4 from "../../public/pc10_1920x600_pre_20240104180425.jpg";
import mainSliderImage5 from "../../public/pc11_1920x600_pre_20240104180452.jpg";
import { useEffect, useState } from "react";
import ThumbnailList from "../components/thumbnailList";

const arr = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
export default function Home() {
  return (
    <div className="">
      <Slider>
        <div>
          <Image alt="" src={mainSliderImage}></Image>
        </div>
        <div>
          <Image alt="" src={mainSliderImage2}></Image>
        </div>
        <div>
          <Image alt="" src={mainSliderImage3}></Image>
        </div>
        <div>
          <Image alt="" src={mainSliderImage4}></Image>
        </div>
        <div>
          <Image alt="" src={mainSliderImage5}></Image>
        </div>
      </Slider>
      <div className=" flex flex-col">
        <div className="mt-[120px]">
          <ThumbnailList
            title={"MEN"}
            child={arr}
            link={"/men"}
          ></ThumbnailList>
        </div>
        <div className="mt-[120px]">
          <ThumbnailList
            title={"WOMEN"}
            child={arr}
            link={"/men"}
          ></ThumbnailList>
        </div>
        <div className="mt-[120px]">
          <ThumbnailList
            title={"LIFE"}
            child={arr}
            link={"/men"}
          ></ThumbnailList>
        </div>
        <div className="mt-[120px]">
          <ThumbnailList
            title={"BEAUTY"}
            child={arr}
            link={"/men"}
          ></ThumbnailList>
        </div>
        <div className="mt-[120px]">
          <ThumbnailList
            title={"NEW"}
            child={arr}
            link={"/men"}
          ></ThumbnailList>
        </div>
      </div>
    </div>
  );
}

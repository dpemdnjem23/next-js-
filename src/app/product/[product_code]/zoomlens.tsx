"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import zoomImage from "../../../../public/zoom.png";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

function ZoomLens() {
  const [lensPosition, setLensPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 220,
  });
  const boundary = { xMin: 170, xMax: 350, yMin: 190, yMax: 500 };
  const cursorRef = useRef();
  const [showLens, setShowLens] = useState(false);
  const imageRef: any = useRef();
  const lensRef: any = useRef();
  const selectedImage = useSelector(
    (state: { product: string }) => state?.product.image
  );

  const [bgPosition, setbgPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const onMouseEnter = () => {
    //들어갈때 left와 top을 조정한다.

    //innerWidth 1px당 left0.5

    if (innerWidth > 1255) {
      setPosition({ x: (innerWidth - 1255) * 0.5, y: 220 });
    } else if (innerWidth <= 1255) {
      setPosition({ x: 0, y: 220 });
    }

    //innerwidth가 1250이상인 경우
    setShowLens(true);
  };
  const onMouseLeave = () => {
    setShowLens(false);
  };

  const onMouseMove = debounce((e) => {
    //imageframe getbounding해야함 실수 ->e.traget을한것
    const { left, top } = imageRef.current.getBoundingClientRect();
    const { width, height } = lensRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const coord = { x: x - 170, y: y - 190 };

    let cx = lensRef?.current.offsetWidth / cursorRef?.current.offsetWidth;
    let cy = lensRef?.current.offsetHeight / cursorRef?.current.offsetHeight;

    switch (true) {
      case x <= boundary.xMin && y <= boundary.yMin:
        setLensPosition({ x: 0, y: 0 });
        setbgPosition({
          x: 0,
          y: 0,
        });

        break;

      case x > boundary.xMin && x < boundary.xMax && y <= boundary.yMin:
        setLensPosition({ x: coord.x, y: 0 });

        setbgPosition({
          x: -(x - cursorRef?.current.offsetWidth / 2) * cx,
          y: 0,
        });

        break;

      case x >= boundary.xMax && y <= boundary.yMin:
        setLensPosition({ x: 180, y: 0 });
        setbgPosition({
          x: -332,
          y: 0,
        });

        break;

      case x <= boundary.xMin && y > boundary.yMin && y < boundary.yMax:
        setLensPosition({ x: 0, y: coord.y });
        setbgPosition({
          x: 0,
          y: -(y - cursorRef?.current.offsetHeight / 2) * cy,
        });

        break;

      case x <= boundary.xMin && y >= boundary.yMax:
        setLensPosition({ x: 0, y: 315 });

        break;

      case x > boundary.xMin && x < boundary.xMax && y >= boundary.yMax:
        setLensPosition({ x: coord.x, y: 315 });

        setbgPosition({
          x: -(x - cursorRef?.current.offsetWidth / 2) * cx,
          y: -565,
        });

        break;

      case x >= boundary.xMax && y >= boundary.yMax:
        setLensPosition({ x: 180, y: 315 });
        setbgPosition({
          x: -332,
          y: -565,
        });

        break;

      case x >= boundary.xMax && y > boundary.yMin && y < boundary.yMax:
        console.log(4);
        setLensPosition({ x: 180, y: coord.y });
        setbgPosition({
          x: -332,
          y: -(y - cursorRef?.current.offsetHeight / 2) * cy,
        });

        break;

      default:
        setLensPosition({ x: coord.x, y: coord.y });

        setbgPosition({
          x: -(x - cursorRef?.current.offsetWidth / 2) * cx,
          y: -(y - cursorRef?.current.offsetHeight / 2) * cy,
        });
    }
    // setLensPosition({ x, y });
  });

  // 마우스를 이용하여 렌즈 위치를 설정하는 함수

  return (
    <div
      ref={imageRef}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      style={{
        left: position.x,
        top: position.y,
      }}
      className={`zoom-container translate-z-0 h-[700px] w-[525px] absolute z-[11]
     `}
    >
      {/* {showLens && ( */}
      <Image
        ref={cursorRef}
        style={{
          zoom: 1,
          left: `${lensPosition.x}px`,
          top: `${lensPosition.y}px`,
        }}
        width={340}
        height={380}
        className={` translate-z-0 ${showLens ? "block" : "hidden"}
 float-right overflow-hidden cursor-pointer absolute vg-[white]`}
        src={zoomImage}
        alt="Original"
      />
      {/* )} */}
      <div className="zoomWindow w-[630px]">
        <div
          style={{
            background: `url(${selectedImage}) ${bgPosition.x}px ${bgPosition.y}px / 960px 1280px  no-repeat`,
            // backgroundPosition: `${bgPosition.x}px ${bgPosition.y}px`,
            // backgroundSize: "960px 1280px",
          }}
          ref={lensRef}
          className={` ${showLens ? "block" : "hidden"}
         w-[630px] h-[700px]
          z-[100] border-[#888888] border-[0] absolute top-0 left-[565px]
          overflow-hidden text-center bg-[white] float-left `}
        ></div>
      </div>
    </div>
  );
}

export default ZoomLens;

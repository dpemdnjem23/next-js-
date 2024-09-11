"use client";
import closeImage from "../../../../../public/layer_close_23.png";
import { useEffect, useRef, useState } from "react";
import downArrow from "../../../../../public/down-arrow.png";
import Image from "next/image";
import { cities, provinces } from "@/lib/cities";
import { useDispatch, useSelector } from "react-redux";
import {
  setCity,
  setDistrict,
  setIsClicked,
  setPostModal,
  setRoadName,
  setStreetNumber,
} from "@/reducers/slices/OrderSlice";
import AddressTable from "../_component/addressTable";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import FullScreenLoading from "@/app/_component/fullScreenLoading";
import axios from "axios";
import { setIsLoading } from "@/reducers/slices/UserSlice";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
const auth = process.env.NEXT_PUBLIC_AUTH_POST;
export default function PostModal() {
  const [isActive, setIsActive] = useState<boolean>(true);
  //시 , 시군구
  const optionRef = useRef<HTMLDivElement>(null);
  const optionRef2 = useRef<HTMLDivElement>(null);
  const [errorState, setErrorState] = useState<{ 0: boolean; 1: boolean }>({
    0: false,
    1: false,
  });
  const router = useRouter();

  const params = useParams();
  // const isClicked = useSelector((state) => state.order.isClicked);
  const pageNum = useSelector((state) => state?.order?.pageNum);
  //
  const [isClicked, setIsClicked] = useState<{ 0: boolean; 1: boolean }>({
    0: false,
    1: false,
  });

  const [selectState, setSelectState] = useState<{ 0: boolean; 1: boolean }>({
    0: false,
    1: false,
  });
  const queryClient = useQueryClient();

  const streetNumber = useSelector((state) => state?.order?.streetNumber);
  const roadName = useSelector((state) => state?.order?.roadName);

  const city = useSelector((state) => state?.order?.city);
  const district = useSelector((state) => state?.order?.district);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.order.isLoading);

  //2순위
  const handlesShowOption = (idx: number) => {
    const newState = { ...selectState, [idx]: !selectState[idx] };

    //idx를 클릭할경우 true가된다. 다시클릭할경우 false로되고 다시true로 바뀜
    //열려있으면,
    //
    //idx가 false인경우 => true
    //idx가 trued

    if (idx === 0 && selectState[0] === false) {
      newState[1] = !newState[0];
    } else if (idx === 1 && selectState[1] === false) {
      // newState[0] = false
      newState[0] = !newState[1];
    }

    setSelectState(newState);
  };

  //1순위
  useEffect(() => {
    const newState = { 0: false, 1: false };

    const clickOutside = (e) => {
      if (selectState[0] && !optionRef?.current?.contains(e.target)) {
        setSelectState(newState);
      } else if (selectState[1] && !optionRef2?.current?.contains(e.target)) {
        setSelectState(newState);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [selectState]);

  const handleClickOption = (el: string, idx: number) => {
    const newState = { 0: false, 1: false };

    if (idx === 0) {
      dispatch(setCity(el));
    } else if (idx === 1) {
      dispatch(setDistrict(el));
    }

    setSelectState(newState);
  };

  const fetchData = async () => {
    const combineString = city + " " + district + " " + roadName;

    const param = {
      confmKey: auth,
      currentPage: pageNum,
      countPerPage: 10,
      // firstSort: "no",

      keyword: combineString,
      resultType: "json",
    };

    const roadResponse = await axios.get(
      `https://business.juso.go.kr/addrlink/addrLinkApiJsonp.do`,
      { params: param }
    );

    const trimmedString = roadResponse?.data?.replace(/^\((.*)\)$/, "$1");
    const count = JSON.parse(trimmedString).results.common.totalCount;
    const data = JSON.parse(trimmedString).results.juso;

    return [Number(count), data];
  };
  const fetchData2 = async () => {
    const param = {
      confmKey: auth,
      currentPage: pageNum,
      countPerPage: 10,
      // firstSort: "no",

      keyword: "910-16",
      resultType: "json",
    };

    const roadResponse = await axios.get(
      `https://business.juso.go.kr/addrlink/addrLinkApiJsonp.do`,
      { params: param }
    );

    const trimmedString = roadResponse?.data?.replace(/^\((.*)\)$/, "$1");
    const count = JSON.parse(trimmedString).results.common.totalCount;
    const data = JSON.parse(trimmedString).results.juso;

    return [Number(count), data];
  };

  const {
    data: addressData,
    error,

    isSuccess,
    isRefetching,
    isError,
    isFetched,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["addressData", pageNum],
    queryFn: fetchData2,
    // staleTime: 0,
    // gcTime: 0,
    enabled: isClicked["1"],
  });

  // if (!isLoading && isSuccess && addressData && addressData?.length > 0) {
  //   return <div>데이터가 없습니다.</div>;
  // }

  if (isError) {
    throw error;
  }
  //만약 0개인경우 찾을수 없다고 나와야된다.

  if (isLoading) {
    dispatch(setIsLoading(true));
  }
  if (isSuccess) {
    dispatch(setIsLoading(false));

    // dispatch(setIsClicked(false));
  }

  const {
    data: roadData,
    error: roadError,

    isSuccess: roadSuccess,
    isError: isRoadError,
    isLoading: roadLoading,
  }: {
    data: any;
    error: any;
    isSuccess: any;
    isError: any;
    isLoading: any;
  } = useQuery({
    queryKey: ["roadData", pageNum],
    queryFn: fetchData,
    staleTime: 0,
    gcTime: 0,
    enabled: isClicked["0"],
  });

  if (isRoadError) {
    throw roadError;
  }

  if (roadLoading) {
    dispatch(setIsLoading(true));
  }
  if (roadSuccess) {
    dispatch(setIsLoading(false));
  }
  const handleRoadClick = async () => {
    if (city === "시/도") {
      alert("검색할 주소의 시/도를 입력하세요");
      return;
    } else if (district === "시/군/구") {
      alert("검색할 주소를 입력해주세요");
      return;
    }

    const newState = { ...isClicked, 0: true };

    setIsClicked(newState);
    queryClient.invalidateQueries();
  };

  const handleStreetClick = async () => {
    const newState = { ...isClicked, 1: true };

    setIsClicked(newState);
    queryClient.invalidateQueries();

    // await refetch();
  };

  const handleXClick = () => {
    
    
    router.back()
  };
  //검색 버튼을 눌럿을때 주소가 입력되어야한다.

  return (
    <div className="block">
      <div
        className=" 
      mt-[-380px] ml-[-320px]
    border-[#000] border-[1px] bg-[#fff]
    fixed top-[50%] left-[50%] min-w-[480px] overflow-hidden px-[40px] pt-[40px]  pb-[60px] 
    w-[640px] h-[760px] z-[60] max-h-[760px]"
      >
        <h2 className="text-[#333] font-medium text-[24px] mb-[24px]">
          우편번호 찾기
        </h2>

        <ul className="table table-fixed  w-[100%] text-center ">
          <li
            onClick={() => setIsActive(true)}
            className={`${
              isActive ? "border-[#333] " : "border-[#b5b5b5]"
            } table-cell border-[1px]  align-top 
            
            
              `}
          >
            <button
              className={`
            
            ${isActive ? "bg-[#333] text-[#fff]" : " text-[#666]"} 
            font-medium h-[40px] text-[14px] pt-0 relative w-[100%]  uppercase`}
            >
              도로명으로 찾기
            </button>
          </li>
          <li
            onClick={() => setIsActive(false)}
            className={`${
              isActive ? "border-[#b5b5b5]  " : "border-[#333] "
            } table-cell border-[1px] align-top`}
          >
            <button
              className={`
            
            ${isActive ? "text-[#666]" : "  bg-[#333] text-[#fff] "} 
            font-medium h-[40px] text-[14px] pt-0 relative w-[100%] uppercase`}
            >
              지번으로 찾기
            </button>
          </li>
        </ul>
        {/* 도로명 찾기 */}
        {isActive ? (
          <div>
            <p className=" font-sans text-[14px] text-#000] leading-[24px] py-[15px]">
              찾고 싶으신 도로명 + 건물번호 또는 건물명을 입력해 주세요.
              <br></br>
              <span className="text-[#959595]">
                예) 반포대로 1, 세종대로 23, 수지로 11
              </span>
            </p>
            <form className=" font-sans">
              <div className="h-[140px] bg-[#fff] border-[1px] border-[#f4f4f4] p-[19px] font-normal">
                <div className=" h-[40px] mb-[20px]">
                  <div ref={optionRef} className="w-[50%] pr-[9px] float-left">
                    <div className="w-[100%] outline-none relative">
                      {/* selectoption */}
                      <div
                        onClick={() => handlesShowOption(0)}
                        className={`
                      ${
                        selectState[0] === true
                          ? "bg-[#fff] border-[#000]"
                          : "border-[#f2f2f2]"
                      }

                      w-[100%] h-[40px] bg-[#f2f2f2]  border-[1px] leading-[38px] text-[#010101] 
                    text-[14px] font-normal indent-5 block relative`}
                      >
                        <span className="block h-[38px] overflow-hidden whitespace-nowrap text-ellipsis pr-[25.5px]">
                          {city}
                          <Image
                            width={20}
                            height={20}
                            className="absolute top-[10px] right-[20px] block leading-[38px] indent-5"
                            alt=""
                            src={downArrow}
                          ></Image>
                        </span>
                      </div>
                      {selectState[0] === true ? (
                        <ul
                          className=" visible w-[100%] top-[39px] left-[0px] h-[320px]
                  font-sans overflow-y-auto
                    absolute border-[#000] border-[1px] z-10 bg-[#fff]"
                        >
                          {cities?.map((el, index) => {
                            return (
                              <li
                                onClick={() => handleClickOption(el, 0)}
                                key={index}
                              >
                                <a
                                  className=" outline-none block leading-10 text-[#000] text-[14px] font-sans px-[19px]
 text-ellipsis whitespace-nowrap overflow-hidden hover:bg-[#e6e6e6] cursor-pointer

                          "
                                >
                                  {el}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div ref={optionRef2} className="w-[50%] pr-[9px] float-left">
                    <div className="w-[100%] outline-none relative">
                      {/* selectoption */}

                      <div
                        onClick={() => handlesShowOption(1)}
                        className={`
                      ${
                        selectState[1] === true
                          ? "bg-[#fff] !border-[#000]"
                          : ""
                      }

                      w-[100%] h-[40px] bg-[#f2f2f2] border-[#f2f2f2] border-[1px] leading-[38px] text-[#010101] 
                    text-[14px] font-normal indent-5 block relative`}
                      >
                        <span className="block h-[38px] overflow-hidden whitespace-nowrap text-ellipsis pr-[25.5px]">
                          {district}
                          <Image
                            width={20}
                            height={20}
                            className="absolute top-[10px] right-[20px] block leading-[38px] indent-5"
                            alt=""
                            src={downArrow}
                          ></Image>
                        </span>
                      </div>

                      {selectState[1] === true ? (
                        <ul
                          className=" visible w-[100%] top-[39px] left-[0px] h-[320px]
                  font-sans overflow-y-auto
                    absolute border-[#000] border-[1px] z-10 bg-[#fff]"
                        >
                          {provinces[city]?.map((el, index) => {
                            return (
                              <li
                                onClick={() => handleClickOption(el, 1)}
                                key={index}
                              >
                                <a
                                  className=" outline-none block leading-10 text-[#000] text-[14px] font-sans px-[19px]
 text-ellipsis whitespace-nowrap overflow-hidden  hover:bg-[#e6e6e6] cursor-pointer

                          "
                                >
                                  {el}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                {/* 여기서 부터 조회 */}
                <div className=" relative pr-[105px]">
                  <input
                    value={roadName}
                    onChange={(e) => dispatch(setRoadName(e.target.value))}
                    className="                  focus:bg-[#fff] focus:border-[#000]

                pl-[20px] bg-[#f2f2f2] border-[#f2f2f2] border-[1px] text-[14px] font-normal outline-none
                block w-[100%] h-[40px] leading-10 align-top float-left"
                  ></input>
                  {/* 버튼을 누르면 주소목록 나온다 */}
                  <button
                    onClick={handleRoadClick}
                    className="
                bg-[#000] text-[#fff]
                block absolute top-0 right-0 float-right min-w-[92px] h-[40px] leading-[40px] p-0 border-none"
                    type="button"
                  >
                    조회
                  </button>
                </div>
              </div>
            </form>
            {roadData ? (
              roadData?.[1].length > 0 ? (
                <AddressTable
                  number={"0"}
                  pageData={"roadData"}
                  addressData={roadData}
                ></AddressTable>
              ) : (
                <p className="h-[436px] table w-[100%]">
                  <em
                    className=" 

    font-medium font-sans not-italic text-[#ff6160] align-middle table-cell text-center pl-[27px]"
                  >
                    <div
                      style={{
                        background: `url("https://i.ibb.co/f1RTfkh/spr-bag.png") -300px -50px no-repeat`,
                      }}
                      className=" relative text-[22px] top-[3px] not-italic inline-block w-[20px] h-[20px] mr-[7px]"
                    ></div>
                    검색결과가 없습니다
                  </em>
                </p>
              )
            ) : (
              ""
            )}
          </div>
        ) : (
          // 지번으로찾기
          <div>
            <p className=" font-sans text-[14px] text-#000] leading-[24px] py-[15px]">
              찾고 싶으신 주소의 동/읍/면/리 또는 동/읍/면/리 + 번지를 입력해
              주세요.
              <br></br>
              <span className="text-[#959595]">예) 역삼동, 역삼동 823</span>
            </p>
            <form className=" font-sans">
              {/* 여기서 부터 조회 */}
              <div
                className="
              after:clear-both after:block
              h-[140px] bg-[#fff] border-[1px] border-[#f4f4f4] p-[19px] font-normal"
              >
                <input
                  value={streetNumber}
                  onChange={(e) => dispatch(setStreetNumber(e.target.value))}
                  className="
                  focus:bg-[#fff] focus:border-[#000]
              pl-[20px] bg-[#f2f2f2] border-[#f2f2f2] border-[1px] text-[14px] font-normal outline-none
              block w-[412px] h-[40px] leading-10 align-top float-left"
                ></input>
                <button
                  onClick={handleStreetClick}
                  className="
              bg-[#000] text-[#fff]
              block float-right min-w-[92px] h-[40px] leading-[40px] p-0 border-none"
                  type="button"
                >
                  조회
                </button>
              </div>
            </form>
            {addressData ? (
              addressData?.[1].length > 0 ? (
                <AddressTable
                  number={"1"}
                  pageData={"addressData"}
                  addressData={addressData}
                ></AddressTable>
              ) : (
                <p className="h-[436px] table w-[100%]">
                  <em
                    className=" 
          non-italic
              font-medium font-sans text-[#ff6160] align-middle table-cell text-center pl-[27px]"
                  >
                    <div
                      style={{
                        background: `url("https://i.ibb.co/f1RTfkh/spr-bag.png") -300px -50px no-repeat`,
                      }}
                      className=" absolute top-[2px] inline-block w-[20px] h-[20px] mr-[7px]"
                    ></div>
                    겸색결과가 없습니다
                  </em>
                </p>
              )
            ) : (
              ""
            )}
          </div>
        )}

        <button 
        
        onClick={handleXClick}
          className=" overflow-hidden absolute top-[25px] right-[25px] w-[53px] h-[53px] p-[15px] leading-[99em] align-top">
          <Image
            alt=""
            width={23}
            height={23}
            className="block"
            src={closeImage}
          ></Image>
        </button>
      </div>
      <span className=" fixed top-0 left-0 right-0 bottom-0 z-50 bg-[#0e0e0e] opacity-40 block"></span>
    </div>
  );
}

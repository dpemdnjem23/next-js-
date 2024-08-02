import Image from "next/image";
import LoadingSpinner from "../../../public/loadingSpinner.gif";

export default function Loading() {
  return (
    <div className=" fixed top-0 left-0 right-0 bottom-0 z-[99] bg-[#0e0e0e] opacity-40">
      <div className="h-[100vh] flex justify-center items-center">
        <Image width={100} height={100} alt="" src={LoadingSpinner}></Image>
      </div>
    </div>
  );
}

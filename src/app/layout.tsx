import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

import ScrollButton from "@/app/(baselayout)/components/ScrollButton";
import loginImage from "../../public/ico_login.svg";
import cartImage from "../../public/ico_bag.svg";
import joinImage from "../../public/ico_join.svg";
import logoImage from "../../public/ico_gnb_logo_176.svg";
import Image from "next/image";
// import { useState } from "react";
import Category from "./(baselayout)/components/category";
import Header from "@/app/_component/header";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import ShoppingHistoryModal from "./@ modal/shoppingHistory/page";

const ReduxProvider = dynamic(() => import("@/reducers"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });
//페이지밖, 페이지에서 공유하고싶은것들을 작성한다.
export const metadata: Metadata = {
  title: "w.Concept",
  description: "Generated by create next app",
};
// 헤더,검색창 띄우기
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const isModal = useSelector((state) => state?.home.isModal);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Header></Header>
          <ScrollButton></ScrollButton>
          <ShoppingHistoryModal></ShoppingHistoryModal>

          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}

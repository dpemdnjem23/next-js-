import Checkout from "./_component/button";
import ZoomLens from "./zoomlens";
import ProductDetail from "./productDetail";

import Modals from "./modals";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getProductData } from "./_lib/getProductData";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default async function Page({
  params,
}: {
  params: { product_code: string };
}) {
  //haert를 클릭햇을때 집어넣거나빼고, heart를 불러와서 heart를찍은 사람 수 만큼넣어주기
  //heart는 product번호랑 매칭시켜야한다.

  const queryClient = new QueryClient();

  const { product_code } = params;

  await queryClient.prefetchQuery({
    queryKey: ["product", product_code],
    queryFn: getProductData,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <section className=" block">
      <HydrationBoundary state={dehydratedState}>
        <Modals></Modals>
        <ProductDetail></ProductDetail>
        {/* <Checkout></Checkout> */}
        <ZoomLens></ZoomLens>
      </HydrationBoundary>

      {/* <Loading></Loading> */}
      {/* <LoadingComponent></LoadingComponent> */}
    </section>
  );
}

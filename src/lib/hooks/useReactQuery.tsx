"use client";

import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function ReactQueryProviders({
  children,
}: React.PropsWithChildren) {
  //staleTime 이 infinity -> fresh 상태 fresh상태라는건
  //한번 불러온 데이터를 캐싱 해놓고 불러옴
  // 해당 개념들을 살펴보다 보니, staleTime을 cacheTime보다 길게 설정하는 것은 비합리ㅓㄱ
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            // 캐시를 지속하는 시간 설정 (1시간)
            staleTime: Infinity,
          
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
/** app/layout.tsx */

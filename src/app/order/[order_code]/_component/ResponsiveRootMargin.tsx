"use client";

import { useEffect, useState } from "react";

export default function ResponsiveRootMargin({ children }: React.ReactNode) {
  const [rootMargin, setRootMargin] = useState("0px");

  const handleResize = () => {
    // viewport의 너비를 가져옵니다.
    const viewportHeight = window.innerHeight;
    // rootMargin 값을 동적으로 설정합니다.

    if (viewportHeight <= 396) {
      const newRootMargin = `0px 0px 20px 0px`;
      setRootMargin(newRootMargin);
      return;
    }
    const newRootMargin = `0px 0px ${-viewportHeight * 0.57}px 0px`; // 예: 너비의 10%

    setRootMargin(newRootMargin);
  };
  useEffect(() => {
    handleResize();

    // 컴포넌트가 언마운트될 때 resize 이벤트 핸들러를 제거합니다.

    // resize 이벤트를 수신하여 viewport의 크기가 변경될 때마다 rootMargin을 조정합니다.
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setRootMargin]);

  return (
    <section>
      {/* 여기에 필요한 컴포넌트 내용 또는 자식을 넣습니다 */}
      {children}
    </section>
  );
}

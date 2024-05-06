import { useState, useEffect } from "react";

const useIntersectionObserver = (targetRef, options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
      } else {
        setIsIntersecting(false);
      }
    }, options);

    const target = targetRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {

        observer.unobserve(target);
      }
    };
  }, [targetRef, options]);

  return isIntersecting;
};

export default useIntersectionObserver;

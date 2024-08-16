import { useDispatch } from "react-redux";
import LoginPage from "./loginPage";
import { setPageRouterLoading } from "@/reducers/slices/CartSlice";
import { useEffect } from "react";

export default function Page() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setPageRouterLoading(false));
  // }, []);

  return <LoginPage></LoginPage>;
}

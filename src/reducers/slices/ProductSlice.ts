"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type props = {
  id: number | null;
  created_at: TimeRanges | null;
  brand: any;
  front: string;
  front_multiline: string;
  price: number | null;
  discount: number | null;
  option: option | null | [];
  general_info: generals | null;
  category_id: number | null;
  imageArr: string[] | null;
  product_code: number | null;
  thumbnail: string;

  country: string;
  company: string;
};
type sizes = {
  size: string[];
};

type generals = {
  label: string[];
};

type option = {
  size: string[];
  color: string[] | null;
};

type Home = {
  image: string;
  cardInfoModal: boolean;
  pointsInfoModal: boolean;
  product: props;
  cartCheckModal: boolean;
  selectOption: [];
};
const initialState: Home = {
  image: "",
  selectOption: [],
  cartCheckModal: false,

  cardInfoModal: false,
  pointsInfoModal: false,
  product: {
    id: null,
    created_at: null,
    brand: null,
    front: "",
    front_multiline: "",
    price: 0,
    discount: null,
    option: [],
    general_info: null,
    category_id: null,
    imageArr: [],
    product_code: null,
    thumbnail: "",
    country: "",
    company: "",
  },
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setIsImage(state, action: PayloadAction<string>) {
      state.image = action.payload;
    },
    setCardInfoModal(state, action: PayloadAction<boolean>) {
      state.cardInfoModal = action.payload;
    },
    setPointsInfoModal(state, action: PayloadAction<boolean>) {
      state.pointsInfoModal = action.payload;
    },
    setProduct(state, action: PayloadAction<props>) {
      state.product = action.payload;
    },
    setCartCheckModal(state, action: PayloadAction<boolean>) {
      state.cartCheckModal = action.payload;
    },
    setSelectOption(state, action: PayloadAction<[]>) {
      state.selectOption = action.payload;
    },
  },
});

export const {
  setIsImage,
  setCardInfoModal,
  setPointsInfoModal,
  setProduct,
  setSelectOption,
  setCartCheckModal,
} = ProductSlice.actions;
// export const selectCount = (state) => state.counter.value;
export default ProductSlice.reducer;

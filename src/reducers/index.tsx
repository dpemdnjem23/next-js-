"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./slices/UserSlice";

// const rootElement = document.getElementById('root');
type props = {
  children: React.ReactNode;
};

export default function ReduxProvider({ children }: props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

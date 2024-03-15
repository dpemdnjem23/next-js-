"use client";
import { Provider } from "react-redux";
import { store } from "./store";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
// const rootElement = document.getElementById('root');
type props = {
  children: React.ReactNode;
};

// const persistor = persistStore(store);

export default function ReduxProvider({ children }: props) {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
}

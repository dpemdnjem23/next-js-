`use client`;

import { Provider } from "react-redux";
import { store } from "./store";

// const rootElement = document.getElementById('root');
type props = {
  children: React.ReactNode;
};

export default function ReduxProvider({ children }: props) {
  return <Provider store={store}> {children}</Provider>;
}
// ReactDOM.render(
//   <Provider store={store}>
//   <App />
//   </Provider>,
// rootElement
// );

import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import "antd/dist/antd.min.css";
import { Provider } from "react-redux";
import { store } from "./components/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    {/* </React.StrictMode> */}
  </Provider>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import "./style/app.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import liveOrdersReducer from "./features/liveOrdersComp2";
import orderBookReducer from "./features/orderBookComp1";
import liveTradesReducer from "./features/liveTradesComp3";

const store = configureStore({
  reducer: {
    liveOrders: liveOrdersReducer,
    orderBook: orderBookReducer,
    liveTrades: liveTradesReducer,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

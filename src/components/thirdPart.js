import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import uniqid from "uniqid";
import { getTradesData } from "../features/liveTradesComp3";
import "../style/app.css";

const ThirdPart = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.liveTrades.value);

  let stateObj = orders;
  let state = [];
  for (let props in stateObj) {
    state = [stateObj[props], ...state];
  }

  //clean up lest memory leaks
  useEffect(() => {
    const ws = new WebSocket("wss://ws.bitstamp.net");
    ws.onopen = (event) => {
      const apiCall = {
        event: "bts:subscribe",
        data: { channel: "live_trades_btcusd" },
      };
      ws.send(JSON.stringify(apiCall));
    };
    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        if ((json.event = "data")) {
          dispatch(getTradesData(json.data));
        }
      } catch (err) {
        console.log(err);
      }
    };
    //clean up function
    return () => ws.close();
  }, []);
  //map type with dynamic colors
  const mapType = state.map((item) => {
    if (item.type === 0) {
      return (
        <p key={uniqid()} className="green">
          BUY(BTC)
        </p>
      );
    } else if (item.type === 1) {
      return (
        <p key={uniqid()} className="red">
          SELL(BTC)
        </p>
      );
    }
  });

  const mapPrices = state.map((item) => {
    return (
      <p key={uniqid()} className="white">
        {item.price}
      </p>
    );
  });

  const mapAmount = state.map((item) => {
    return (
      <p key={uniqid()} className="white">
        {item.amount}
      </p>
    );
  });

  let mapDate = state.map((item) => {
    //this if statement solves the problem with getting a first NaN on the screen
    if (item.timestamp !== undefined) {
      let date = item.timestamp;
      let dateArr = Array.from(String(date), Number);
      dateArr.splice(2, 0, ":");
      dateArr.splice(5, 0, ":");
      dateArr.splice(-4);
      let lastArr = dateArr.join("");
      return (
        <p key={uniqid()} className="white">
          {lastArr}{" "}
        </p>
      );
    }
  });

  return (
    <div>
      <div className="flexing">
        <h4 style={{ color: "grey" }}>Tür</h4>
        <h4 style={{ color: "grey" }}>Fiyat</h4>
        <h4 style={{ color: "grey" }}>Miktar</h4>
        <h4 style={{ color: "grey" }}>Saat</h4>
      </div>
      <div className="flexing scrollable">
        <div>{mapType}</div>
        <div>{mapPrices}</div>
        <div>{mapAmount}</div>
        <div>{mapDate}</div>
      </div>
    </div>
  );
};

export default ThirdPart;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import uniqid from "uniqid";
import { getData } from "../features/liveOrdersComp2";
import "../style/app.css";

const SecondPart = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.liveOrders.value);

  //clean up lest memory leaks
  useEffect(() => {
    const ws = new WebSocket("wss://ws.bitstamp.net");
    ws.onopen = (event) => {
      const apiCall = {
        event: "bts:subscribe",
        data: { channel: "live_orders_btcusd" },
      };
      ws.send(JSON.stringify(apiCall));
    };
    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        if ((json.event = "data")) {
          dispatch(getData(json.data));
        }
      } catch (err) {
        console.log(err);
      }
    };
    //clean up function
    return () => ws.close();
  }, []);

  //map prices with dynamic colors
  const mapPrices = orders.map((item) => {
    if (item.order_type === 0) {
      return (
        <p key={uniqid()} className="green">
          {item.price}
        </p>
      );
    } else if (item.order_type === 1) {
      return (
        <p key={uniqid()} className="red">
          {item.price}
        </p>
      );
    }
  });

  const mapAmount = orders.map((item) => {
    return (
      <p key={uniqid()} className="white">
        {item.amount}
      </p>
    );
  });

  const mapDate = orders.map((item) => {
    let date = item.datetime;
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
  });

  return (
    <div>
      <h3>Piyasa Alım Satımları</h3>
      <div className="flexing">
        <h4 style={{ color: "grey" }}>Fiyat(USDT)</h4>
        <h4 style={{ color: "grey" }}>Miktar(BTC)</h4>
        <h4 style={{ color: "grey" }}>Saat</h4>
      </div>
      <div className="flexing">
        <div>{mapPrices}</div>
        <div>{mapAmount}</div>
        <div>{mapDate}</div>
      </div>
    </div>
  );
};

export default SecondPart;

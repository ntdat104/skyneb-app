import React from "react";
import { useDispatch, useSelector } from "react-redux";
import uniqid from "uniqid";
import { getOrderBookData } from "../features/orderBookComp1";
import "../style/app.css";

function FirstPart() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderBook.value);
  let askObj = orders.asks;
  let asks = [];
  for (let props in askObj) {
    asks = [askObj[props], ...asks.slice(0, 15)];
  }
  let bidObj = orders.bids;
  let bids = [];
  for (let bidProps in bidObj) {
    bids = [bidObj[bidProps], ...bids.slice(0, 15)];
  }

  const apiCall = {
    event: "bts:subscribe",
    data: { channel: "order_book_btcusd" },
  };

  React.useEffect(() => {
    const ws = new WebSocket("wss://ws.bitstamp.net");
    ws.onopen = (event) => {
      ws.send(JSON.stringify(apiCall));
    };

    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        if ((json.event = "data")) {
          dispatch(getOrderBookData(json.data));
        }
      } catch (err) {
        console.log(err);
      }
    };
    //clean up function
    return () => ws.close();
  }, []);

  //   //map the first 15 bids
  const firstBids = bids.map((item) => {
    return (
      <div className="flexing" key={uniqid()}>
        <p className="green"> {item[0]}</p>
        <p className="white"> {item[1]}</p>
        <p className="white"> {(item[0] * item[1]).toFixed(4)}</p>
      </div>
    );
  });
  //map the first 15 asks

  const firstAsks = asks.map((item) => {
    return (
      <div className="flexing" key={uniqid()}>
        <p className="red"> {item[0]}</p>
        <p className="white"> {item[1]}</p>
        <p className="white"> {(item[0] * item[1]).toFixed(4)}</p>
      </div>
    );
  });

  return (
    <div style={{ height: "500px" }}>
      <div>
        <h1 className="white">Asks</h1>
        <div className="flexing">
          <h4 style={{ color: "grey" }}>Fiyat(USDT)</h4>
          <h4 style={{ color: "grey" }}>Miktar(BTC)</h4>
          <h4 style={{ color: "grey" }}>Toplam</h4>
        </div>
        {firstAsks}
      </div>
      <div>
        <h1 className="white">Bids</h1>
        {firstBids}
      </div>
    </div>
  );
}

export default FirstPart;

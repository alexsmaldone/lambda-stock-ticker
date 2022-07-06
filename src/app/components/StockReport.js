import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStockData } from "../store/stockSlice";
import "./StockReport.css";
import StockTable from "./StockTable";

function StockReport() {
  const dispatch = useDispatch();
  const stockDataState = useSelector((state) => state?.stock?.stockData?.body);
  const api_status = useSelector((state) => state?.stock?.stockData?.status);

  const [ticker, setTicker] = useState("");
  const [stockData, setStockData] = useState(stockDataState);

  const searchStocks = () => {
    if (ticker.length > 0) {
      dispatch(getStockData(ticker));
    }
  };

  useEffect(() => {
    setStockData(stockDataState);
    if (api_status === "ERROR") {
      alert("API call limit exceeded. Please try again later.");
    }
  }, [stockDataState, api_status]);

  return (
    <div className="main-container">
      <div className="report-container">
        <div className="search-container">
          <h1>Enter a Stock Ticker</h1>
          <input
            type="text"
            placeholder="AAPL"
            name="ticker"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
          />
          <button onClick={searchStocks}>Search</button>
        </div>
        <StockTable stockData={stockData} />
      </div>
    </div>
  );
}

export default StockReport;

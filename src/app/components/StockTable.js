import React from "react";

function StockTable({ stockData }) {
  return (
    <div className="stock-price-container">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Maximum</th>
            <th>Minimum</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          <tr className="first-row">
            <td>Price</td>
            <td>{stockData?.max_price || `$ -`}</td>
            <td>{stockData?.min_price || `$ -`}</td>
            <td>{stockData?.avg_vwap || `$ -`}</td>
          </tr>
          <tr>
            <td>
              Volume
              <br />
              (millions)
            </td>
            <td>{stockData?.max_vol || `-`}</td>
            <td>{stockData?.min_vol || `-`}</td>
            <td>{stockData?.avg_vol || `-`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StockTable;

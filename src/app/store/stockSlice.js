const LOAD_STOCK_DATA = "stock/loadStockData";

export const loadStockData = (ticker) => {
  return {
    type: LOAD_STOCK_DATA,
    ticker,
  };
};

export const getStockData = (ticker) => async (dispatch) => {
  const response = await fetch(
    `https://8abvk1s1na.execute-api.us-east-1.amazonaws.com/test/?ticker=${ticker}`
  );

  const data = await response.json();
  dispatch(loadStockData(data));
  return data;
};

const initialState = { stockData: {} };

const stockReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_STOCK_DATA: {
      newState = { ...state };
      newState.stockData = action.ticker;
      return newState;
    }
    default:
      return state;
  }
};

export default stockReducer;

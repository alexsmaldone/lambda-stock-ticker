# AWS LAMBDA FUNCTION

import json
import requests

API_URL = 'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2020-01-01/2020-12-31?apiKey=taIMgMrmnZ8SUZmdpq9_7ANRDxw3IPIx'

def stock_ticker(ticker):
  ticker = ticker.upper()
  return f'https://api.polygon.io/v2/aggs/ticker/{ticker}/range/1/day/2020-01-01/2020-12-31?apiKey=taIMgMrmnZ8SUZmdpq9_7ANRDxw3IPIx'

def get_stock_stats(trading_days):
  max_price = 0
  min_price = float("inf")
  max_vol = 0
  min_vol = float("inf")
  total_vol = 0
  total_vwap = 0
  num_days = len(trading_days)

  for day in trading_days:
    max_price = max(max_price, float(day['h']))
    min_price = min(min_price, float(day['l']))
    max_vol = max(max_vol, float(day['v']) / 1000000)
    min_vol = min(min_vol, float(day['v']) / 1000000)
    total_vol += (float(day['v']) / 1000000)
    total_vwap += (float(day['vw']))

  avg_vol = total_vol / num_days
  avg_vwap = total_vwap / num_days

  return {
    "max_price": '${:.2f}'.format(max_price),
    "min_price": '${:.2f}'.format(min_price),
    "max_vol": '{:.3f}'.format(max_vol),
    "min_vol": '{:.3f}'.format(min_vol),
    "avg_vol": '{:.3f}'.format(avg_vol),
    "avg_vwap": '${:.2f}'.format(avg_vwap)
  }



def get_response(ticker):
  ticker_url = stock_ticker(ticker)
  response = requests.get(ticker_url)
  trading_days = response.json()['results']

  return print(get_stock_stats(trading_days))

const API_KEY = "LOATZ3L01PXZMBVV";

class StocksService {
  static getStocks(symbol: string): Promise<[]> {
    
    return fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${API_KEY}`
    )
      .then((response) => response.json()) as unknown as Promise<[]>;
  }

  static searchStocks(query: string): Promise<[]> {
    return fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`
    )
      .then((response) => response.json()) as unknown as Promise<[]>;
  }
}
export default StocksService;

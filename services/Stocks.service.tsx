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

  static filterStocks(symbol: string, start_date: string, end_date: string) {
    const TOKEN = "c02o04748v6srfkalr00"
 
    let getTimeStartDate = new Date(start_date).getTime()/1000;
    let getTimeEndDate = new Date(end_date).getTime()/1000;
    return fetch(
      `https://finnhub.io/api/v1/crypto/candle?symbol=${symbol}&resolution=D&from=${getTimeStartDate}&to=${getTimeEndDate}&token=${TOKEN}`
    )
    .then((response) => response.json()) as unknown as Promise<[]>;
  }
}
export default StocksService;

import React from "react";
import Loading from "../Loading/Loading";

import StocksService from "../../services/Stocks.service";
import { formatDate } from "../../services/Utils";

import ChartPage from "../ChartPage/ChartPage";
import Search from "../search/Search";
import Checkbox from "../Checkbox";
import FilterStocks from "../FilterStocks/FilterStocks";

import styles from "./Stocks.module.scss";

interface State {
  loading: boolean;
  stockChartXValues: string[];
  stockChartOpenValues: number[];
  stockSymbol: string;
  query: string;
  listStocks: Array<object>;
}
interface Props {}

class Stocks extends React.Component<Props, State> {
  chartRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      stockChartXValues: [],
      stockChartOpenValues: [],
      stockSymbol: "",
      query: "",
      listStocks: [],
    };
  }

  componentDidMount() {
    this.getData("TSLA");
  }

  getData = async (stockSymbol: string) => {
    let stockChartXValues = [];
    let stockChartOpenValues = [];

    this.setState({ loading: true });

    try {
      const newStocks = await StocksService.getStocks(stockSymbol);

      for (let key in newStocks["Monthly Time Series"]) {
        let number = Number(newStocks["Monthly Time Series"][key]["1. open"]);

        stockChartXValues.push(key);
        stockChartOpenValues.push(number);

        this.setState({
          stockSymbol,
          stockChartXValues,
          stockChartOpenValues,
        });
      }
    } catch (err) {
      alert(err);
    } finally {
      this.setState({ loading: false });
    }
  };

  searchData = async (query: string) => {
    let listStocks = [];

    this.setState({ loading: true });

    try {
      const searchedStocks = await StocksService.searchStocks(query);

      searchedStocks["bestMatches"].forEach((stock) => {
        listStocks.push(stock);
      });

      this.setState({
        listStocks,
        query,
      });
    } catch (err) {
      alert(err);
    } finally {
      this.setState({ loading: false });
    }
  };

  filterData = async (symbol: string, start_date: string, end_date: string) => {
    let stockChartXValues = [];
    let stockChartOpenValues = [];

    this.setState({ loading: true });

    try {
      const filteredStocks = await StocksService.filterStocks(
        symbol,
        start_date,
        end_date
      );

      filteredStocks["o"].forEach((stock) => stockChartOpenValues.push(stock));
      filteredStocks["t"].forEach((stock) =>
        stockChartXValues.push(formatDate(stock * 1000))
      );

      this.setState({
        stockSymbol: symbol,
        stockChartXValues,
        stockChartOpenValues,
      });
    } catch (err) {
      alert(err);
    } finally {
      this.setState({ loading: false });
    }
  };   

  render() {
    const {
      loading,
      stockSymbol,
      stockChartOpenValues,
      stockChartXValues,
      query,
      listStocks,
    } = this.state;

    let total = 0;

    for (let i = 0; i < stockChartOpenValues.length; i++) {
      total += stockChartOpenValues[i];
    }

    let average = total / stockChartOpenValues.length;

    return (
      <>
        {loading && <Loading />}
        <div className={styles.list}>
          <Search query={query} onSearch={this.searchData} />
          <select
            className="my-5"
            onChange={(e) => this.getData(e.target.value)}
          >
            {listStocks.map((stock) => (
              <option key={stock["1. symbol"]} value={stock["1. symbol"]}>
                {stock["1. symbol"]}
              </option>
            ))}
          </select>
          <FilterStocks onFilter={this.filterData} />
          <Checkbox value={average} />
        </div>
        <div className={styles.stocks}>
          <ChartPage
            symbol={stockSymbol}
            xAxis={stockChartXValues}
            yAxis={stockChartOpenValues}
            yAxisAverage={average}
          />
        </div>
      </>
    );
  }
}

export default Stocks;

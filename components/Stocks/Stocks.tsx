import React from "react";
import debounce from "lodash/debounce";

import Loading from "../Loading/Loading";

import StocksService from "../../services/Stocks.service";
import SweetAlertService from '../../services/sweet-alert/SweetAlert.service';
import { formatDate } from "../../services/Utils";

import ChartPage from "../ChartPage/ChartPage";
import AsyncSelect from "react-select/async";
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
  debouncedOnLoading: (query: string, callback: any) => void;

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

    this.debouncedOnLoading = debounce(this.loadOptions, 500);
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
      if (newStocks["Information"]) {
        SweetAlertService.toast({ type: 'error', text: "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency."});
      }
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
      SweetAlertService.toast({ type: 'error', text: err });
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

      if (filteredStocks["s"] === "ok") {
        filteredStocks["o"].forEach((stock) =>
          stockChartOpenValues.push(stock)
        );
        filteredStocks["t"].forEach((stock) =>
          stockChartXValues.push(formatDate(stock * 1000))
        );

        this.setState({
          stockSymbol: symbol,
          stockChartXValues,
          stockChartOpenValues,
        });
      } else {
        SweetAlertService.toast({ type: 'error', text:  "No Data Currently Available. Markets are closed during weekends and public holidays. Please filter by previous date."})
      }
    } catch (err) {
      SweetAlertService.toast({ type: 'error', text: err });
    } finally {
      this.setState({ loading: false });
    }
  };

  overrideChartWithAverage = () => {
    const { stockChartOpenValues } = this.state;
    let total = 0;

    for (let i = 0; i < stockChartOpenValues.length; i++) {
      total += stockChartOpenValues[i];
    }

    let average = total / stockChartOpenValues.length;

    this.setState({
      stockChartOpenValues: Array.from(Array(200), (i) => average),
    });

    return average;
  };

  loadOptions = (query: string, callback) => {
    this.setState({ loading: true });

    StocksService.searchStocks(query)
      .then((searchedStocks) => {
        callback(searchedStocks["bestMatches"]);
      })
      .catch((err) => {
        SweetAlertService.toast({ type: 'error', text: err });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleInputChange = (newValue: string) => {
    const query = newValue.replace(/\W/g, "");
    this.setState({ query });
  };

  handleChange = (symbol) => {
    this.getData(symbol["1. symbol"]);
  };

  render() {
    const {
      loading,
      stockSymbol,
      stockChartOpenValues,
      stockChartXValues,
    } = this.state;

    return (
      <>
        {loading && <Loading />}
        <div className={styles.list}>
          <div className={styles.select}>
            <AsyncSelect
              cacheOptions
              defaultOptions
              getOptionLabel={(e) => e["1. symbol"]}
              loadOptions={this.debouncedOnLoading}
              onInputChange={this.handleInputChange}
              onChange={this.handleChange}
            />
          </div>
          <FilterStocks onFilter={this.filterData} />
          <Checkbox onChecked={this.overrideChartWithAverage} />
        </div>
        <div className={styles.stocks}>
          <ChartPage
            symbol={stockSymbol}
            xAxis={stockChartXValues}
            yAxis={stockChartOpenValues}
          />
        </div>
      </>
    );
  }
}

export default Stocks;

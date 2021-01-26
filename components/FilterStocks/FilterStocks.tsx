import React from "react";
import styles from "./FilterStocks.module.scss";

interface State {
  symbol: string;
  start_date: string;
  end_date: string;
}

interface Props {
  onFilter: (
    symbol: string,
    start_date: string,
    end_date: string
  ) => Promise<void>;
}

class FilterStocks extends React.Component<Props, State> {
  state = {
    symbol: '',
    start_date: '',
    end_date: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { onFilter } = this.props;

    const form_el = e.target;

    const symbol = e.target.symbol.value;
    const start_date = e.target.start_date.value;
    const end_date = e.target.end_date.value;

    if (start_date > end_date) {
      alert("The start date can't be higher than the end date")
    } else {
      onFilter(symbol, start_date, end_date);
    }
    
    this.setState({
      symbol,
      start_date,
      end_date,
    });

    form_el.reset();
  };
  render() {
    const { symbol, start_date, end_date } = this.state;
    return (
      <div className={styles.filter}>
        <div>
          <h2>Filter by Stock Code:</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="symbol" className="d-block mx-5 mb-4">Symbol</label>
          <input
            className="d-block w-100 mb-4"
            type="text"
            name="symbol"
            id="symbol"
            placeholder="Your symbol here (for example IBM)"
            defaultValue={symbol}
            required
          />
          <label  htmlFor="start_date" className="d-block mx-5 mb-4">Start date:</label>
          <input
            className="d-block w-100 mb-4"
            type="date"
            name="start_date"
            id="start_date"
            defaultValue={start_date}
            required
          />
          <label htmlFor="end_date" className="d-block mx-5 mb-4">End date: </label>
          <input
            className="d-block w-100"
            type="date"
            name="end_date"
            id="end_date"
            defaultValue={end_date}
            required
          />
          <button type="submit" className="btn btn--blue d-block w-100">
            Filter
          </button>
        </form>
      </div>
    );
  }
}

export default FilterStocks;

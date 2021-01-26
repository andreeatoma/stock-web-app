import React from "react";
import Chart from "chart.js";
import styles from "./ChartPage.module.scss";

interface Props {
  symbol: string;
  xAxis: string[];
  yAxis: number[];
  yAxisAverage: number;
}

class ChartPage extends React.Component<Props> {
  chartRef = React.createRef<HTMLCanvasElement>();

  componentDidUpdate() {
    const { symbol, xAxis, yAxis, yAxisAverage } = this.props;
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "line",
      data: {
        labels: xAxis,

        datasets: [
          {
            label: symbol,
            data: yAxis,
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderColor: "red",
          },
          {
            data: [yAxisAverage],
            label: "Average",

            // This binds the dataset to the right y axis
          },
        ],
      },
      options: {
        responsive: true,
        events: null,
        scales: {
          xAxes: [
            {
              ticks: {},
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
              },
            },
          ],
        },
      },
    });
  }

  render() {
    return (
      <div className={styles.chart}>
        <canvas ref={this.chartRef} />
      </div>
    );
  }
}

export default ChartPage;

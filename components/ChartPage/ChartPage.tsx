import React from "react";
import Chart from "chart.js";
import styles from './ChartPage.module.scss';

interface Props {
  symbol: string,
  xAxis: string[];
  yAxis: number[];
}

class ChartPage extends React.Component<Props> {
 chartRef = React.createRef<HTMLCanvasElement>();

  componentDidUpdate() {
    const {  symbol, xAxis, yAxis } = this.props;
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
        ],
      },
      options: {
        responsive: true,
        tooltips: {
            mode: 'point'
        },
        scales: {
          xAxes: [
            {
              ticks: {
                display: true,
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                display: true,
                stepSize: 0,
              },
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

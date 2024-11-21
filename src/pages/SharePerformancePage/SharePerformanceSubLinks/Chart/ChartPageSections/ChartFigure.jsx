import axios from "axios";
import { Oval } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../../../../services/getToken";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import StockTools from "highcharts/modules/stock-tools";

StockTools(Highcharts);

const ChartFigure = () => {
  const period = "5Y";

  const { data: chartTickerData, isLoading } = useQuery({
    queryKey: ["chartTickerData", period],
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get(
        `https://data-ir.argaam.com/api/v1/json/ir-api/charts-data/0/${period}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    enabled: !!period,
  });

  const chartData = chartTickerData?.data
    .map((item) => ({
      x: new Date(item.date).getTime(),
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close),
      volume: parseFloat(item.volume),
    }))
    .sort((a, b) => a.x - b.x);

  const options = {
    chart: {
      type: "candlestick",
      zoomType: "x",
      height: 400,
    },
    rangeSelector: {
      enabled: false,
      selected: 1,
      inputEnabled: true,
      buttons: [],
    },
    navigator: {
      enabled: true,
      color: "rgba(76, 165, 132, 0.318)",
    },
    xAxis: {
      type: "datetime",
    },
    tooltip: {
      split: true,
    },
    plotOptions: {
      candlestick: {
        color: "red",
        upColor: "green",
      },
      series: {
        dataGrouping: {
          units: [["week", [1]]],
        },
      },
    },
    series: [
      {
        type: "candlestick",
        name: "Alhokair Group",
        data: chartData || [],
      },
      {
        type: "column",
        data: chartData?.map((item) => [item.x, item.volume]) || [],
        yAxis: 1,
        color: "rgba(76, 165, 132, 0.318)",
        tooltip: {
          pointFormatter: function () {
            return `<b>Ticker Volume:</b> ${this.y.toLocaleString()}`;
          },
        },
      },
    ],
    yAxis: [
      {
        title: {
          text: "",
        },
        height: "70%",
        gridLineWidth: 0,
        minorGridLineWidth: 0,
      },
      {
        title: {
          text: "",
        },
        top: "75%",
        height: "25%",
        offset: 0,
        opposite: true,
        gridLineWidth: 0,
        minorGridLineWidth: 0,
      },
    ],
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    stockTools: {
      gui: {
        enabled: true,
        align: "left",
      },
    },
  };

  return (
    <div className="chart-ticker-widget mt-3">
      <div
        className="chart-container"
        style={{ position: "relative", height: "400px" }}
      >
        {isLoading && (
          <div
            className="loading-overlay"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Oval color="#00BFFF" height={80} width={80} visible={true} />
          </div>
        )}
        {chartTickerData && (
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={options}
          />
        )}
      </div>
    </div>
  );
};

export default ChartFigure;

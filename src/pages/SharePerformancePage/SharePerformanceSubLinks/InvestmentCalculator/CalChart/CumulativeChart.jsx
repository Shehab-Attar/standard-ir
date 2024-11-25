import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../../../../services/getToken";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const CumulativeChart = ({ startDate, endDate, amount, shares }) => {
  const { data: cumulativeChartData, isLoading } = useQuery({
    queryKey: ["cumulativeChartData", amount, shares, startDate, endDate],
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get(
        `https://data.argaam.com/api/v1/json/ir-api/investment-calculator-chart-data/${amount}/${shares}/${startDate}/${endDate}/false`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  const chartData = Array.isArray(cumulativeChartData)
    ? cumulativeChartData.map((item) => [
        new Date(item.forDate).getTime(),
        item.sharesValue,
      ])
    : [];

  const chartOptions = {
    chart: {
      type: "line",
    },
    title: {
      text: null,
    },
    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%Y-%m-%d}",
      },
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Cumulative",
        data: chartData,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default CumulativeChart;

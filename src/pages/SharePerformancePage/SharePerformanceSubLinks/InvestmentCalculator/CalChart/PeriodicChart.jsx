import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../../../../services/getToken";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PeriodicChart = ({ startDate, endDate, amount, shares }) => {
  const { data: periodicChartData, isLoading } = useQuery({
    queryKey: ["periodicChartData", amount, shares, startDate, endDate],
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get(
        `https://data.argaam.com/api/v1/json/ir-api/investment-calculator-chart-data-periodic/${amount}/${shares}/${startDate}/${endDate}/false`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  const chartData = Array.isArray(periodicChartData)
    ? periodicChartData
    : [periodicChartData];

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
        text: null,
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Periodic",
        data: [1, 1, 2, 3, 4],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default PeriodicChart;

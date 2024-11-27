import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../../../../services/getToken";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PeriodicChart = ({ startDate, endDate, amount, shares }) => {
  const sDate = (
    typeof startDate === "string" ? startDate : startDate.toISOString()
  ).split("T")[0];
  const eDate = (
    typeof endDate === "string" ? endDate : endDate.toISOString()
  ).split("T")[0];
  const { data: periodicChartData, isLoading } = useQuery({
    queryKey: ["periodicChartData", amount, shares, sDate, eDate],
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get(
        `https://data.argaam.com/api/v1/json/ir-api/investment-calculator-chart-data-periodic/${amount}/${shares}/${sDate}/${eDate}/false`,
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
    ? periodicChartData.map((item) => [
        new Date(item.forDate).getTime(),
        item.sharesValue,
      ])
    : [];

  const chartOptions = {
    chart: {
      type: "column",
    },
    colors: ["#175754"],
    title: {
      text: null,
    },
    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%b %e, %Y}",
      },
      tickPositioner: function () {
        return chartData.map((point) => point[0]);
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
        name: "Periodic",
        data: chartData,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default PeriodicChart;

import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useTranslation } from "react-i18next";
const CapitalChange = ({ data }) => {
  const [chartOptions, setChartOptions] = useState({});
  const { t } = useTranslation();
  useEffect(() => {
    const dividendsChartDataArray = Array.isArray(data.dividendsChartData)
      ? data.dividendsChartData
      : [data.dividendsChartData];

    const formattedData = dividendsChartDataArray.map((item) => [
      item.FinancialYear,
      item.Dividends,
    ]);

    setChartOptions({
      chart: {
        type: "column",
        backgroundColor: "transparent",
      },
      colors: ["#374c5f"],
      title: {
        text: null,
      },
      xAxis: {
        title: {
          text: null,
        },
        categories: dividendsChartDataArray.map((item) => item.FinancialYear),
      },
      yAxis: {
        title: {
          text: null,
        },
      },
      series: [
        {
          name: t("corporateActions.historicalDividends.title"),
          data: formattedData,
        },
      ],
      credits: {
        enabled: false,
      },
    });
  }, [data]);

  return (
    <div>
      <h6 className="main-title p-2">
        {t("corporateActions.historicalDividends.title")}
      </h6>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default CapitalChange;

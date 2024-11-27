import React, { useEffect, useState } from "react";
import Highcharts, { color } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useTranslation } from "react-i18next";
const CapitalChange = ({ data }) => {
  const [chartOptions, setChartOptions] = useState({});
  const { t } = useTranslation();
  useEffect(() => {
    const capitalChartDataArray = Array.isArray(data.capitalChartData)
      ? data.capitalChartData
      : [data.capitalChartData];

    const formattedData = capitalChartDataArray.map((item) => [
      item.FinancialYear,
      item.Capital,
    ]);

    setChartOptions({
      chart: {
        type: "column",
        backgroundColor: "transparent",
      },
      colors: ["#175754"],
      title: {
        text: null,
      },
      xAxis: {
        title: {
          text: null,
        },
        categories: capitalChartDataArray.map((item) => item.FinancialYear),
      },
      yAxis: {
        title: {
          text: null,
        },
      },
      series: [
        {
          name: t("corporateActions.capitalChange.title"),
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
        {t("corporateActions.capitalChange.title")}
      </h6>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default CapitalChange;

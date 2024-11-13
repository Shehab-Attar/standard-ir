import axios from "axios";
import { Oval } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../../../services/getToken";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Highcharts from "highcharts/highstock"; // Use Highstock for navigator and rangeSelector
import HighchartsReact from "highcharts-react-official";
import MoreButton from "../../../../components/MoreButton";
import "./ChartTickerWidget.css";

const ChartTickerWidget = () => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState("1D");
  const timePeriods = [
    { display: t("overview.chartTicker.1D"), value: "1D" },
    { display: t("overview.chartTicker.5D"), value: "5D" },
    { display: t("overview.chartTicker.3M"), value: "3M" },
    { display: t("overview.chartTicker.6M"), value: "6M" },
    { display: t("overview.chartTicker.1Y"), value: "1Y" },
    { display: t("overview.chartTicker.2Y"), value: "2Y" },
    { display: t("overview.chartTicker.5Y"), value: "5Y" },
    { display: t("overview.chartTicker.View All"), value: "AY" },
  ];

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

  const handlePeriodChange = (time) => {
    setPeriod(time);
  };

  const chartData = chartTickerData?.data
    .map((item) => ({
      x: new Date(item.date).getTime(),
      y: parseFloat(item.close),
    }))
    .sort((a, b) => a.x - b.x);

  const options = {
    title: {
      text: "",
    },
    chart: {
      type: "area",
      zoomType: "x",
    },
    rangeSelector: {
      enabled: true,
      selected: 1,
      inputEnabled: true,
      buttons: [],
    },
    navigator: {
      enabled: true,
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    tooltip: {
      shared: false,
      pointFormat: `<b>Al Hokair:</b> {point.y}`,
    },
    series: [
      {
        type: "area",
        data: chartData || [],
        color: "#3085c2",
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "#6B8ABC"],
            [1, "rgba(107, 138, 188, 0)"],
          ],
        },
      },
    ],
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
  };

  return (
    <div className="chart-ticker-widget border">
      <h6 className="p-2 main-title">{t("overview.chartTicker.title")}</h6>
      <hr className="m-2 mb-0 icons-color" />
      <div className="container-lg table-responsive">
        <ul className="nav nav-tabs mb-3 p-0">
          {timePeriods.map((option, index) => (
            <li className="nav-item" key={`${option.value}-${index}`}>
              <button
                className={`nav-link ${
                  period === option.value ? "active" : ""
                }`}
                onClick={() => handlePeriodChange(option.value)}
              >
                {option.display}
              </button>
            </li>
          ))}
        </ul>
        <div className="chart-container" style={{ position: "relative" }}>
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
        <MoreButton path={"chart"} />
      </div>
    </div>
  );
};

export default ChartTickerWidget;

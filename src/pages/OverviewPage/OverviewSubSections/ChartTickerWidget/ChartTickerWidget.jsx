import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { getToken } from '../../../../services/getToken';
import { useState } from 'react'
import MoreButton from '../../../../components/MoreButton';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Oval } from 'react-loader-spinner';

import axios from 'axios';
import './ChartTickerWidget.css';

const ChartTickerWidget = () => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState("1D");
  const timePeriods = [
    { display: t("chartTicker.1D"), value: "1D" },
    { display: t("chartTicker.5D"), value: "5D" },
    { display: t("chartTicker.3M"), value: "3M" },
    { display: t("chartTicker.6M"), value: "6M" },
    { display: t("chartTicker.1Y"), value: "1Y" },
    { display: t("chartTicker.2Y"), value: "2Y" },
    { display: t("chartTicker.5Y"), value: "5Y" },
    { display: t('chartTicker.View All'), value: "View All" },
  ];

  const { data: chartTickerData, isLoading, error } = useQuery({
    queryKey: ["chartTickerData", period],
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get(`https://data-ir.argaam.com/api/v1/json/ir-api/charts-data/0/${period}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    enabled: !!period, // Ensure the query runs only when a period is selected
  });

  const handlePeriodChange = (time) => {
    setPeriod(time);
  };

  const chartData = chartTickerData?.data
    .map((item) => ({
      x: new Date(item.date).getTime(),
      y: parseFloat(item.close),
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
    }))
    .sort((a, b) => a.x - b.x);

  const yAxisMin = chartTickerData?.configurations.min;
  const yAxisMax = chartTickerData?.configurations.max;
  const lastDataPoint = chartData?.length ? chartData[chartData.length - 1] : null;
  const lastCloseValue = lastDataPoint ? lastDataPoint.y.toFixed(2) : 0;
  const lastDate = lastDataPoint
    ? new Date(lastDataPoint.x).toLocaleString(undefined, {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const options = {
    title: {
      text: "",
    },
    chart: {
      zoomType: "x",
    },
    xAxis: {
      type: "datetime",
      crosshair: true,
    },
    yAxis: {
      min: yAxisMin,
      max: yAxisMax + 0.01,
      labels: {
        formatter: function () {
          return this.value.toFixed(2);
        },
      },
      crosshair: true,
      opposite: true,
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      pointFormat:
        `<b>Open:</b> {point.open}<br/>` +
        `<b>High:</b> {point.high}<br/>` +
        `<b>Low:</b> {point.low}<br/>` +
        `<b>Close:</b> {point.y}`,
    },
    series: [
      {
        type: "area",
        name: `Close: ${lastCloseValue} | Date: ${lastDate}`,
        data: chartData || [],
        color: "#6B8ABC",
      },
    ],
    accessibility: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="chart-ticker-widget border">
      <h6 className="p-2 main-title">{t('chartTicker.title')}</h6>
      <hr className="m-2 mb-0 icons-color" />
      <div className="container-lg table-responsive">
        <ul className="nav nav-tabs mb-3 p-0">
          {timePeriods.map((option, index) => (
            <li className="nav-item" key={`${option.value}-${index}`}>
              <button
                className={`nav-link ${period === option.value ? "active" : ""}`}
                onClick={() => handlePeriodChange(option.value)}
              >
                {option.display}
              </button>
            </li>
          ))}
        </ul>
        <div className="chart-container" style={{ position: 'relative' }}>
          {isLoading && (
            <div className="loading-overlay" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Oval
                color="#00BFFF"
                height={80}
                width={80}
                visible={true}
              />
            </div>
          )}
          {chartTickerData && <HighchartsReact highcharts={Highcharts} options={options} />}
        </div>
        <MoreButton path={"chart"} />
      </div>
    </div>
  );
}

export default ChartTickerWidget;

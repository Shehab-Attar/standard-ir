import axios from "axios";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { getToken } from "../../../../../services/getToken.js";
import { formatChange } from "../../../../../utils/Helpers";
import dayjs from "dayjs";
import "../../../SharePerformancePage.css";

const TrandingDetails = () => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(
    dayjs().subtract(7, "day").toDate()
  );
  const [endDate, setEndDate] = useState(dayjs().toDate());
  const [tradingDetailsArray, setTradingDetailsArray] = useState([]);

  const fetchTradingDetails = async (fromDate, toDate) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Unable to authenticate");
      }
      const res = await axios.get(
        `https://data.argaam.com/api/v1/json/ir-api/chart-data-table/${fromDate}/${toDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Encoding": "gzip",
          },
        }
      );
      setTradingDetailsArray(res.data.chartsData || []);
    } catch (error) {
      console.error("Error fetching trading details:", error);
    }
  };

  useEffect(() => {
    const fromDate = dayjs(startDate).format("YYYY-MM-DD");
    const toDate = dayjs(endDate).format("YYYY-MM-DD");
    fetchTradingDetails(fromDate, toDate);
  }, [startDate, endDate]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date && endDate) {
      const fromDate = dayjs(date).format("YYYY-MM-DD");
      const toDate = dayjs(endDate).format("YYYY-MM-DD");
      fetchTradingDetails(fromDate, toDate);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (startDate && date) {
      const fromDate = dayjs(startDate).format("YYYY-MM-DD");
      const toDate = dayjs(date).format("YYYY-MM-DD");
      fetchTradingDetails(fromDate, toDate);
    }
  };

  return (
    <div className="my-1 mx-0 px-0">
      <h4 className="mx-2">
        {t("sharePerformance.chart.tradingDetails.title")}
      </h4>
      <hr />
      <div className="my-3">
        <div className="ant-picker ant-picker-range css-zcfrx9">
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd/MM/yyyy"
            placeholderText={t("sharePerformance.negotiated_deals.start")}
            className="custom-datepicker"
          />
          <span
            role="img"
            aria-label="swap-right"
            className="anticon anticon-swap-right"
          >
            <svg
              viewBox="0 0 1024 1024"
              focusable="false"
              data-icon="swap-right"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z"></path>
            </svg>
          </span>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd/MM/yyyy"
            placeholderText={t("sharePerformance.negotiated_deals.end")}
            className="custom-datepicker"
          />
          <span className="ant-picker-suffix mx-3">
            <span
              role="img"
              aria-label="calendar"
              className="anticon anticon-calendar"
            >
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="calendar"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4 3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path>
              </svg>
            </span>
          </span>
        </div>
      </div>
      <div className="bg-body rounded">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>{t("sharePerformance.chart.tradingDetails.date")}</th>
              <th>{t("sharePerformance.chart.tradingDetails.price")}</th>
              <th>{t("sharePerformance.chart.tradingDetails.change")}</th>
              <th>{t("sharePerformance.chart.tradingDetails.change%")}</th>
              <th>{t("sharePerformance.chart.tradingDetails.volume")}</th>
              <th>{t("sharePerformance.chart.tradingDetails.turnover")}</th>
              <th>{t("sharePerformance.chart.tradingDetails.open")}</th>
              <th>{t("sharePerformance.chart.tradingDetails.high")}</th>
              <th>{t("sharePerformance.chart.tradingDetails.low")}</th>
            </tr>
          </thead>
          <tbody>
            {tradingDetailsArray.length > 0 ? (
              tradingDetailsArray.map((item, index) => (
                <tr key={index}>
                  <td>{dayjs(item.forDate).format("DD/MM/YYYY")}</td>
                  <td style={{ color: item.close > 0 ? "green" : "red" }}>
                    {formatChange(item.close)}
                  </td>
                  <td style={{ color: item.change > 0 ? "green" : "red" }}>
                    {formatChange(item.change)}
                  </td>
                  <td
                    style={{
                      color: item.percentageChange > 0 ? "green" : "red",
                    }}
                  >
                    {formatChange(item.percentageChange)}
                  </td>
                  <td>{item.volume.toLocaleString()}</td>
                  <td>{item.amount.toLocaleString()}</td>
                  <td style={{ color: item.open > 0 ? "green" : "red" }}>
                    {formatChange(item.open)}
                  </td>
                  <td style={{ color: item.max > 0 ? "green" : "red" }}>
                    {formatChange(item.max)}
                  </td>
                  <td style={{ color: item.min > 0 ? "green" : "red" }}>
                    {formatChange(item.min)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrandingDetails;

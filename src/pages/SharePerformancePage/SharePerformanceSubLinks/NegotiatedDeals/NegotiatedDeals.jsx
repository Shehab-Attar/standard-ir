import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../../../services/getToken";
import { formatChange } from "../../../../utils/Helpers";
import { useTranslation } from "react-i18next";
import "./NegotiatedDeals.css";

const NegotiatedDeals = () => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { data, isLoading } = useQuery({
    queryKey: ["negotiatedDealsData"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("Unable to authenticate");
      }
      const res = await axios.get(
        `https://data.argaam.com/api/v1/json/ir-widget/negotiated-deals`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Encoding": "gzip",
          },
        }
      );
      return res.data;
    },
  });

  if (isLoading) return <div>{t("title.loading")}</div>;

  // Filter deals only if both startDate and endDate are selected
  const filteredDeals =
    startDate && endDate
      ? data.deals.filter((item) => {
          const itemDate = new Date(item.date);
          return itemDate >= startDate && itemDate <= endDate;
        })
      : data.deals;

  return (
    <div className="container-lg">
      <div className="my-3">
        <div className="ant-picker ant-picker-range css-zcfrx9">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
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
            onChange={(date) => setEndDate(date)}
            selectsEnd
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
                <path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path>
              </svg>
            </span>
          </span>
        </div>
      </div>
      <div className="bg-body rounded">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>{t("sharePerformance.negotiated_deals.date")}</th>
              <th>{t("sharePerformance.negotiated_deals.marketPrice")}</th>
              <th>{t("sharePerformance.negotiated_deals.negotiatedPrice")}</th>
              <th>{t("sharePerformance.negotiated_deals.negotiatedMarket")}</th>
              <th>{t("sharePerformance.negotiated_deals.volume")}</th>
              <th>{t("sharePerformance.negotiated_deals.value")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeals.map((item) => (
              <tr key={item.date}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td style={{ color: item.marketPrice > 0 ? "green" : "red" }}>
                  {formatChange(item.marketPrice)}
                </td>
                <td
                  style={{ color: item.negotiatedPrice > 0 ? "green" : "red" }}
                >
                  {formatChange(item.negotiatedPrice)}
                </td>
                <td
                  style={{
                    color: item.negotiatedToMarketprice > 0 ? "green" : "red",
                  }}
                >
                  ({formatChange(item.negotiatedToMarketprice)} %)
                </td>
                <td>{item.volumeTraded}</td>
                <td>{item.valueTraded}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NegotiatedDeals;

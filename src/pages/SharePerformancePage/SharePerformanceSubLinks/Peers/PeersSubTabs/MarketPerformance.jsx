import axios from "axios";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../../../../services/getToken.js";
import { useTranslation } from "react-i18next";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.css";
import { formatChange } from "../../../../../utils/Helpers";

const MarketPerformance = () => {
  const { t, i18n } = useTranslation();
  const [year, setYear] = useState(new Date().getFullYear());
  const [currency, setCurrency] = useState("SAR");
  const [periodType, setPeriodType] = useState("year");
  const [fiscalPeriod, setFiscalPeriod] = useState("q1");

  const { data, isLoading } = useQuery({
    queryKey: ["peersMarketPerformanceData", year, periodType, fiscalPeriod],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("Unable to authenticate");
      }
      const res = await axios.get(
        `https://data.argaam.com/api/v1.0/json/ir-api/CompanyCompetitor/en?tabName=marketPerformance&fiscalPeriodType=${periodType}&fiscalPeriod=${fiscalPeriod}&fiscalYear=${year}&isCurrent=false`,
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

  const marketPerformanceArray = Array.isArray(data.MarketPerformance)
    ? data.MarketPerformance
    : [data.MarketPerformance];

  const fiscalYears = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  const convertCurrency = (value) => {
    if (value == null) return "-";
    return currency === "USD"
      ? formatChange(value / 3.751)
      : formatChange(value);
  };

  const periodOptions =
    periodType === "quarter"
      ? ["q1", "q2", "q3", "q4"]
      : ["I1", "I2", "I3", "I4"];

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between my-3">
          <div className="d-flex m-0 rounded px-1 space-between">
            <button
              onClick={() => setPeriodType("year")}
              className={`btn ${
                periodType === "year" ? "btn-secondary" : "btn-light"
              }`}
            >
              {t("sharePerformance.peers.ranking.yearly")}
            </button>
            <button
              onClick={() => {
                setPeriodType("quarter");
                setFiscalPeriod("q1");
              }}
              className={`btn ${
                periodType === "quarter" ? "btn-secondary" : "btn-light"
              } ml-2`}
            >
              {t("sharePerformance.peers.ranking.quarter")}
            </button>
            <button
              onClick={() => {
                setPeriodType("interim");
                setFiscalPeriod("I1");
              }}
              className={`btn ${
                periodType === "interim" ? "btn-secondary" : "btn-light"
              } ml-2`}
            >
              {t("sharePerformance.peers.ranking.interim")}
            </button>
          </div>
          <div className="d-flex align-items-center" style={{ gap: "20px" }}>
            <label htmlFor="yearDropdown">
              {t("sharePerformance.peers.ranking.year")}:
            </label>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="yearDropdown">
                {year}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {fiscalYears.map((fiscalYear) => (
                  <Dropdown.Item
                    key={fiscalYear}
                    onClick={() => {
                      setYear(fiscalYear);
                      setFiscalPeriod("year");
                    }}
                  >
                    {fiscalYear}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            {(periodType === "quarter" || periodType === "interim") && (
              <>
                <label htmlFor="periodTypeDropdown">
                  {t("sharePerformance.peers.ranking.period")}:
                </label>
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="periodTypeDropdown">
                    {fiscalPeriod}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {periodOptions.map((period) => (
                      <Dropdown.Item
                        key={period}
                        onClick={() => setFiscalPeriod(period)}
                      >
                        {period}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </div>
          <div className="buttons-container">
            <button
              onClick={() => setCurrency("SAR")}
              className={`btn rounded CurrBtn ${
                currency === "SAR" ? "active" : ""
              }`}
            >
              {t("estimates.analystEstimates.currSAR")}
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`btn rounded CurrBtn ${
                currency === "USD" ? "active" : ""
              } ml-2`}
            >
              {t("estimates.analystEstimates.currUSD")}
            </button>
          </div>
        </div>
      </div>
      <div>
        <SimpleBar style={{ maxHeight: "400px", overflowX: "auto" }}>
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>{t("sharePerformance.peers.ranking.company")}</th>
                <th>{t("sharePerformance.peers.ranking.marketCap")}</th>
                <th>{t("sharePerformance.peers.marketPerformance.month1")}</th>
                <th>{t("sharePerformance.peers.marketPerformance.month3")}</th>
                <th>{t("sharePerformance.peers.marketPerformance.month6")}</th>
                <th>{t("sharePerformance.peers.marketPerformance.month12")}</th>
                <th>{t("sharePerformance.peers.marketPerformance.ytd")}</th>
                <th>
                  {t("sharePerformance.peers.marketPerformance.priceEarnings")}
                </th>
                <th>
                  {t("sharePerformance.peers.marketPerformance.pricePerBook")}
                </th>
                <th>
                  {t("sharePerformance.peers.marketPerformance.dividendYield")}
                </th>
              </tr>
            </thead>
            <tbody>
              {marketPerformanceArray.map((item, index) => (
                <tr key={index} className="justify-content-between">
                  <td>
                    {i18n.language === "ar"
                      ? item.shortNameAr
                      : item.shortNameEn}
                  </td>
                  <td
                    style={{
                      color:
                        item.marketValue > 0
                          ? "green"
                          : item.marketValue < 0
                          ? "red"
                          : null,
                    }}
                  >
                    {item.marketValue
                      ? convertCurrency(Math.abs(item.marketValue))
                      : "-"}
                  </td>
                  <td
                    style={{
                      color:
                        item.month1Change > 0
                          ? "green"
                          : item.month1Change < 0
                          ? "red"
                          : null,
                    }}
                  >
                    {item.month1Change
                      ? convertCurrency(Math.abs(item.month1Change))
                      : "-"}
                  </td>
                  <td
                    style={{
                      color:
                        item.month3Change > 0
                          ? "green"
                          : item.month3Change < 0
                          ? "red"
                          : null,
                    }}
                  >
                    {item.month3Change
                      ? convertCurrency(Math.abs(item.month3Change))
                      : "-"}
                  </td>
                  <td
                    style={{
                      color:
                        item.month6Change > 0
                          ? "green"
                          : item.month6Change < 0
                          ? "red"
                          : null,
                    }}
                  >
                    {item.month6Change
                      ? convertCurrency(Math.abs(item.month6Change))
                      : "-"}
                  </td>
                  <td
                    style={{
                      color:
                        item.month12Change > 0
                          ? "green"
                          : item.month12Change < 0
                          ? "red"
                          : null,
                    }}
                  >
                    {item.month12Change
                      ? convertCurrency(Math.abs(item.month12Change))
                      : "-"}
                  </td>
                  <td
                    style={{
                      color:
                        item.ytdChange > 0
                          ? "green"
                          : item.ytdChange < 0
                          ? "red"
                          : null,
                      width: "300px",
                    }}
                  >
                    {item.ytdChange
                      ? convertCurrency(Math.abs(item.ytdChange))
                      : "-"}
                  </td>
                  <td
                    style={{
                      color:
                        item.priceEarnings > 0
                          ? "green"
                          : item.priceEarnings < 0
                          ? "red"
                          : null,
                      width: "300px",
                    }}
                  >
                    {item.priceEarnings > 50
                      ? t("sharePerformance.peers.marketPerformance.moreThan50")
                      : item.priceEarnings < 0
                      ? t("sharePerformance.peers.marketPerformance.negative")
                      : item.priceEarnings
                      ? convertCurrency(Math.abs(item.priceEarnings))
                      : "-"}
                  </td>
                  <td
                    style={{
                      color:
                        item.pricePerBook > 0
                          ? "green"
                          : item.pricePerBook < 0
                          ? "red"
                          : null,
                      width: "300px",
                    }}
                  >
                    {item.pricePerBook
                      ? convertCurrency(Math.abs(item.pricePerBook))
                      : "-"}
                  </td>
                  <td
                    style={{
                      color:
                        item.dividendYield > 0
                          ? "green"
                          : item.dividendYield < 0
                          ? "red"
                          : null,
                      width: "300px",
                    }}
                  >
                    {item.dividendYield
                      ? convertCurrency(Math.abs(item.dividendYield))
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </SimpleBar>
      </div>
    </div>
  );
};

export default MarketPerformance;

import axios from "axios";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../../../../services/getToken.js";
import { useTranslation } from "react-i18next";
import { formatChange } from "../../../../../utils/Helpers";

const PerShareData = () => {
  const { t, i18n } = useTranslation();
  const [year, setYear] = useState(new Date().getFullYear());
  const [currency, setCurrency] = useState("SAR");
  const [periodType, setPeriodType] = useState("year");
  const [fiscalPeriod, setFiscalPeriod] = useState("q1");

  const { data, isLoading } = useQuery({
    queryKey: ["peersPerShareData", year, periodType, fiscalPeriod],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("Unable to authenticate");
      }
      const res = await axios.get(
        `https://data.argaam.com/api/v1.0/json/ir-api/CompanyCompetitor/en?tabName=persharedata&fiscalPeriodType=${periodType}&fiscalPeriod=${fiscalPeriod}&fiscalYear=${year}&isCurrent=false`,
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

  const perShareDataArray = Array.isArray(data.PerShareData)
    ? data.PerShareData
    : [data.PerShareData];

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
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>{t("sharePerformance.peers.perShareData.company")}</th>
              <th>{t("sharePerformance.peers.perShareData.bookValue")}</th>
              <th>{t("sharePerformance.peers.perShareData.eps")}</th>
              <th>{t("sharePerformance.peers.perShareData.cashDividend")}</th>
              <th>{t("sharePerformance.peers.perShareData.dividend")}</th>
            </tr>
          </thead>
          <tbody>
            {perShareDataArray.map((item, index) => (
              <tr key={index}>
                <td>
                  {i18n.language === "ar" ? item.shortNameAr : item.shortNameEn}
                </td>
                <td
                  style={{
                    color:
                      item.bookValue > 0
                        ? "green"
                        : item.bookValue < 0
                        ? "red"
                        : null,
                  }}
                >
                  {item.bookValue
                    ? convertCurrency(Math.abs(item.bookValue))
                    : "-"}
                </td>
                <td
                  style={{
                    color:
                      item.earningsPerShare > 0
                        ? "green"
                        : item.earningsPerShare < 0
                        ? "red"
                        : null,
                  }}
                >
                  {item.earningsPerShare
                    ? convertCurrency(Math.abs(item.earningsPerShare))
                    : "-"}
                </td>
                <td
                  style={{
                    color:
                      item.cashOperationPerShare > 0
                        ? "green"
                        : item.cashOperationPerShare < 0
                        ? "red"
                        : null,
                  }}
                >
                  {item.cashOperationPerShare
                    ? convertCurrency(Math.abs(item.cashOperationPerShare))
                    : "-"}
                </td>
                <td
                  style={{
                    color:
                      item.dividends > 0
                        ? "green"
                        : item.dividends < 0
                        ? "red"
                        : null,
                  }}
                >
                  {item.dividends
                    ? convertCurrency(Math.abs(item.dividends))
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerShareData;

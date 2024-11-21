import axios from "axios";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../../../../services/getToken.js";
import { formatChange } from "../../../../../utils/Helpers";
import { useTranslation } from "react-i18next";

const Growth = () => {
  const { t, i18n } = useTranslation();
  const [year, setYear] = useState(new Date().getFullYear());
  const [periodType, setPeriodType] = useState("year");
  const [fiscalPeriod, setFiscalPeriod] = useState("q1");

  const { data, isLoading } = useQuery({
    queryKey: ["peersGrowthData", year, periodType, fiscalPeriod],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("Unable to authenticate");
      }
      const res = await axios.get(
        `https://data.argaam.com/api/v1.0/json/ir-api/CompanyCompetitor/en?tabName=growth&fiscalPeriodType=${periodType}&fiscalPeriod=${fiscalPeriod}&fiscalYear=${year}&isCurrent=false`,
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

  const growthDataArray = Array.isArray(data.Growth)
    ? data.Growth
    : [data.Growth];

  const fiscalYears = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  const periodOptions =
    periodType === "quarter" ? ["q1", "q2", "q3", "q4"] : ["year"];

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between my-3">
          <div className="d-flex m-0 rounded px-1 mb-2 space-between">
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
          </div>
          <div className="d-flex align-items-center" style={{ gap: "20px" }}>
            {periodType === "quarter" && (
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
          </div>
        </div>
      </div>
      <div>
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>{t("sharePerformance.peers.perShareData.company")}</th>
              <th>{t("sharePerformance.peers.growth.assets")}</th>
              <th>{t("sharePerformance.peers.growth.netIncome")}</th>
              <th>{t("sharePerformance.peers.growth.revenues")}</th>
              <th>{t("sharePerformance.peers.growth.bookValue")}</th>
            </tr>
          </thead>
          <tbody>
            {growthDataArray.map((item, index) => (
              <tr key={index}>
                <td>
                  {i18n.language === "ar" ? item.shortNameAr : item.shortNameEn}
                </td>
                <td
                  style={{
                    color:
                      item.assets > 0
                        ? "green"
                        : item.assets < 0
                        ? "red"
                        : null,
                  }}
                >
                  {item.assets > 0
                    ? formatChange(Math.abs(item.assets)) + "%"
                    : item.assets < 0
                    ? formatChange(Math.abs(item.assets)) + "%"
                    : "-"}
                </td>
                <td
                  style={{
                    color:
                      item.netIncome > 0
                        ? "green"
                        : item.netIncome < 0
                        ? "red"
                        : null,
                  }}
                >
                  {item.netIncome
                    ? formatChange(Math.abs(item.netIncome)) + "%"
                    : "-"}
                </td>
                <td
                  style={{
                    color:
                      item.revenue > 0
                        ? "green"
                        : item.revenue < 0
                        ? "red"
                        : null,
                  }}
                >
                  {item.revenue
                    ? formatChange(Math.abs(item.revenue)) + "%"
                    : "-"}
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
                    ? formatChange(Math.abs(item.bookValue)) + "%"
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

export default Growth;

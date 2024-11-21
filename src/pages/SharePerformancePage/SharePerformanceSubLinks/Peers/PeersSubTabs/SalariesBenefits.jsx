// Years rendering is not working

import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dropdown } from "react-bootstrap";
import { getToken } from "../../../../../services/getToken.js";
import { useTranslation } from "react-i18next";

const SalariesBenefits = () => {
  const { t, i18n } = useTranslation();
  const [year, setYear] = useState(new Date().getFullYear());
  const [currency, setCurrency] = useState("SAR");
  const { data, isLoading } = useQuery({
    queryKey: ["peersSalariesBenefitsData", year],
    queryFn: async () => {
      // Ensure token is valid
      const token = await getToken();

      if (!token) {
        throw new Error("Unable to authenticate");
      }

      const res = await axios.get(
        `https://data.argaam.com/api/v1.0/json/ir-api/CompanyCompetitor/en?tabName=salariesandbonuses&fiscalPeriodType=year&fiscalPeriod=year&fiscalYear=${year}&isCurrent=false`,
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

  // == isLoading
  if (isLoading) return <div>{t("title.loading")}</div>;
  // == isLoading

  const salariesBenefitsArray = Array.isArray(data.SalariesAndBonuses)
    ? data.SalariesAndBonuses
    : [data.SalariesAndBonuses];

  const fiscalYears = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  const convertCurrency = (value) => {
    if (value == null) return "-";
    return currency === "USD" ? (value / 3.751).toFixed(2) : value.toFixed(2);
  };

  return (
    <div className="container-lg">
      <div className="d-flex justify-content-between my-3">
        <div className="d-flex align-items-center">
          <label htmlFor="yearDropdown">
            {t("sharePerformance.peers.salariesBenefits.year")}:
          </label>
          &nbsp;
          <Dropdown>
            <Dropdown.Toggle variant="light" id="yearDropdown">
              {year}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {fiscalYears.map((fiscalYear) => (
                <Dropdown.Item
                  key={fiscalYear}
                  onClick={() => setYear(fiscalYear)}
                >
                  {fiscalYear}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="d-flex m-0 rounded px-1 mb-2">
          <button
            onClick={() => setCurrency("SAR")}
            className={`btn ${
              currency === "SAR" ? "btn-secondary" : "btn-light"
            }`}
          >
            {t("estimates.analystEstimates.currSAR")}
          </button>
          <button
            onClick={() => setCurrency("USD")}
            className={`btn ${
              currency === "SAR" ? "btn-light" : "btn-secondary"
            } ml-2`}
          >
            {t("estimates.analystEstimates.currUSD")}
          </button>
        </div>
      </div>
      <table className="table table-hover table-bordered">
        <thead className="table-light">
          <tr>
            <th rowSpan={2} className="border">
              <span className="px-2">
                {t("sharePerformance.peers.salariesBenefits.company")}
              </span>
            </th>
            <th colSpan={4} className="text-center fw-bolder border">
              {t("sharePerformance.peers.salariesBenefits.board")}
            </th>
            <th colSpan={4} className="text-center fw-bolder border">
              {t("sharePerformance.peers.salariesBenefits.executives")}
            </th>
            <th rowSpan={2} className="text-center fw-bolder border">
              {t("sharePerformance.peers.salariesBenefits.total")}
            </th>
          </tr>
          <tr>
            <th rowSpan={2} className="text-center border">
              {t("sharePerformance.peers.salariesBenefits.salaries")}
            </th>
            <th rowSpan={2} className="text-center border">
              {t("sharePerformance.peers.salariesBenefits.bonus")}
            </th>
            <th rowSpan={2} className="text-center border">
              {t("sharePerformance.peers.salariesBenefits.others")}
            </th>
            <th rowSpan={2} className="text-center fw-bolder border">
              {t("sharePerformance.peers.salariesBenefits.total")}
            </th>
            <th rowSpan={2} className="text-center border">
              {t("sharePerformance.peers.salariesBenefits.salaries")}
            </th>
            <th rowSpan={2} className="text-center border">
              {t("sharePerformance.peers.salariesBenefits.bonus")}
            </th>
            <th rowSpan={2} className="text-center border">
              {t("sharePerformance.peers.salariesBenefits.others")}
            </th>
            <th rowSpan={2} className="text-center fw-bolder border">
              {t("sharePerformance.peers.salariesBenefits.total")}
            </th>
          </tr>
        </thead>
        <tbody>
          {salariesBenefitsArray.map((item, index) => (
            <tr key={index}>
              <td>
                <span className="px-1">
                  {i18n.language === "ar" ? item.shortNameAr : item.shortNameEn}
                </span>
              </td>
              <td className="text-center">
                {convertCurrency(item.boardMemberSalaries) ?? "-"}
              </td>
              <td className="text-center">
                {convertCurrency(item.boardMemberBonus) ?? "-"}
              </td>
              <td className="text-center">
                {convertCurrency(item.boardMemberOther) ?? "-"}
              </td>
              <td className="text-center">
                {convertCurrency(item.boardMemberSalariesTotal) ?? "-"}
              </td>
              <td className="text-center">
                {convertCurrency(item.executiveSalaries) ?? "-"}
              </td>
              <td className="text-center">
                {convertCurrency(item.executiveBonus) ?? "-"}
              </td>
              <td className="text-center">
                {convertCurrency(item.executiveOther) ?? "-"}
              </td>
              <td className="text-center">
                {convertCurrency(item.executiveSalariesTotal) ?? "-"}
              </td>
              <td className="text-center">
                {convertCurrency(
                  item.executiveSalariesTotal + item.boardMemberSalariesTotal
                ) ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalariesBenefits;

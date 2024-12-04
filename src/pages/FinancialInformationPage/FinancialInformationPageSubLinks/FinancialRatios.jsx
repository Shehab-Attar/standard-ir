// Chart is not available for this page

import axios from "axios";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../../services/getToken";
import { formatChange } from "../../../utils/Helpers";
import "../FinancialInformationPage.css";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import dayjs from "dayjs";

const FinancialRatios = () => {
  const { t, i18n } = useTranslation();
  const [theItem, setTheItem] = useState(null);
  const [currency, setCurrency] = useState("SAR");
  const [periodType, setPeriodType] = useState("year");
  const [dropdownValue, setDropdownValue] = useState(
    t("estimates.analystEstimates.annual")
  );

  const handleItemClick = (item) => {
    setTheItem(item);
  };

  const conversionRate = 3.751; // Conversion rate from SAR to USD

  const { data, isLoading } = useQuery({
    queryKey: ["FinantialRatios", periodType],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("Unable to authenticate");
      }
      const res = await axios.get(
        `https://data.argaam.com/api/v1.0/json/ir-api/financial-ratios?fiscalPeriodType=${periodType}`,
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

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: null,
    },
    xAxis: {
      title: {
        text: null,
      },
      categories:
        data.financialRatioFieldsGroups[0].financialRatioFieldsGroupFields[0]
          .values[0].fiscalPeriodType === "Yearly"
          ? data.financialRatioFieldsGroups[0].financialRatioFieldsGroupFields[0].values
              .slice(0, 5)
              .map((value) => value.year)
          : data.financialRatioFieldsGroups[0].financialRatioFieldsGroupFields[0].values
              .slice(0, 5)
              .map((value) =>
                dayjs(value.period, "DD/MM/YY").format("DD/MM/YY")
              ) || [],
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    tooltip: {
      enabled: true,
      formatter: function () {
        return `<b>${this.series.name}</b>: ${Highcharts.numberFormat(
          this.y,
          2,
          ".",
          ","
        )}`;
      },
    },
    series: [
      {
        name: i18n.language === "ar" ? theItem?.nameAr : theItem?.nameEn,
        data:
          theItem?.values.slice(0, 5).map((value) => parseFloat(value.value)) ||
          [],
        color: "#175754",
      },
    ],
    legend: {
      enabled: true,
    },
    credits: {
      enabled: false,
    },
  };

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
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
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              id="dropdown-basic"
              className="px-3"
            >
              {dropdownValue}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setDropdownValue(t("estimates.analystEstimates.annual"));
                  setPeriodType("year");
                }}
              >
                {t("estimates.analystEstimates.annual")}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setDropdownValue(t("estimates.analystEstimates.quarterly"));
                  setPeriodType("quarter");
                }}
              >
                {t("estimates.analystEstimates.quarterly")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <table className="table">
          <thead className="table-light">
            <tr className="details-tr">
              <th className="details-th p-1 px-4">
                {t("financialInformation.financialStatements.details")}
              </th>
              <th className="p-1 px-4">
                {t("financialInformation.financialStatements.chart")}
              </th>
              {data.financialRatioFieldsGroups[0].financialRatioFieldsGroupFields[0].values
                .slice(0, 5)
                .map((value, index) => (
                  <th key={index} className="px-5 py-1">
                    {periodType === "year" ? value.year : value.period}
                  </th>
                ))}
            </tr>
          </thead>
        </table>

        <div className="accordion mt-2" id="accordionExample">
          {data.financialRatioFieldsGroups.map((tab, tabIndex) => (
            <div className="accordion-item" key={tabIndex}>
              <h2 className="accordion-header" id={`flush-heading${tabIndex}`}>
                <button
                  className={`accordion-button ${
                    i18n.language === "ar" ? "accordion-button-ar" : ""
                  } acc-title`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapse${tabIndex}`}
                  aria-expanded="true"
                  aria-controls={`flush-collapse${tabIndex}`}
                >
                  {i18n.language === "en" ? tab.fieldGroupEn : tab.fieldGroupAr}
                </button>
              </h2>
              <div
                id={`flush-collapse${tabIndex}`}
                className={`accordion-collapse collapse ${
                  tabIndex === 0 ? "show" : ""
                }`}
                aria-labelledby={`flush-heading${tabIndex}`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <table className="table">
                    <tbody>
                      {tab.financialRatioFieldsGroupFields.map(
                        (field, fieldIndex) => (
                          <tr key={fieldIndex}>
                            <td className="details-td">
                              {i18n.language === "en"
                                ? field.nameEn
                                : field.nameAr}
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-light"
                                data-bs-toggle="modal"
                                data-bs-target="#financialModal"
                                onClick={() => handleItemClick(field)}
                                disabled={field.values
                                  .slice(0, 5)
                                  .every(
                                    (value) =>
                                      value.value === null || isNaN(value.value)
                                  )}
                              >
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 16 16"
                                  type="button"
                                  className="icons-color"
                                  height="0.8em"
                                  width="0.8em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"></path>
                                </svg>
                              </button>
                            </td>
                            {field.values
                              .slice(0, 5)
                              .map((value, valueIndex) => (
                                <td
                                  key={valueIndex}
                                  style={{
                                    color:
                                      value.value === null || value.value === 0
                                        ? null
                                        : value.value < 0
                                        ? "red"
                                        : "green",
                                  }}
                                >
                                  {value.value === null || isNaN(value.value)
                                    ? "-"
                                    : formatChange(
                                        currency === "USD"
                                          ? value.value / conversionRate
                                          : value.value
                                      )}
                                </td>
                              ))}
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*Modal */}
      <div
        className="modal fade"
        id="financialModal"
        tabIndex="-1"
        aria-labelledby="financialModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                X
              </button>
            </div>
            <div className="modal-body">
              <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
          </div>
        </div>
      </div>
      {/* End Modal */}
    </>
  );
};

export default FinancialRatios;

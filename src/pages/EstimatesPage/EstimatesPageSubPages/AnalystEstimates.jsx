import React from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState } from "react";
const AnalystEstimates = ({ data, periodType, setPeriodType }) => {
  const { t, i18n } = useTranslation();

  const [dropdownValue, setDropdownValue] = useState(
    t("estimates.analystEstimates.annual")
  );

  const [currency, setCurrency] = useState("SAR");

  const estimatesArray = Array.isArray(data.tabs) ? data.tabs : [data.tabs];

  const convertCurrency = (value) => {
    return currency === "USD" ? (value / 3.751).toFixed(2) : value.toFixed(2);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
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

        <div className="d-flex m-0 rounded px-1">
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
      <div className="accordion mt-3" id="accordionExample">
        {estimatesArray.map((category, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${
                  i18n.language === "ar" ? "accordion-button-ar" : ""
                } acc-title`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded="true"
                aria-controls={`collapse${index}`}
              >
                {i18n.language === "ar"
                  ? category.fsFieldCategoryNameAr
                  : category.fsFieldCategoryNameEn}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <table className="table">
                  <thead className="table-light">
                    <tr>
                      <th>{t("estimates.analystEstimates.details")}</th>
                      {category.fieldsValues[0].periodValues.map(
                        (period, index) => (
                          <th key={index}>
                            {periodType === "year"
                              ? `${period.forYear}`
                              : `${period.fiscalPeriodValue} ${period.forYear}`}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {category.fieldsValues.map((field, fieldIndex) => (
                      <tr key={fieldIndex}>
                        <td className="field-name">
                          {i18n.language === "ar"
                            ? field.fsFieldNameAr
                            : field.fsFieldNameEn}
                        </td>
                        {field.periodValues.map((value, valIndex) => {
                          const displayValue =
                            value.actualValue !== null
                              ? convertCurrency(value.actualValue)
                              : "-";
                          const isPositive = parseFloat(displayValue) >= 0;
                          const formattedValue = isPositive
                            ? displayValue
                            : `(${Math.abs(displayValue)})`;
                          return (
                            <td
                              key={valIndex}
                              style={{ color: isPositive ? "green" : "red" }}
                            >
                              {formattedValue}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalystEstimates;
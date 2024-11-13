import axios from "axios";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../../services/getToken";
const FinantialStatements = () => {
  const { t, i18n } = useTranslation();
  const [currency, setCurrency] = useState("SAR");
  const [periodType, setPeriodType] = useState("year");
  const [dropdownValue, setDropdownValue] = useState(
    t("estimates.analystEstimates.annual")
  );

  const { data } = useQuery({
    queryKey: ["FinantialStatements"],
    queryFn: async () => {
      // Ensure token is valid
      const token = await getToken();

      if (!token) {
        throw new Error("Unable to authenticate");
      }
      // Get Overview Data
      const res = await axios.get(
        `https://data.argaam.com/api/v1.0/json/ir-api/financial-statements/:lang?fiscalPeriodType=${periodType}`,
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

  return (
    <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
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
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic" className="px-3">
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
  );
};

export default FinantialStatements;

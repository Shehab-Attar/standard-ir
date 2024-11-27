//PieCharts is not done yet

import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../services/getToken";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./BusinessSegmentsPage.css";

// Sub Sections
import SegmentDistribution from "./BusinessSegmentsSubSections/SegmentDistribution";
import FinancialData from "./BusinessSegmentsSubSections/FinancialData";

const BusinessSegmentsPage = () => {
  const { t } = useTranslation();
  const [currency, setCurrency] = useState("SAR");
  const [periodType, setPeriodType] = useState("year");
  const [dropdownValue, setDropdownValue] = useState(
    t("estimates.analystEstimates.annual")
  );

  const { data, isLoading } = useQuery({
    queryKey: ["businessSegmentsPageData", periodType],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("Unable to authenticate");
      }
      const res = await axios.get(
        `https://data.argaam.com/api/v1/json/ir-api/business-segments?fiscalPeriodType=${periodType}`,
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

  return (
    <div className="container-lg">
      <SegmentDistribution data={data} />
      <div className="d-flex justify-content-between align-items-center mb-3">
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
      <FinancialData
        data={data}
        currency={currency}
        fieldName="Sales"
        titleKey="businessSegments.sales"
      />
      <FinancialData
        data={data}
        currency={currency}
        fieldName="Total Income"
        titleKey="businessSegments.totalIncome"
      />
      <FinancialData
        data={data}
        currency={currency}
        fieldName="IS Net Income"
        titleKey="businessSegments.isNetIncome"
      />
      <FinancialData
        data={data}
        currency={currency}
        fieldName="Total Assets"
        titleKey="businessSegments.totalAssets"
      />
      <FinancialData
        data={data}
        currency={currency}
        fieldName="Total Liabilities"
        titleKey="businessSegments.totalLiabilities"
      />
    </div>
  );
};

export default BusinessSegmentsPage;

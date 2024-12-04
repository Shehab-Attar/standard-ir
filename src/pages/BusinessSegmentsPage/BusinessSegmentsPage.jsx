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
  const { t, i18n } = useTranslation();
  const [currency, setCurrency] = useState(t("businessSegments.currencySAR"));
  const [pieData, setPieData] = useState([]);
  const [periodType, setPeriodType] = useState("year");
  const [selectedItem, setSelectedItem] = useState(null);
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

  const handlePieChartClick = () => {
    // Get the values for the selected date from each business segment
    const pieData = data.fsFields
      .find((field) => field.fsFieldID) // Get the current field
      ?.businessSegments.map((segment) => ({
        name:
          i18n.language === "ar"
            ? segment.businessSegmentNameAr
            : segment.businessSegmentNameEn,
        y: segment.periodicValues.find((value) => value.forDate)?.value || 0,
      }))
      .filter((item) => item.y !== null && item.y !== 0);

    setPieData(pieData);
  };

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
            onClick={() => setCurrency(t("businessSegments.currencySAR"))}
            className={`btn rounded CurrBtn ${
              currency === t("businessSegments.currencySAR") ? "active" : ""
            }`}
          >
            {t("estimates.analystEstimates.currSAR")}
          </button>
          <button
            onClick={() => setCurrency(t("businessSegments.currencyUSD"))}
            className={`btn rounded CurrBtn ${
              currency === t("businessSegments.currencyUSD") ? "active" : ""
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
        selectedItem={selectedItem}
        onItemClick={setSelectedItem}
        handlePieChartClick={handlePieChartClick}
        pieData={pieData}
      />
      <FinancialData
        data={data}
        currency={currency}
        fieldName="Total Income"
        titleKey="businessSegments.totalIncome"
        selectedItem={selectedItem}
        onItemClick={setSelectedItem}
        handlePieChartClick={handlePieChartClick}
        pieData={pieData}
      />
      <FinancialData
        data={data}
        currency={currency}
        fieldName="IS Net Income"
        titleKey="businessSegments.isNetIncome"
        selectedItem={selectedItem}
        onItemClick={setSelectedItem}
        handlePieChartClick={handlePieChartClick}
        pieData={pieData}
      />
      <FinancialData
        data={data}
        currency={currency}
        fieldName="Total Assets"
        titleKey="businessSegments.totalAssets"
        selectedItem={selectedItem}
        onItemClick={setSelectedItem}
        handlePieChartClick={handlePieChartClick}
        pieData={pieData}
      />
      <FinancialData
        data={data}
        currency={currency}
        fieldName="Total Liabilities"
        titleKey="businessSegments.totalLiabilities"
        selectedItem={selectedItem}
        onItemClick={setSelectedItem}
        handlePieChartClick={handlePieChartClick}
        pieData={pieData}
      />
    </div>
  );
};

export default BusinessSegmentsPage;

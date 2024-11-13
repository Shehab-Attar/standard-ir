import { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatChange } from "../../../utils/Helpers";
import ModalComponent from "../../../components/Modal";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.css";

const FinancialData = ({ data, currency, fieldName, titleKey }) => {
  const { t, i18n } = useTranslation();
  const [modal, setModal] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [showPieChart, setShowPieChart] = useState(false);
  const [pieData, setPieData] = useState(null);

  const toggleModal = (item, isPieChart = false) => {
    setSelectedField(item);
    setShowPieChart(isPieChart);

    if (isPieChart && item && item.periodicValues) {
      const yearlyValues = fieldArray.map((item) =>
        item.periodicValues.filter((value) => value.forDate === "2022")
      );
      setPieData(yearlyValues);
    }

    setModal(true);
  };

  const closeModal = () => setModal(false);

  // Check if data and data.fsFields are defined
  const fieldData = data?.fsFields?.find(
    (item) => item.fsFieldNameEn === fieldName
  );
  const fieldArray = fieldData ? fieldData.businessSegments : [];

  // Extract all years
  const years =
    fieldArray[0]?.periodicValues?.map((item) => item.forDate) || [];

  const conversionRate = 3.751; // Conversion rate from SAR to USD

  return (
    <>
      <div>
        <h5 className="header-title">{t(titleKey)}</h5>
        <SimpleBar style={{ maxHeight: "400px", overflowX: "auto" }}>
          <table className="table table-hover" style={{ minWidth: "800px" }}>
            <thead className="table-light">
              <tr>
                <th>{t("businessSegments.fiscalPeriod")}</th>
                <th>{t("businessSegments.chart")}</th>
                {years.map((year) => (
                  <th key={year}>{year}</th>
                ))}
              </tr>
              <tr>
                <th></th>
                <th></th>
                {years.map((year) => (
                  <th key={year}>{currency}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fieldArray.map((item) => (
                <tr key={item.businessSegmentNameEn}>
                  <th>
                    {i18n.language === "ar"
                      ? item.businessSegmentNameAr
                      : item.businessSegmentNameEn}
                  </th>
                  <td>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => toggleModal(item)}
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
                  {item.periodicValues.map((value) => (
                    <td
                      key={value.forDate}
                      style={{
                        color:
                          value.value === null || value.value === 0
                            ? null
                            : value.value < 0
                            ? "red"
                            : "green",
                      }}
                    >
                      {value.value === null
                        ? "-"
                        : formatChange(
                            currency === "USD"
                              ? value.value / conversionRate
                              : value.value
                          )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </SimpleBar>
      </div>
      <ModalComponent
        isVisible={modal}
        closeModal={closeModal}
        selectedField={selectedField}
        conversionRate={conversionRate}
        showPieChart={showPieChart}
        pieData={pieData}
      />
    </>
  );
};

export default FinancialData;

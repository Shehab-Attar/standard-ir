import { useTranslation } from "react-i18next";
import "../ProfilePage.css";
import { formatChange } from "../../../utils/Helpers";
import { useState } from "react";
import ModalComponent from "../../../components/Modal";

const FinancialHighlights = ({ data }) => {
  const { t, i18n } = useTranslation();
  const [modal, setModal] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [isUSD, setIsUSD] = useState(false); // State to track currency display

  const toggleModal = (item) => {
    setSelectedField(item);
    setModal(true);
  };
  const closeModal = () => setModal(false);

  // Extract and sort the years from the data object
  const years = Object.keys(data.financialHighlights[0])
    .filter((key) => !isNaN(key))
    .sort((a, b) => b - a);

  const conversionRate = 3.751; // Conversion rate from SAR to USD

  return (
    <>
      <div className="continer corporate-actions my-3 mx-0 px-0">
        <div className="highlights-header d-flex justify-content-between align-items-center">
          <h6 className="m-0 p-0 mx-2 header-title">
            {isUSD
              ? t("profile.financialHighlights.titleUSD")
              : t("profile.financialHighlights.titleSAR")}
          </h6>
          <div className="buttons-container">
            <button
              className={`btn rounded CurrBtn ${isUSD ? "active" : ""}`}
              aria-pressed={isUSD}
              onClick={() => setIsUSD(true)}
            >
              {t("profile.financialHighlights.usd")}
            </button>
            <button
              className={`btn rounded CurrBtn ${!isUSD ? "active" : ""}`}
              aria-pressed={!isUSD}
              onClick={() => setIsUSD(false)}
            >
              {t("profile.financialHighlights.riyal")}
            </button>
          </div>
        </div>
        <hr className="m-2 mb-0 icons-color" />
        <div className="my-3">
          <div>
            <table className="table table-hover fs-14">
              <thead className="table-light">
                <tr>
                  <th>{t("profile.financialHighlights.description")}</th>
                  <th>{t("profile.financialHighlights.chart")}</th>
                  {years.map((year) => (
                    <th key={year}>{year}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.financialHighlights.map((item) => (
                  <tr key={item.FSFieldName}>
                    <th style={{ width: "20%" }}>
                      {i18n.language === "ar"
                        ? item.DisplayNameAr
                        : item.DisplayNameEn}
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
                    {years.map((year) => (
                      <td
                        key={year}
                        style={{
                          color: item[year] < 0 ? "red" : "green",
                        }}
                      >
                        {formatChange(
                          isUSD ? item[year] / conversionRate : item[year]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalComponent
        isVisible={modal}
        closeModal={closeModal}
        selectedField={selectedField}
        isUSD={isUSD}
        conversionRate={conversionRate}
      />
    </>
  );
};

export default FinancialHighlights;

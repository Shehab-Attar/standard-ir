import { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatChange } from "../../../utils/Helpers";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.css";
import "../ProfilePage.css";

const FinancialHighlights = ({ data }) => {
  const { t, i18n } = useTranslation();
  const [isUSD, setIsUSD] = useState(false);
  const [theItem, setTheItem] = useState(null);

  const conversionRate = 3.751;
  // Extract and sort the years from the data object
  const years = Object.keys(data.financialHighlights[0])
    .slice(0, 5)
    .filter((key) => !isNaN(key))
    .sort((a, b) => b - a);

  const values = theItem
    ? years.map((year) =>
        isUSD ? theItem[year] / conversionRate : theItem[year]
      )
    : [];

  const handleItemClick = (item) => {
    setTheItem(item);
  };

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
      categories: years,
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
        name:
          i18n.language === "ar"
            ? theItem?.DisplayNameAr
            : theItem?.DisplayNameEn,
        data: values,
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
          <SimpleBar style={{ maxHeight: "400px", overflowX: "auto" }}>
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
                          data-bs-toggle="modal"
                          data-bs-target="#financialModal"
                          onClick={() => handleItemClick(item)}
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
          </SimpleBar>
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

export default FinancialHighlights;

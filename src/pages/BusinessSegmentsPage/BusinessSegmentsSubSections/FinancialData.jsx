import { useTranslation } from "react-i18next";
import { formatChange } from "../../../utils/Helpers";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.css";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import PieChart from "../../../components/PieChart";

const FinancialData = ({
  data,
  currency,
  fieldName,
  titleKey,
  selectedItem,
  onItemClick,
  handlePieChartClick,
  pieData,
}) => {
  const { t, i18n } = useTranslation();

  const fieldData = data?.fsFields?.find(
    (item) => item.fsFieldNameEn === fieldName
  );
  const fieldArray = fieldData ? fieldData.businessSegments : [];

  const years =
    fieldArray[0]?.periodicValues?.slice(0, 5).map((item) => item.forDate) ||
    [];

  const conversionRate = 3.751;

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
      categories: selectedItem?.periodicValues
        .slice(0, 5)
        .map((value) => value.forDate),
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
            ? selectedItem?.businessSegmentNameAr
            : selectedItem?.businessSegmentNameEn,
        data: selectedItem?.periodicValues
          .slice(0, 5)
          .map((value) =>
            currency === "USD" ? value.value / conversionRate : value.value
          ),
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
        <h5 className="header-title">{t(titleKey)}</h5>
        <SimpleBar style={{ maxHeight: "400px", overflowX: "auto" }}>
          <table
            className="table table-hover financial-data-table"
            style={{ minWidth: "800px" }}
          >
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
              <tr>
                <th></th>
                <th></th>
                {years.map((year) => (
                  <th
                    key={year}
                    onClick={() => handlePieChartClick(selectedItem)}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#pieModal"
                      className="icons-color mx-3"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z"
                        clipRule="evenodd"
                      ></path>
                      <path
                        fillRule="evenodd"
                        d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </th>
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
                      data-bs-toggle="modal"
                      data-bs-target="#financialModal"
                      onClick={() => onItemClick(item)}
                      disabled={item.periodicValues
                        .slice(0, 5)
                        .every(
                          (value) => value.value === null || isNaN(value.value)
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
                  {item.periodicValues.slice(0, 5).map((value) => (
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
      {/*Normal Modal */}
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
      {/* End Normal Modal */}
      {/* Pie Modal */}
      <div
        className="modal fade"
        id="pieModal"
        tabIndex="-1"
        aria-labelledby="pieModalLabel"
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
              <PieChart pieData={pieData} />
            </div>
          </div>
        </div>
      </div>
      {/* End Pie Modal */}
    </>
  );
};

export default FinancialData;

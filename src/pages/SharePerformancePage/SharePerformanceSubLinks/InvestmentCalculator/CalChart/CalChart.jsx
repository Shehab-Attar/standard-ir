import { useTranslation } from "react-i18next";
import CumulativeChart from "./CumulativeChart";
import PeriodicChart from "./PeriodicChart";

const CalChart = ({ startDate, endDate, amount, shares }) => {
  const { t } = useTranslation();
  return (
    <div className="m-0 p-0">
      <div className="row justify-content-between g-0">
        <div>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="d-flex justify-content-evenly" role="presentation">
              <button
                className="nav-link active rounded-0 fs-14"
                id="cumulative-tab"
                data-bs-toggle="tab"
                data-bs-target="#cumulative-pane"
                type="button"
                role="tab"
                aria-controls="cumulative-pane"
                aria-selected="true"
              >
                {t("sharePerformance.investment_calculator.cumulative")}
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link rounded-0 fs-14"
                id="periodic-tab"
                data-bs-toggle="tab"
                data-bs-target="#periodic-pane"
                type="button"
                role="tab"
                aria-controls="periodic-pane"
                aria-selected="false"
              >
                {t("sharePerformance.investment_calculator.periodic")}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show m-0 border pb-0 active"
          id="cumulative-pane"
          role="tabpanel"
          aria-labelledby="cumulative-tab"
        >
          <CumulativeChart
            startDate={startDate}
            endDate={endDate}
            amount={amount}
            shares={shares}
          />
        </div>
        <div
          className="tab-pane fade"
          id="periodic-pane"
          role="tabpanel"
          aria-labelledby="periodic-tab"
        >
          <PeriodicChart
            startDate={startDate}
            endDate={endDate}
            amount={amount}
            shares={shares}
          />
        </div>
      </div>
    </div>
  );
};

export default CalChart;

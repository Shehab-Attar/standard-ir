// Cumulative and Periodic Charts are not working yet

import { useState } from "react";
import { useTranslation } from "react-i18next";
import ByAmount from "./CalculatorCharts/ByAmount";
import ByShares from "./CalculatorCharts/ByShares";
import "./InvestmentCalculator.css";

const InvestmentCalculator = () => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [shares, setShares] = useState(0);

  return (
    <div className="container-lg my-1 mt-2">
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="d-flex justify-content-evenly " role="presentation">
            <button
              className="nav-link active rounded-0 fs-14"
              id="byAmount-tab"
              data-bs-toggle="tab"
              data-bs-target="#byAmount-pane"
              type="button"
              role="tab"
              aria-controls="byAmount-pane"
              aria-selected="true"
            >
              {t("sharePerformance.investment_calculator.byAmount")}
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link rounded-0 fs-14"
              id="byShares-tab"
              data-bs-toggle="tab"
              data-bs-target="#byShares-pane"
              type="button"
              role="tab"
              aria-controls="byShares-pane"
              aria-selected="false"
            >
              {t("sharePerformance.investment_calculator.byShares")}
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show m-0 border pb-0 active"
            id="byAmount-pane"
            role="tabpanel"
            aria-labelledby="byAmount-tab"
          >
            <ByAmount
              startDate={startDate}
              endDate={endDate}
              amount={amount}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              setAmount={setAmount}
            />
          </div>
          <div
            className="tab-pane fade"
            id="byShares-pane"
            role="tabpanel"
            aria-labelledby="byShares-tab"
          >
            <ByShares
              startDate={startDate}
              endDate={endDate}
              shares={shares}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              setShares={setShares}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator;

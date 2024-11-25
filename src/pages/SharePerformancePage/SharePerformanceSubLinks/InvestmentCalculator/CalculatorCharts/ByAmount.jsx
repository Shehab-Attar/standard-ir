import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getToken } from "../../../../../services/getToken.js";
import { useTranslation } from "react-i18next";
import "../InvestmentCalculator.css";
import CalChart from "../CalChart/CalChart";
const ByAmount = ({
  startDate,
  endDate,
  amount,
  setStartDate,
  setEndDate,
  setAmount,
}) => {
  const { t } = useTranslation();
  const [investmentData, setInvestmentData] = useState(null);

  const fetchInvestmentData = async (fromDate, toDate) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Unable to authenticate");
      }
      const res = await axios.get(
        `https://data.argaam.com/api/v1/json/ir-api/investment-calculator/${amount}/0/${fromDate}/${toDate}/false`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Encoding": "gzip",
          },
        }
      );
      setInvestmentData(res.data || {});
    } catch (error) {
      console.error("Error fetching investment data:", error);
    }
  };

  const handleShowResults = () => {
    const fromDate = startDate.toISOString().split("T")[0];
    const toDate = endDate.toISOString().split("T")[0];
    fetchInvestmentData(fromDate, toDate);
  };

  return (
    <>
      <div className="mb-3 p-3 bg-light d-flex justify-content-between align-items-end flex-wrap">
        <div className="m-2 d-flex flex-column justify-content-start align-items-start">
          <span>{t("sharePerformance.investment_calculator.start-end")}:</span>
          <div className="ant-picker ant-picker-range css-zcfrx9">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="dd/MM/yyyy"
              placeholderText={t("sharePerformance.negotiated_deals.start")}
              className="custom-datepicker"
            />
            <span
              role="img"
              aria-label="swap-right"
              className="anticon anticon-swap-right"
            >
              <svg
                viewBox="0 0 1024 1024"
                focusable="false"
                data-icon="swap-right"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z"></path>
              </svg>
            </span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              dateFormat="dd/MM/yyyy"
              placeholderText={t("sharePerformance.negotiated_deals.end")}
              className="custom-datepicker"
            />
            <span className="ant-picker-suffix mx-3">
              <span
                role="img"
                aria-label="calendar"
                className="anticon anticon-calendar"
              >
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="calendar"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path>
                </svg>
              </span>
            </span>
          </div>
        </div>
        <div className="m-2 d-flex flex-column justify-content-start align-items-start">
          <label htmlFor="amount">
            {t("sharePerformance.investment_calculator.amount")}:
          </label>
          <div className="d-flex">
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <button
          className="result-button rounded border-0 p-1 m-2"
          onClick={handleShowResults}
          disabled={amount <= 0}
        >
          {t("sharePerformance.investment_calculator.result")}
        </button>
      </div>

      {investmentData && (
        <div className="row container-lg gap-4 justify-content-between p-0 m-0 flex-grow-1">
          <div className="col-lg-5 p-2 rounded mx-2">
            <h5>
              {t("sharePerformance.investment_calculator.initialInvestment")}(
              <span className="text-dark">
                {new Date(investmentData.investmentDate).toLocaleDateString()}
              </span>
              )
            </h5>
            <hr className="my-1" />
            <table className="table table-hover">
              <tbody>
                <tr>
                  <td>{t("sharePerformance.investment_calculator.value")}</td>
                  <td>{investmentData.amountInvested.toFixed(2) || "-"}</td>
                </tr>
                <tr>
                  <td>
                    {t("sharePerformance.investment_calculator.sharesPrice")}
                  </td>
                  <td>{investmentData.initialSharePrice.toFixed(2) || "-"}</td>
                </tr>
                <tr>
                  <td>
                    {t("sharePerformance.investment_calculator.sharesBought")}
                  </td>
                  <td>{investmentData.sharesBought || "-"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-lg-5 p-2 rounded mx-2">
            <h5>
              {t("sharePerformance.investment_calculator.endValue")}(
              <span className="text-dark">
                {new Date(investmentData.endsDate).toLocaleDateString()}
              </span>
              )
            </h5>
            <hr className="my-1" />
            <table className="table table-hover">
              <tbody>
                <tr>
                  <td>{t("sharePerformance.investment_calculator.value")}</td>
                  <td>{investmentData.currentStanding.toFixed(2) || "-"}</td>
                </tr>
                <tr>
                  <td>
                    {t("sharePerformance.investment_calculator.sharesPrice")}
                  </td>
                  <td>{investmentData.endsSharePrice.toFixed(2) || "-"}</td>
                </tr>
                <tr>
                  <td>{t("sharePerformance.investment_calculator.change")}</td>
                  <td>{investmentData.changeAmount.toFixed(2) || "-"}</td>
                </tr>
                <tr>
                  <td>
                    {t(
                      "sharePerformance.investment_calculator.changePercentage"
                    )}
                  </td>
                  <td>
                    {investmentData.changeAmountPercentage.toFixed(2) || "-"}%
                  </td>
                </tr>
                <tr>
                  <td>
                    {t(
                      "sharePerformance.investment_calculator.annualizedChange"
                    )}
                  </td>
                  <td>
                    {investmentData.changeAnnualizePercentage.toFixed(2) || "-"}
                    %
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <CalChart
            startDate={startDate}
            endDate={endDate}
            amount={amount}
            shares={investmentData.sharesBought}
          />
        </div>
      )}
    </>
  );
};

export default ByAmount;

import React from "react";
import { useTranslation } from "react-i18next";
import { formatChange } from "../../../utils/Helpers";
import "../ProfilePage.css";
const TradingData = ({ data }) => {
  const { t, i18n } = useTranslation();
  const tradingDataArray = Array.isArray(data.tradingData)
    ? data.tradingData
    : [data.tradingData];

  const getMonthName = (monthNumber) => {
    return new Intl.DateTimeFormat(i18n.language === "ar" ? "ar" : "en", {
      month: "long",
    }).format(new Date(2021, monthNumber - 1));
  };

  return (
    <div className="flex-grow-1">
      <div className="continer my-1">
        <h6 className="header-title mx-2">
          {t("profile.tradingData.tradingTitle")}
        </h6>
        <hr className="m-2 mb-0 icons-color" />
      </div>
      <div className="container-lg my-3 table-responsive">
        <table className="table table-hover">
          <tbody>
            {tradingDataArray.map((item, index) => (
              <React.Fragment key={index}>
                <tr>
                  <th>{t("profile.tradingData.market")}:</th>
                  <td>
                    {i18n.language === "ar"
                      ? item.marketNameAr
                      : item.marketNameEn}
                  </td>
                </tr>
                <tr>
                  <th>{t("profile.tradingData.fiscalYearEnd")}:</th>
                  <td>{getMonthName(item.yearEndMonth)}</td>
                </tr>
                <tr>
                  <th>{t("profile.tradingData.freeFloat")}:</th>
                  <td>{item.freeFloatShareValue}</td>
                </tr>
                <tr>
                  <th>{t("profile.tradingData.freeFloatPercentage")}:</th>
                  <td>{formatChange(item.percentage)}</td>
                </tr>
                <tr>
                  <th>{t("profile.tradingData.weightIndex")}:</th>
                  <td>{formatChange(item.companyWeight)}</td>
                </tr>
                <tr>
                  <th>{t("profile.tradingData.3MAvgVolume")}:</th>
                  <td>{formatChange(item.avgVolume3Months)}</td>
                </tr>
                <tr>
                  <th>{t("profile.tradingData.3MAvgTransaction")}:</th>
                  <td>{formatChange(item.avgTransactions3Months)}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradingData;

import React from "react";
import { useTranslation } from "react-i18next";
import { formatChange } from "../../../utils/Helpers";
import MoreButton from "../../../components/MoreButton";
import { useState } from "react";
import "../ProfilePage.css";

const StockInfo = ({ data }) => {
  const { t } = useTranslation();
  const [isUSD, setIsUSD] = useState(true);
  const stockInfoArray = Array.isArray(data.stockInfo)
    ? data.stockInfo
    : [data.stockInfo];

  const conversionRate = 3.751;
  return (
    <div className="flex-grow-1">
      <div className="my-1 mx-0 px-0">
        <div className="highlights-header d-flex justify-content-between align-items-center">
          <h6 className="m-0 p-0 mx-2 header-title">
            {t("profile.stockInformation.stockTitle")}
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
        <div className="container-lg my-3 table-responsive">
          <table className="table table-hover my-2 fs-14">
            <tbody>
              {stockInfoArray.map((item, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <th>{t("profile.stockInformation.sharesOutstanding")}</th>
                    <td>{item.numberOfShares}</td>
                  </tr>
                  <tr>
                    <th>
                      {isUSD
                        ? t("profile.stockInformation.parValueUSD")
                        : t("profile.stockInformation.parValueSAR")}
                    </th>
                    <td>
                      {formatChange(
                        isUSD
                          ? item.nominalValue / conversionRate
                          : item.nominalValue
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      {isUSD
                        ? t("profile.stockInformation.bookValueUSD")
                        : t("profile.stockInformation.bookValueSAR")}
                    </th>
                    <td>
                      {formatChange(
                        isUSD ? item.bookValue / conversionRate : item.bookValue
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>{t("profile.stockInformation.marketValue")}</th>
                    <td>{formatChange(item.marketValue)}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <MoreButton path="financial-information" />
        </div>
      </div>
    </div>
  );
};

export default StockInfo;

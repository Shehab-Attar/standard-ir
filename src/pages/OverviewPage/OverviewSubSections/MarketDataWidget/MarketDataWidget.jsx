import React from "react";
import "./MarketDataWidget.css";
import { formatChange } from "../../../../utils/Helpers";
import { useTranslation } from "react-i18next";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.css";

const MarketDataWidget = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className="border border-top-0">
      <h6 className="p-2 main-title">{t("overview.market_data.title")}</h6>
      <hr className="m-2 mb-0 icons-color" />
      <div className="container-lg">
        <SimpleBar style={{ maxHeight: "600px", overflowX: "auto" }}>
          <table className="table table-hover fs-14 mb-0">
            <tbody>
              <tr>
                <th>{t("overview.market_data.last_trade")}:</th>
                <td>{data.companyStockSummary.closeValue}</td>
                <th>{t("overview.market_data.volume")}:</th>
                <td>{data.companyStockSummary.volume.toLocaleString()}</td>
              </tr>
              <tr>
                <th>{t("overview.market_data.change")}:</th>
                <td
                  style={{
                    color:
                      data.companyStockSummary.change < 0 ? "red" : "green",
                  }}
                >
                  {formatChange(data.companyStockSummary.change)}
                </td>
                <th>{t("overview.market_data.turnover")}:</th>
                <td>{data.companyStockSummary.amount.toLocaleString()}</td>
              </tr>
              <tr>
                <th>{t("overview.market_data.change_percent")}:</th>
                <td
                  style={{
                    color:
                      data.companyStockSummary.percentageChange < 0
                        ? "red"
                        : "green",
                  }}
                >
                  {formatChange(data.companyStockSummary.percentageChange)}
                </td>
                <th>{t("overview.market_data.transactions")}:</th>
                <td>{data.companyStockSummary.contractCount}</td>
              </tr>
              <tr>
                <th>{t("overview.market_data.open")}:</th>
                <td>{data.companyStockSummary.openValue}</td>
                <th>{t("overview.market_data.market_value")}:</th>
                <td>{data.companyStockSummary.marketValue.toLocaleString()}</td>
              </tr>
              <tr>
                <th>{t("overview.market_data.low")}:</th>
                <td>{data.companyStockSummary.low}</td>
                <th>{t("overview.market_data.avg_volume_3m")}:</th>
                <td>
                  {data.companyStockSummary.avgVolume3Months.toLocaleString()}
                </td>
              </tr>
              <tr>
                <th>{t("overview.market_data.high")}:</th>
                <td>{data.companyStockSummary.high}</td>
                <th>{t("overview.market_data.avg_turnover_3m")}:</th>
                <td>
                  {data.companyStockSummary.avgTurnover3Months.toLocaleString()}
                </td>
              </tr>
              <tr>
                <th>{t("overview.market_data.prev_close")}:</th>
                <td>{data.companyStockSummary.previousCloseValue}</td>
                <th>{t("overview.market_data.avg_transactions_3m")}:</th>
                <td>
                  {data.companyStockSummary.avgTransactions3Months.toFixed(2)}
                </td>
              </tr>
              <tr>
                <th>{t("overview.market_data.change_3m")}:</th>
                <td
                  style={{
                    color:
                      data.companyStockSummary.month3Change < 0
                        ? "red"
                        : "green",
                  }}
                >
                  {formatChange(data.companyStockSummary.month3Change)}%
                </td>
                <th>{t("overview.market_data.change_12m")}:</th>
                <td
                  style={{
                    color:
                      data.companyStockSummary.month6Change < 0
                        ? "red"
                        : "green",
                  }}
                >
                  {formatChange(data.companyStockSummary.month6Change)}%
                </td>
              </tr>
              <tr>
                <th>{t("overview.market_data.change_6m")}:</th>
                <td
                  style={{
                    color:
                      data.companyStockSummary.month6Change < 0
                        ? "red"
                        : "green",
                  }}
                >
                  {formatChange(data.companyStockSummary.month6Change)}%
                </td>
                <th>{t("overview.market_data.ytd")}:</th>
                <td
                  style={{
                    color:
                      data.companyStockSummary.ytdChange < 0 ? "red" : "green",
                  }}
                >
                  {formatChange(data.companyStockSummary.ytdChange)}%
                </td>
              </tr>
            </tbody>
          </table>
        </SimpleBar>
      </div>
    </div>
  );
};

export default MarketDataWidget;

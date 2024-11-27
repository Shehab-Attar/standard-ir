import React from "react";
import { useTranslation } from "react-i18next";
import MoreButton from "../../../../components/MoreButton";
import "./CorporateActionsWidget.css";

const CorporateActionsWidget = ({ data }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="border border-top-0">
      <h6 className="p-2 main-title">{t("sidebar.corporate_actions")}</h6>
      <hr className="m-2 mb-0 icons-color" />
      <div className="container-lg mt-3">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="d-flex justify-content-evenly " role="presentation">
            <button
              className="nav-link active rounded-0 fs-14"
              id="changes"
              data-bs-toggle="tab"
              data-bs-target="#changes-pane"
              type="button"
              role="tab"
              aria-controls="changes-pane"
              aria-selected="true"
            >
              {t("overview.corporate_actions.recent_changes")}
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link rounded-0 fs-14"
              id="dividends-tab"
              data-bs-toggle="tab"
              data-bs-target="#dividends-pane"
              type="button"
              role="tab"
              aria-controls="dividends-pane"
              aria-selected="false"
            >
              {t("overview.corporate_actions.recent_dividends")}
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="changes-pane"
            role="tabpanel"
            aria-labelledby="changes-tab"
          >
            <table className="table table-hover fs-14 mb-0">
              <tbody>
                <tr>
                  <th>{t("overview.corporate_actions.previous_capital")}</th>
                  <td className="corp-td">
                    {data.cpaitalSummary.currentCapital}{" "}
                    {i18n.language === "ar"
                      ? data.cpaitalSummary.currencyNameAr
                      : data.cpaitalSummary.currencyNameEn}
                  </td>
                </tr>
                <tr>
                  <th>
                    {t("overview.corporate_actions.previous_no_of_shares")}
                  </th>
                  <td className="corp-td">
                    {data.cpaitalSummary.currentShares}{" "}
                    {i18n.language === "ar"
                      ? data.cpaitalSummary.currencyNameAr
                      : data.cpaitalSummary.currencyNameEn}
                  </td>
                </tr>
                <tr>
                  <th>{t("overview.corporate_actions.capital_change")}</th>
                  <td className="corp-td">
                    {Math.abs(
                      ((data.cpaitalSummary.newCapital -
                        data.cpaitalSummary.currentCapital) /
                        data.cpaitalSummary.currentCapital) *
                        100
                    ).toFixed(2)}
                    %
                  </td>
                </tr>
                <tr>
                  <th>
                    {t("overview.corporate_actions.current_capital")}{" "}
                    {t(
                      "overview.corporate_actions.current_capital_currency_sar"
                    )}
                  </th>
                  <td className="corp-td">{data.cpaitalSummary.newCapital}</td>
                </tr>
                <tr>
                  <th>
                    {t("overview.corporate_actions.current_no_of_shares")}{" "}
                    {t("overview.corporate_actions.current_capital_currency")}
                  </th>
                  <td className="corp-td">{data.cpaitalSummary.newShares}</td>
                </tr>
                <tr>
                  <th>{t("overview.corporate_actions.type")}</th>
                  <td className="corp-td">
                    {i18n.language === "ar"
                      ? data.cpaitalSummary.companyCapitalStatusNameAr
                      : data.cpaitalSummary.companyCapitalStatusNameEn}
                  </td>
                </tr>
                <tr>
                  <th>{t("overview.corporate_actions.announcement")}</th>
                  <td className="corp-td">
                    {new Date(
                      data.cpaitalSummary.announcedDate
                    ).toLocaleDateString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            className="tab-pane fade"
            id="dividends-pane"
            role="tabpanel"
            aria-labelledby="dividends-tab"
          >
            <table className="table table-hover fs-14 mb-0">
              <tbody>
                <tr>
                  <th>
                    {t("overview.corporate_actions.current_capital")}{" "}
                    {t(
                      "overview.corporate_actions.current_capital_currency_sar"
                    )}
                  </th>
                  <td className="corp-td">
                    {data?.dividandInfo?.capital?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <th>
                    {t("overview.corporate_actions.shares")}{" "}
                    {i18n.language === "ar"
                      ? t("overview.corporate_actions.current_capital_currency")
                      : null}
                  </th>
                  <td className="corp-td">
                    {data?.dividandInfo?.numberOfShares?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <th>{t("overview.corporate_actions.dividend_percentage")}</th>
                  <td className="corp-td">
                    {data?.dividandInfo?.dividendPercentage?.toFixed(2)}%
                  </td>
                </tr>
                <tr>
                  <th>{t("overview.corporate_actions.cash_dividend")}</th>
                  <td className="corp-td">
                    {data?.dividandInfo?.cashDividend?.toFixed(2)}{" "}
                    {t(
                      "overview.corporate_actions.current_capital_currency_sar"
                    )}
                  </td>
                </tr>
                <tr>
                  <th>{t("overview.corporate_actions.dividend_policy")}</th>
                  <td className="corp-td">
                    {i18n.language === "ar"
                      ? t("overview.corporate_actions.dividend_policy_ar")
                      : data?.dividandInfo?.dividendPolicy}
                  </td>
                </tr>
                <tr>
                  <th>{t("overview.corporate_actions.type")}</th>
                  <td className="corp-td">
                    {i18n.language === "ar"
                      ? data?.dividandInfo?.companyDividendStatusNameAr
                      : data?.dividandInfo?.companyDividendStatusNameEn}
                  </td>
                </tr>
                <tr>
                  <th>{t("overview.corporate_actions.announcement")}</th>
                  <td className="corp-td">
                    {new Date(
                      data?.dividandInfo?.dividendAnnouncedDate
                    ).toLocaleDateString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <MoreButton path="corporate-actions" />
      </div>
    </div>
  );
};

export default CorporateActionsWidget;

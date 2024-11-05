import { useTranslation } from "react-i18next";
import { Fragment } from "react";
const RecentDividends = ({ data }) => {
  const { t, i18n } = useTranslation();

  const recentDividendsArray = Array.isArray(data.recentDividends)
    ? data.recentDividends
    : [data.recentDividends];

  return (
    <div className="row-sections flex-grow-1">
      <h6 className="main-title p-2">
        {t("corporateActions.recentDividends.title")}
      </h6>
      <hr className="m-2 mb-0 icons-color" />
      <div className="container-lg">
        <table className="table fs-14 table-hover">
          <tbody>
            {recentDividendsArray.map((item, index) => (
              <Fragment key={index}>
                <tr>
                  <th>
                    {t("corporateActions.recentDividends.capital")}{" "}
                    {t("corporateActions.capitalChange.M_SAR")}
                  </th>
                  <td>{item.capital ? item.capital : "-"}</td>
                </tr>
                <tr>
                  <th>
                    {t("corporateActions.recentDividends.shares")}{" "}
                    {t("corporateActions.recentDividends.M_N")}
                  </th>
                  <td>{item.numberOfShares}</td>
                </tr>
                <tr>
                  <th>
                    {t("corporateActions.recentDividends.dividend/capital")}
                  </th>
                  <td>{item.dividendPercentage}%</td>
                </tr>
                <tr>
                  <th>{t("corporateActions.recentDividends.cashDividend")}</th>
                  <td>
                    {item.cashDividend}{" "}
                    {i18n.language === "ar"
                      ? item.measuringUnitNameAr
                      : item.measuringUnitNameEn}{" "}
                    {i18n.language === "ar"
                      ? item.currencyNameAr
                      : item.currencyNameEn}
                  </td>
                </tr>
                <tr>
                  <th>{t("corporateActions.recentDividends.type")}</th>
                  <td>
                    {i18n.language === "ar"
                      ? item.companyDividendStatusNameAr
                      : item.companyDividendStatusNameEn}
                  </td>
                </tr>
                <tr>
                  <th>{t("corporateActions.recentDividends.announcedDate")}</th>
                  <td>
                    {new Date(item.dividendAnnouncedDate).toLocaleDateString()}
                  </td>
                </tr>
                <tr>
                  <th>{t("corporateActions.recentDividends.dueDate")}</th>
                  <td>{new Date(item.dividendDueDate).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <th>{t("corporateActions.recentChanges.paymentDate")}</th>
                  <td>{new Date(item.dividendDate).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <th>{t("corporateActions.recentChanges.notes")}</th>
                  <td>
                    {i18n.language === "ar" ? item.notesAr : item.notesEn}
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentDividends;

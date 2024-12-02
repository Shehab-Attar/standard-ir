import { useTranslation } from "react-i18next";
import { Fragment } from "react";
import dayjs from "dayjs";

const RecentChanges = ({ data }) => {
  const { t, i18n } = useTranslation();

  const capitalChangesArray = Array.isArray(data.capitalChanges)
    ? data.capitalChanges
    : [data.capitalChanges];

  return (
    <div className="row-sections">
      <h6 className="main-title p-2">
        {t("corporateActions.recentChanges.title")}
      </h6>
      <hr className="m-2 mb-0 icons-color" />
      <div className="container-lg">
        <table className="table fs-14 table-hover">
          <tbody>
            {capitalChangesArray.map((item, index) => (
              <Fragment key={index}>
                <tr>
                  <th>{t("corporateActions.recentChanges.previousCapital")}</th>
                  <td>
                    {item.currentCapital}{" "}
                    {t("corporateActions.recentChanges.M_Riyal")}
                  </td>
                </tr>
                <tr>
                  <th>
                    {t("corporateActions.recentChanges.previousNoOfShares")}
                  </th>
                  <td>{item.currentShares}</td>
                </tr>
                <tr>
                  <th>{t("corporateActions.recentChanges.capitalChange")}</th>
                  <td>{item.bonusShares}%</td>
                </tr>
                <tr>
                  <th>{t("corporateActions.recentChanges.currentCapital")}</th>
                  <td>{item.newCapital}</td>
                </tr>
                <tr>
                  <th>
                    {t("corporateActions.recentChanges.currentNoOfShares")}
                  </th>
                  <td>{item.newShares}</td>
                </tr>
                <tr>
                  <th>{t("corporateActions.recentChanges.type")}</th>
                  <td>
                    {i18n.language === "ar"
                      ? item.companyCapitalStatusNameAr
                      : item.companyCapitalStatusNameEn}
                  </td>
                </tr>
                <tr>
                  <th>{t("corporateActions.recentChanges.announcedDate")}</th>
                  <td>{dayjs(item.announcedDate).format("DD/MM/YYYY")}</td>
                </tr>
                <tr>
                  <th>{t("corporateActions.recentChanges.exDividend")}</th>
                  <td>{dayjs(item.dueDate).format("DD/MM/YYYY")}</td>
                </tr>
                <tr>
                  <th>{t("corporateActions.recentChanges.paymentDate")}</th>
                  <td>{dayjs(item.splitDate).format("DD/MM/YYYY")}</td>
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

export default RecentChanges;

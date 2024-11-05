import { useTranslation } from "react-i18next";
import { formatChange } from "../../../utils/Helpers";
import { useEffect, Fragment } from "react";
import { Tooltip } from "bootstrap";

const CapitalDividendHistory = ({ data }) => {
  const { t, i18n } = useTranslation();
  const capitalDividendHistoryArray = Array.isArray(data.capitalDividendHistory)
    ? data.capitalDividendHistory
    : [data.capitalDividendHistory];

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new Tooltip(tooltipTriggerEl, { container: "body" });
    });
  }, []);

  return (
    <div>
      <h6 className="main-title p-2">
        {t("corporateActions.capitalDividendHistory.title")}
      </h6>
      <div>
        <table className="table table-bordered table-hover text-center">
          <thead className="table-light">
            <tr>
              <th>
                {t("corporateActions.capitalDividendHistory.announcement")}
              </th>
              <th>{t("corporateActions.capitalDividendHistory.exDividend")}</th>
              <th>{t("corporateActions.capitalDividendHistory.payment")}</th>
              <th>
                {t("corporateActions.capitalDividendHistory.dividendsRiyal")}
              </th>
              <th>{t("corporateActions.capitalDividendHistory.dividends")}</th>
              <th>{t("corporateActions.capitalDividendHistory.notes")}</th>
            </tr>
          </thead>
          <tbody>
            {capitalDividendHistoryArray.map((item, index) => (
              <Fragment key={index}>
                <tr>
                  <td>
                    {new Date(item.dividendAnnouncedDate).toLocaleDateString()}
                  </td>
                  <td>{new Date(item.dividendDueDate).toLocaleDateString()}</td>
                  <td>{new Date(item.dividendDate).toLocaleDateString()}</td>
                  <td>{item.cashDividend}</td>
                  <td>{formatChange(item.cashDividendPerShare)}</td>
                  <td
                    data-bs-toggle="tooltip"
                    title={i18n.language === "ar" ? item.notesAr : item.notesEn}
                  >
                    {(i18n.language === "ar" && item.notesAr) ||
                    (i18n.language === "en" && item.notesEn) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-card-text"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                        <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
                      </svg>
                    ) : (
                      "-"
                    )}
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

export default CapitalDividendHistory;

import { useTranslation } from "react-i18next";
import { formatChange } from "../../../utils/Helpers";
import { useEffect } from "react";
import { Tooltip } from "bootstrap";

const CapitalChangeHistory = ({ data }) => {
  const { t, i18n } = useTranslation();
  const capitalChangesArray = Array.isArray(data.capitalChangeHistory)
    ? data.capitalChangeHistory
    : [data.capitalChangeHistory];

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
        {t("corporateActions.capitalChange.title")}
      </h6>
      <table className="table table-bordered table-hover text-center">
        <thead className="table-light">
          <tr>
            <th rowSpan={2}>{t("corporateActions.capitalChange.date")}</th>
            <th rowSpan={2}>{t("corporateActions.capitalChange.type")}</th>
            <th colSpan={2} className="fw-bolder">
              {t("corporateActions.capitalChange.before")}
            </th>
            <th colSpan={2} className="fw-bolder">
              {t("corporateActions.capitalChange.after")}
            </th>
            <th rowSpan={2}>{t("corporateActions.capitalChange.change")} %</th>
            <th rowSpan={2}>{t("corporateActions.capitalChange.notes")}</th>
            <th rowSpan={2}>{t("corporateActions.capitalChange.link")}</th>
          </tr>
          <tr>
            <th rowSpan={2}>
              {t("corporateActions.capitalChange.capital")}{" "}
              {t("corporateActions.capitalChange.M_SAR")}
            </th>
            <th rowSpan={2}>
              {t("corporateActions.capitalChange.shares")}{" "}
              {t("corporateActions.capitalChange.M")}
            </th>
            <th rowSpan={2}>
              {t("corporateActions.capitalChange.capital")}{" "}
              {t("corporateActions.capitalChange.M_SAR")}
            </th>
            <th rowSpan={2}>
              {t("corporateActions.capitalChange.shares")}{" "}
              {t("corporateActions.capitalChange.M")}
            </th>
          </tr>
        </thead>
        <tbody>
          {capitalChangesArray.map((item) => (
            <tr key={item.tableDate}>
              <td>{new Date(item.tableDate).toLocaleDateString()}</td>
              <td>{i18n.language === "ar" ? item.typeAr : item.typeEn}</td>
              <td>{item.currentCapital}</td>
              <td>{item.currentShares}</td>
              <td>{item.newCapital}</td>
              <td>{item.newShares}</td>
              <td>
                {((item.newCapital - item.currentCapital) /
                  item.currentCapital) *
                  100 <
                0
                  ? `(${formatChange(
                      ((item.newCapital - item.currentCapital) /
                        item.currentCapital) *
                        100
                    )}%)`
                  : `${formatChange(
                      ((item.newCapital - item.currentCapital) /
                        item.currentCapital) *
                        100
                    )}%`}
              </td>
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
              <td>
                <a
                  href={i18n.language === "ar" ? item.linkAr : item.linkEn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {(i18n.language === "ar" && item.linkAr) ||
                  (i18n.language === "en" && item.linkEn) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-link-45deg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                      <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
                    </svg>
                  ) : (
                    " "
                  )}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CapitalChangeHistory;

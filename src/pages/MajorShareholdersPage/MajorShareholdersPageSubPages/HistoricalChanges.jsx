import { useTranslation } from "react-i18next";
import { formatChange } from "../../../utils/Helpers";
import dayjs from "dayjs";

const HistoricalChanges = ({ data }) => {
  const { t, i18n } = useTranslation();

  const historicalChangesArray = Array.isArray(data.shareholdersHistory)
    ? data.shareholdersHistory
    : [data.shareholdersHistory];
  return (
    <>
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>{t("major_shareholders.historical.date")}</th>
            <th>{t("major_shareholders.historical.shareholder")}</th>
            <th>{t("major_shareholders.historical.prevHolding")}</th>
            <th>{t("major_shareholders.historical.newHolding")}</th>
            <th>{t("major_shareholders.historical.change")}</th>
            <th>{t("major_shareholders.historical.notes")}</th>
          </tr>
        </thead>
        <tbody>
          {historicalChangesArray.map((historicalChange, index) => (
            <tr key={index}>
              <td>{dayjs(historicalChange.forDate).format("DD/MM/YYYY")}</td>
              <td>
                {i18n.language === "ar"
                  ? historicalChange.shareholderNameAr
                  : historicalChange.shareholderNameEn}
              </td>
              <td
                style={{
                  color: historicalChange.previousPercentage <= 5 ? "red" : "",
                }}
              >
                {historicalChange.previousPercentage > 5
                  ? historicalChange.previousPercentage + "%"
                  : t("major_shareholders.historical.lessThan5")}
              </td>
              <td
                style={{
                  color: historicalChange.percentage <= 5 ? "red" : "",
                }}
              >
                {historicalChange.percentage > 5
                  ? historicalChange.percentage + "%"
                  : t("major_shareholders.historical.lessThan5")}
              </td>
              <td
                style={{
                  color:
                    historicalChange.percentageChange < 0 ? "red" : "green",
                }}
              >
                {historicalChange.percentageChange < 0
                  ? "(" + formatChange(historicalChange.percentageChange) + "%)"
                  : "-"}
              </td>
              <td>{historicalChange.notes ? historicalChange.notes : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default HistoricalChanges;

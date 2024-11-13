import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getToken } from "../../services/getToken.js";
import { formatChange } from "../../utils/Helpers.js";
import "./MajorShareholdersPage.css";

const MajorShareholdersPage = () => {
  const { t, i18n } = useTranslation();

  // == Get Major Shareholders Data
  const { data, isLoading } = useQuery({
    queryKey: ["MajorPageData"],
    queryFn: async () => {
      // Ensure token is valid
      const token = await getToken();

      if (!token) {
        throw new Error("Unable to authenticate");
      }

      // Get profile Data
      const res = await axios.get(
        `https://data.argaam.com/api/v1.0/json/ir-api/major-shareholders/${i18n.language}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Encoding": "gzip",
          },
        }
      );
      return res.data;
    },
  });
  // == Get Major Shareholders Data

  //isLoading
  if (isLoading) return <div>{t("title.loading")}</div>;
  //isLoading

  const majorShareholderArray = Array.isArray(data.shareholders)
    ? data.shareholders
    : [data.shareholders];

  const foreignOwnershipArray = Array.isArray(data.foreignOwnerships)
    ? data.foreignOwnerships
    : [data.foreignOwnerships];

  const historicalChangesArray = Array.isArray(data.shareholdersHistory)
    ? data.shareholdersHistory
    : [data.shareholdersHistory];

  return (
    <div className="container-lg my-1">
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li
            className="d-flex justify-content-evenly flex-wrap align-items-center mb-3 tabs"
            role="presentation"
          >
            <button
              className="nav-link active rounded-0 fs-14"
              id="majorShareholders"
              data-bs-toggle="tab"
              data-bs-target="#majorShareholders-pane"
              type="button"
              role="tab"
              aria-controls="majorShareholders-pane"
              aria-selected="true"
            >
              {t("major_shareholders.majorShareholders")}
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link rounded-0 fs-14"
              id="historicalChanges-tab"
              data-bs-toggle="tab"
              data-bs-target="#historicalChanges-pane"
              type="button"
              role="tab"
              aria-controls="historicalChanges-pane"
              aria-selected="false"
            >
              {t("major_shareholders.historicalChanges")}
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane active mx-0 border-0"
            id="majorShareholders-pane"
            role="tabpanel"
            aria-labelledby="majorShareholders-tab"
          >
            <div>
              <table className="table table-hover">
                <thead
                  className="table-light table-bordered"
                  style={{ height: "50px", verticalAlign: "middle" }}
                >
                  <tr>
                    <th className="fw-bold">
                      {t("major_shareholders.shareholders.shareholder")}
                    </th>
                    <th className="fw-bold">
                      {t("major_shareholders.shareholders.type")}
                    </th>
                    <th className="fw-bold">
                      {t("major_shareholders.shareholders.noOfShares")}
                    </th>
                    <th className="fw-bold">
                      {t("major_shareholders.shareholders.holding")}
                    </th>
                    <th className="fw-bold">
                      {t("major_shareholders.shareholders.marketValue")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {majorShareholderArray.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {i18n.language === "ar"
                          ? item.shareholderNameAr
                          : item.shareholderNameEn}
                      </td>
                      <td>
                        {i18n.language === "ar"
                          ? item.shareholderTypeNameAr
                          : item.shareholderTypeNameEn}
                      </td>
                      <td>{formatChange(item.noOfShares)}</td>
                      <td>{item.percentage}</td>
                      <td>{formatChange(item.marketValue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h5 className="header-title">
              {t("major_shareholders.shareholders.foreignOwnership")}
            </h5>
            <div>
              <table className="table table-hover table-bordered">
                <thead className="table-light">
                  <tr>
                    <th rowSpan={2}>
                      {t("major_shareholders.shareholders.company")}
                    </th>
                    <th colSpan={2} className="fw-bolder text-center">
                      {t(
                        "major_shareholders.shareholders.totalForeignOwnership"
                      )}
                    </th>
                  </tr>
                  <tr>
                    <th className="text-center">
                      {t("major_shareholders.shareholders.limit")}
                    </th>
                    <th className="text-center">
                      {t("major_shareholders.shareholders.actual")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {foreignOwnershipArray.map((foreignOwnership) => (
                    <tr key={foreignOwnership.companyID}>
                      <td>
                        {i18n.language === "ar"
                          ? foreignOwnership.companyNameAr
                          : foreignOwnership.companyNameEn}
                      </td>
                      <td className="text-center">
                        {foreignOwnership.tfoMaximum}%
                      </td>
                      <td className="text-center">
                        {foreignOwnership.tfoActual}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className="tab-pane fade mx-0 border-0"
            id="historicalChanges-pane"
            role="tabpanel"
            aria-labelledby="historicalChanges-tab"
          >
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
                    <td>
                      {new Date(historicalChange.forDate).toLocaleDateString()}
                    </td>
                    <td>
                      {i18n.language === "ar"
                        ? historicalChange.shareholderNameAr
                        : historicalChange.shareholderNameEn}
                    </td>
                    <td
                      style={{
                        color:
                          historicalChange.previousPercentage <= 5 ? "red" : "",
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
                          historicalChange.percentageChange < 0
                            ? "red"
                            : "green",
                      }}
                    >
                      {historicalChange.percentageChange < 0
                        ? "(" +
                          formatChange(historicalChange.percentageChange) +
                          "%)"
                        : "-"}
                    </td>
                    <td>
                      {historicalChange.notes ? historicalChange.notes : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MajorShareholdersPage;

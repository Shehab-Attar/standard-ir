import { useTranslation } from "react-i18next";
import { formatChange } from "../../../utils/Helpers";

const MajorShareholders = ({ data }) => {
  const { t, i18n } = useTranslation();
  const majorShareholderArray = Array.isArray(data.shareholders)
    ? data.shareholders
    : [data.shareholders];

  const foreignOwnershipArray = Array.isArray(data.foreignOwnerships)
    ? data.foreignOwnerships
    : [data.foreignOwnerships];
  return (
    <>
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
                {t("major_shareholders.shareholders.totalForeignOwnership")}
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
                <td className="text-center">{foreignOwnership.tfoMaximum}%</td>
                <td className="text-center">{foreignOwnership.tfoActual}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MajorShareholders;

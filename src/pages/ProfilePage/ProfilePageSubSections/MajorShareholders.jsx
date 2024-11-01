import { useTranslation } from "react-i18next";
import MoreButton from "../../../components/MoreButton";

const MajorShareholders = ({ data }) => {
  const { t, i18n } = useTranslation();

  const majorShareholdersArray = Array.isArray(data.majorShareholder)
    ? data.majorShareholder
    : [data.majorShareholder];

  return (
    <div>
      <h6 className="header-title mx-2">
        {t("profile.majorShareholders.title")}
      </h6>
      <hr className="m-2 mb-0 icons-color" />
      <div>
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>{t("profile.majorShareholders.name")}</th>
              <th>{t("profile.majorShareholders.shares")}</th>
              <th>{t("profile.majorShareholders.holding")}</th>
            </tr>
          </thead>
          <tbody>
            {majorShareholdersArray.map((item, index) => (
              <tr key={index}>
                <th>
                  {i18n.language === "ar"
                    ? item.shareholderNameAr
                    : item.shareholderNameEn}
                </th>
                <td>{item.noOfShares}</td>
                <td>{item.percentage} %</td>
              </tr>
            ))}
          </tbody>
        </table>
        <MoreButton path="major-shareholders" />
      </div>
    </div>
  );
};

export default MajorShareholders;

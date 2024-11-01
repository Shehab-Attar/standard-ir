import { useTranslation } from "react-i18next";
import { useState } from "react";

const Subsidaries = ({ data }) => {
  const { t, i18n } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  const SubsidiariesArray = Array.isArray(data.subsidiaries)
    ? data.subsidiaries
    : [data.subsidiaries];

  const displayedSubsidiaries = showAll
    ? SubsidiariesArray
    : SubsidiariesArray.slice(0, 3);

  return (
    <div>
      <h6 className="header-title mx-2">{t("profile.subsidiaries.title")}</h6>
      <hr className="m-2 mb-0 icons-color" />
      <div>
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>{t("profile.subsidiaries.company")}</th>
              <th>{t("profile.subsidiaries.country")}</th>
              <th>{t("profile.subsidiaries.percentage")}</th>
            </tr>
          </thead>
          <tbody>
            {displayedSubsidiaries.map((item, index) => (
              <tr key={index}>
                <th>
                  {i18n.language === "ar"
                    ? item.companyNameAr
                    : item.companyNameEn}
                </th>
                <td>
                  {i18n.language === "ar"
                    ? item.countryNameAr
                    : item.countryNameEn}
                </td>
                <td>{item.percentage} %</td>
              </tr>
            ))}
          </tbody>
        </table>
        {SubsidiariesArray.length > 3 && (
          <a
            onClick={() => setShowAll(!showAll)}
            className="btn btn-light rounded-0 d-flex align-items-center justify-content-end"
          >
            <span className="mx-2">{t("title.more")}</span>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 32 32"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transform: i18n.language === "ar" ? "scale(-1, 1)" : "none",
              }}
            >
              <path d="M 9.09375 4.78125 L 7.6875 6.21875 L 17.46875 16 L 7.6875 25.78125 L 9.09375 27.21875 L 20.3125 16 Z M 16.09375 4.78125 L 14.6875 6.21875 L 24.46875 16 L 14.6875 25.78125 L 16.09375 27.21875 L 27.3125 16 Z"></path>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

export default Subsidaries;

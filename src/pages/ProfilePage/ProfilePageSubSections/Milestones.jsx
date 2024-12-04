import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
const Milestones = ({ data }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const milestonesArray = Array.isArray(data.milestones)
    ? data.milestones
    : [data.milestones];

  const displayedMilestones = showAll
    ? milestonesArray
    : milestonesArray.slice(0, 4);

  return (
    <div>
      <h6 className="header-title mx-2">{t("profile.milestones.title")}</h6>
      <hr className="m-2 mb-0 icons-color" />
      <div>
        <table className="table table-hover">
          <tbody>
            {displayedMilestones.map((item, index) => (
              <tr key={`${item.fullDate}-${item.companyID}-${index}`}>
                <th>{dayjs(item.fullDate).format("DD/MM/YYYY")}</th>
                <td
                  onClick={() => {
                    if (item.bodyEn || item.bodyAr) {
                      navigate(`/${i18n.language}/milestones/${index}`);
                    }
                  }}
                  style={{
                    cursor: item.bodyEn || item.bodyAr ? "pointer" : "default",
                    color: item.bodyEn || item.bodyAr ? "#175754" : "inherit",
                  }}
                >
                  {i18n.language === "ar" ? item.titleAr : item.titleEn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {milestonesArray.length > 4 && (
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

export default Milestones;

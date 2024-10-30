import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import MoreButton from "../../../../components/MoreButton";

const ArgaamReportsWidget = ({ data }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="border border-top-0">
      <h6 className="p-2 main-title">
        {t("overview.argaam_reports.mainTitle")}
      </h6>
      <hr className="m-2 mb-0 icons-color" />
      <div className="fs-14">
        {data?.argaamReports.slice(0, 3).map((argaamReport, idx) => {
          return (
            <div key={idx} className="p-1 px-2 border-bottom">
              <span
                className="news-title link-color hovered fs-14"
                onClick={() =>
                  navigate(
                    `/${i18n.language}/argaam-reports/${argaamReport.articleID}`
                  )
                }
              >
                {argaamReport.title}
              </span>
              <p className="m-0">
                <span className="text-secondary">
                  {argaamReport.articleSourceName}
                </span>
                <span className="mx-2">
                  {argaamReport.publishedOn.split(" ")[0]}
                </span>
              </p>
            </div>
          );
        })}
      </div>
      <MoreButton path="financial-information" />
    </div>
  );
};

export default ArgaamReportsWidget;

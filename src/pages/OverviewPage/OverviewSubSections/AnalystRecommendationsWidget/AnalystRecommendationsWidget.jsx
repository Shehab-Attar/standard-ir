import React from "react";
import { useTranslation } from "react-i18next";
import MoreButton from "../../../../components/MoreButton";

const AnalystRecommendationsWidget = ({ data }) => {
  const { t, i18n } = useTranslation();

  const recommendations = data.analystRecommendation.slice(0, 4);
  return (
    <div className="border border-top-0">
      <h6 className="p-2 main-title">
        {t("overview.analyst_recommendations.mainTitle")}
      </h6>
      <hr className="m-2 mb-0 icons-color" />
      <div className="container table-responsive">
        <table className="table mb-0 table-hover">
          <thead className="table-light">
            <tr>
              <th>{t("overview.analyst_recommendations.date")}</th>
              <th>{t("overview.analyst_recommendations.research_firm")}</th>
              <th>{t("overview.analyst_recommendations.rating")}</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((recommendation, index) => (
              <tr key={`${recommendation.brokerID}-${index}`}>
                <td>
                  {new Date(recommendation.opinionDate).toLocaleDateString()}
                </td>
                <td>
                  {i18n.language === "ar"
                    ? recommendation.brokerNameAr
                    : recommendation.brokerNameEn}
                </td>
                <td className="text-center">
                  {i18n.language === "ar"
                    ? recommendation.companyAnalystOpinionTypeNameAr
                    : recommendation.companyAnalystOpinionTypeNameEn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <MoreButton path={`estimates`} />
      </div>
    </div>
  );
};

export default AnalystRecommendationsWidget;

import { useTranslation } from "react-i18next";
import MoreButton from "../../../../components/MoreButton";
import { useNavigate } from "react-router-dom";

const AnalystEstimatesWidget = ({ data }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="border border-top-0">
      <h6 className="p-2 main-title">{t("overview.analyst_estimates.mainTitle")}</h6>
      <hr className="m-2 mb-0 icons-color" />
      <div className="fs-14">
        {data?.analystEstimates.slice(0, 3).map((analystEstimate, idx) => {
          return (
            <div key={idx} className="p-1 px-2 border-bottom">
              <span
                className="news-title link-color hovered fs-14"
                onClick={() =>
                  navigate(
                    `/${i18n.language}/estimates/${analystEstimate.articleID}`
                  )
                }
              >
                {analystEstimate.title}
              </span>
              <p className="m-0">
                <span className="text-secondary">
                  {analystEstimate.articleSourceName}
                </span>
                <span className="mx-2">
                  {analystEstimate.publishedOn.split(" ")[0]}
                </span>
              </p>
            </div>
          );
        })}
      </div>
      <MoreButton path="estimates" />
    </div>
  );
};

export default AnalystEstimatesWidget;

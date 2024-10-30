import React from "react";
import { useTranslation } from "react-i18next";
import MoreButton from "../../../../components/MoreButton";
import "./LatestNewsWidget.css";
import { useNavigate } from "react-router-dom";
const LatestNewsWidget = ({ data }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="border border-top-0">
      <h6 className="p-2 main-title">{t("overview.latest_news.mainTitle")}</h6>
      <hr className="m-2 mb-0 icons-color" />
      <div className="fs-14">
        {data?.latestNews.slice(0, 3).map((article, idx) => {
          return (
            <div key={idx} className="p-1 px-2 border-bottom">
              <span
                className="news-title link-color hovered fs-14"
                onClick={() =>
                  navigate(`/${i18n.language}/latest-news/${article.articleID}`)
                }
              >
                {article.title}
              </span>
              <p className="m-0">
                <span className="text-secondary">
                  {article.articleSourceName}
                </span>
                <span className="mx-2">
                  {article.publishedOn.split(" ")[0]}
                </span>
              </p>
            </div>
          );
        })}
      </div>
      <MoreButton path="disclosures/latest-news" />
    </div>
  );
};

export default LatestNewsWidget;

import React from 'react'
import { useTranslation } from 'react-i18next';
import MoreButton from '../../../../components/MoreButton';
import './LatestNewsWidget.css';


const LatestNewsWidget = ({ data }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Filter articles based on the current language
  const latestNews = data?.latestNews
    .slice(0, 3);

  if (latestNews.length === 0) return null;

  return (
    <div className="border border-top-0">
      <h6 className="p-2 main-title">
        {t('latest_news.mainTitle')}
      </h6>
      <hr className="m-2 mb-0 icons-color" />
      <div className="fs-14">
        {latestNews.map((article) => {

          return (
            <div key={article.articleID} className="p-1 px-2 border-bottom">
              <span
                className="news-title link-color hovered fs-14"
                onClick={() => window.location.href = `/${currentLanguage}/latest-news/${article.articleID}`}
              >
                {article.title}
              </span>
              <p className="m-0">
                <span className="text-secondary">{article.articleSourceName}</span>
                <span className="mx-2">{article.publishedOn.split(' ')[0]}</span>
              </p>
            </div>
          );
        })}
      </div>
      <MoreButton path='disclosures' />
    </div>
  );
}

export default LatestNewsWidget;

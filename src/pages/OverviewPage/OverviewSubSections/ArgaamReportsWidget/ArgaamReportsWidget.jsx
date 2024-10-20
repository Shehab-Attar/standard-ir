import React from 'react'
import { useTranslation } from 'react-i18next';
import MoreButton from '../../../../components/MoreButton';
import { Link } from 'react-router-dom';
import ArgaamReportsDetailsPage from './ArgaamReportsDetailsPage/ArgaamReportsDetailsPage';
const ArgaamReportsWidget = ({ data }) => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;
  
    // Filter articles based on the current language
    const argaamReports = data?.argaamReports
      .filter(argaamReport => argaamReport.language === currentLanguage)
      .slice(0, 5);
  
    if (argaamReports.length === 0) return null;

  return (
    <div className="border border-top-0">
      <h6 className="p-2 main-title">
        {t('argaam_reports.mainTitle')}
      </h6>
      <hr className="m-2 mb-0 icons-color" />
      <div className="fs-14">
        {argaamReports.map((argaamReport, index) => {

          return (
            <div key={index} className="p-1 px-2 border-bottom">
              <span
                className="news-title link-color hovered fs-14"
                onClick={() => window.location.href = `/${currentLanguage}/disclosures/${argaamReport.articleID}`}
              >
                {argaamReport.title}
              </span>
              <p className="m-0">
                <Link
                  to={`/article/${argaamReport.articleID}`}
                  className="text-secondary"
                >
                  {argaamReport.articleSourceName}
                </Link>
                <span className="mx-2">{argaamReport.publishedOn.split(' ')[0]}</span>
              </p>
            </div>
          );
        })}
      </div>
      <MoreButton path='financial-information' />
    </div>
  )
}

export default ArgaamReportsWidget

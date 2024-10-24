import React from 'react'
import { useTranslation } from 'react-i18next';
import MoreButton from '../../../../components/MoreButton';

const DisclousersWidget = ({ data }) => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;
  
    // Filter articles based on the current language
    const disclousers = data?.discloser
      .filter(disclouser => disclouser.language === currentLanguage)
      .slice(0, 3);
  
    if (disclousers.length === 0) return null;

  return (
    <div className="border border-top-0">
      <h6 className="p-2 main-title">
        {t('disclosures.mainTitle')}
      </h6>
      <hr className="m-2 mb-0 icons-color" />
      <div className="fs-14">
        {disclousers.map((disclouser, index) => {

          return (
            <div key={index} className="p-1 px-2 border-bottom">
              <span
                className="news-title link-color hovered fs-14"
                onClick={() => window.location.href = `/${currentLanguage}/disclosures/${disclouser.articleID}`}
              >
                {disclouser.title}
              </span>
              <p className="m-0">
                <span className="text-secondary">{disclouser.articleSourceName}</span>
                <span className="mx-2">{disclouser.publishedOn.split(' ')[0]}</span>
              </p>
            </div>
          );
        })}
      </div>
      <MoreButton path='disclosures' />
    </div>
  )
}

export default DisclousersWidget
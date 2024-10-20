import React from 'react'
import { useTranslation } from 'react-i18next';

const MoreButton = ({ path }) => {
    const { t, i18n } = useTranslation();
  return (
    <a className='btn btn-light rounded-0 d-flex align-items-center justify-content-end' href={`${i18n.language}/${path}`}>
        <span className='mx-2'>{t('title.more')}</span>
        <svg 
            stroke="currentColor" 
            fill="currentColor" 
            strokeWidth="0" 
            viewBox="0 0 32 32" 
            height="1em" 
            width="1em" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: i18n.language === 'ar' ? 'scale(-1, 1)' : 'none' }}
        >
            <path d="M 9.09375 4.78125 L 7.6875 6.21875 L 17.46875 16 L 7.6875 25.78125 L 9.09375 27.21875 L 20.3125 16 Z M 16.09375 4.78125 L 14.6875 6.21875 L 24.46875 16 L 14.6875 25.78125 L 16.09375 27.21875 L 27.3125 16 Z"></path>
        </svg>
    </a>
  )
}

export default MoreButton;

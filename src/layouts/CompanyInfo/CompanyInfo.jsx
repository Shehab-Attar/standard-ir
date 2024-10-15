import { useTranslation } from 'react-i18next'
import './CompanyInfo.css'


const CompanyInfo = () => {
    const {t} = useTranslation();
  return (
    <div className='container-lg mb-2 px-xl-0'>
        <div className='d-flex border-bottom flex-wrap'>
            <div className='p-3 bg-light fs-4 fw-bold text-secondary d-flex align-items-center m-2'>
                <span className='dynamicTitle'>4250</span>
            </div>
            <div className='px-lg-3  fs-5 fw-bold'>
                <div className='main-title fw-bold dynamicTitle'>
                  {t("title.main")}
                  &nbsp;
                  ({t("title.subtitle")})
                </div>
                <div className='dynamicTitle mb-1'>
                    <span style={{color: 'black'}}>23.36</span>
                    <span className='mx-1'>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" color="#198754" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{color: 'rgb(25, 135, 84)'}}>
                            <path d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm292 116V256h70.9c10.7 0 16.1-13 8.5-20.5L264.5 121.2c-4.7-4.7-12.2-4.7-16.9 0l-115 114.3c-7.6 7.6-2.2 20.5 8.5 20.5H212v116c0 6.6 5.4 12 12 12h64c6.6 0 12-5.4 12-12z"></path>
                        </svg>
                    </span>
                    <span className='mx-1'>
                        (0.02)
                    </span>
                    <span className='mx-1'>
                        (0.09%)
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CompanyInfo

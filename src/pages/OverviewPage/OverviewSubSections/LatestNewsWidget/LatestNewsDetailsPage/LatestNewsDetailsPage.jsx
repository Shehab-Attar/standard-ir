// import axios from 'axios'
// import { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { getToken } from '../../../../../services/getToken'

// const LatestNewsDetailsPage = () => {
//   const [latestNews, setLatestNews] = useState(null)
//   const [languageMismatch, setLanguageMismatch] = useState(false)
//   const { articleID } = useParams()
//   const { t, i18n } = useTranslation()

//   useEffect(() => {
//     const fetchLatestNews = async () => {
//       try {
//         const token = await getToken()
//         const response = await axios.get(`https://data.argaam.com/api/v1.0/json/ir-api/overview`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           params: {
//             langId: i18n.language === 'ar' ? 1 : 2,
//           },
//         })
        
//         const foundLatestNews = response.data.latestNews.find(d => d.articleID === parseInt(articleID))
//         if (foundLatestNews) {
//           if (foundLatestNews.language !== i18n.language) {
//             setLanguageMismatch(true)
//           } else {
//             setLatestNews(foundLatestNews)
//             setLanguageMismatch(false)
//           }
//         }
        
//       } catch (err) {
//         console.log(err)
//       }
//     }

//     fetchLatestNews()
//   }, [articleID, i18n.language])


//   if (languageMismatch) {
//     return <div className="fw-bold">{t('title.languageMismatch')}</div>
//   }

//   if (!latestNews) {
//     return null
//   }

//   return (
//     <div className="latest-news-details">
//       <div dangerouslySetInnerHTML={{ __html: latestNews.body }} />
//     </div>
//   )
// }

// export default LatestNewsDetailsPage

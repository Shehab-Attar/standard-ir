// import axios from 'axios'
// import { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { getToken } from '../../../../../services/getToken'

// const ArgaamReportsDetailsPage = () => {
//   const [argaamReports, setArgaamReports] = useState(null)
//   const [languageMismatch, setLanguageMismatch] = useState(false)
//   const { articleID } = useParams()
//   const { t, i18n } = useTranslation()

//   useEffect(() => {
//     const fetchArgaamReports = async () => {
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

//         const foundArgaamReports = response.data.argaamReports.find(d => d.articleID === parseInt(articleID))
//         if (foundArgaamReports.language !== i18n.language) {
//           setLanguageMismatch(true)
//         } else {
//           setArgaamReports(foundArgaamReports)
//           setLanguageMismatch(false)
//         }

//       } catch (err) {
//         console.log(err)
//       }
//     }

//     fetchArgaamReports()
//   }, [articleID, i18n.language])

//   if (languageMismatch) {
//     return <div className="fw-bold">{t('title.languageMismatch')}</div>
//   }

//   if (!argaamReports) {
//     return null
//   }

//   return (
//     <div className="argaam-reports-details">
//       <div dangerouslySetInnerHTML={{ __html: argaamReports.body }} />
//     </div>
//   )
// }

// export default ArgaamReportsDetailsPage

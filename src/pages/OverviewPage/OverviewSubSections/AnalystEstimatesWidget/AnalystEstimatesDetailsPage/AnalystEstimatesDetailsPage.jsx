// import axios from 'axios'
// import { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { getToken } from '../../../../../services/getToken'

// const AnalystEstimatesDetailsPage = () => {
//   const [analystEstimates, setAnalystEstimates] = useState(null)  
//   const [languageMismatch, setLanguageMismatch] = useState(false) 
//   const { articleID } = useParams()
//   const { t, i18n } = useTranslation()

//   useEffect(() => {
//     const fetchAnalystEstimates = async () => {
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
        
//         const foundAnalystEstimates = response.data.analystEstimates.find(d => d.articleID === parseInt(articleID))
//         if (foundAnalystEstimates.language !== i18n.language) {
//           setLanguageMismatch(true)
//         } else {
//           setAnalystEstimates(foundAnalystEstimates)
//           setLanguageMismatch(false)
//         }
        
//       } catch (err) {
//         console.log(err)
//       }
//     }

//     fetchAnalystEstimates()
//   }, [articleID, i18n.language])


//   if (languageMismatch) {
//     return <div className="fw-bold">{t('title.languageMismatch')}</div>
//   }

//   if (!analystEstimates) {
//     return null
//   }

//   return (
//     <div className="analyst-estimates-details">
//       <div dangerouslySetInnerHTML={{ __html: analystEstimates.body }} />
//     </div>
//   )
// }

// export default AnalystEstimatesDetailsPage

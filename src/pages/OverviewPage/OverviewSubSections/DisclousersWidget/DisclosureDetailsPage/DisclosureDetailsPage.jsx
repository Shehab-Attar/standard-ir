import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getToken } from '../../../../../services/getToken'

const DisclosureDetailsPage = () => {
  const [disclosure, setDisclosure] = useState(null)  
  const [languageMismatch, setLanguageMismatch] = useState(false)
  const { articleID } = useParams()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const fetchDisclosure = async () => {
      try {
        const token = await getToken()
        const response = await axios.get(`https://data.argaam.com/api/v1.0/json/ir-api/overview`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            langId: i18n.language === 'ar' ? 1 : 2,
          },
        })
        
        const foundDisclosure = response.data.discloser.find(d => d.articleID === parseInt(articleID))
        if (foundDisclosure.language !== i18n.language) {
          setLanguageMismatch(true)
        } else {
          setDisclosure(foundDisclosure)
          setLanguageMismatch(false)
        }
        
      } catch (err) {
        console.log(err)
      }
    }

    fetchDisclosure()
  }, [articleID, i18n.language])

  if (languageMismatch) {
    return <div className="fw-bold">{t('title.languageMismatch')}</div>
  }

  if (!disclosure) {
    return null
  }

  return (
    <div className="disclosure-details">
      <div dangerouslySetInnerHTML={{ __html: disclosure.body }} />
    </div>
  )
}

export default DisclosureDetailsPage

import React from 'react'
import './FinancialRatiosWidget.css'
import { useTranslation } from 'react-i18next';
import { formatValue, } from '../../../../utils/Helpers';
import { MoreButton } from '../../../../components/MoreButton';


const FinancialRatiosWidget = ({data}) => {
    
    const {t, i18n} = useTranslation();
    
  return (
    <div className="border border-top-0">
      <h6 className="p-2 main-title">
        {t('financial_ratios.title')}
      </h6>
      <hr className="m-2 mb-0 icons-color" />
      <div className="container-lg table-responsive">
        <table className="table table-striped fs-14 mb-0">
          <tbody>
            {data.financialRatios.fields?.map((field) => (
              <tr key={field.ratioName}>
                <th>{i18n.language === 'ar' ? field.nameAr : field.nameEn}:</th>
                <td>
                  {formatValue(field.values.value, field.isCurrency, field.isPercentage)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <MoreButton />
      </div>
    </div>
  )
}

export default FinancialRatiosWidget

import React from 'react'
import { useTranslation } from 'react-i18next';

const CorporateActionsWidget = ({ data }) => {
    const {t, i18n} = useTranslation();
  return (
    <div className="border border-top-0">
        <h6 className="p-2 main-title">
            Corporate Actions
        </h6>
        <hr className="m-2 mb-0 icons-color" />
        <div className="container-lg mt-3">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="d-flex justify-content-evenly" role="presentation">
                    <button className="nav-link active rounded-0 fs-14" id="changes" data-bs-toggle="tab" data-bs-target="#changes-pane" type="button" role="tab" aria-controls="changes-pane" aria-selected="true">
                        {t('corporate_actions.recent_changes')}
                    </button>
                </li>
            </ul>
            <div className="tab-content" id='myTabContent'>
                <div className="tab-pane fade show active table border-0" id="changes-pane" role="tabpanel" aria-labelledby="changes" tabIndex="0">
                    <table className="table table-hover fs-14 mb-0">
                        <tbody>
                            <tr>
                                <th>{t('corporate_actions.previous_capital')}</th>
                                <td>{data.cpaitalSummary.currentCapital} M {i18n.language === 'ar' ? data.cpaitalSummary.currencyNameAr : data.cpaitalSummary.currencyNameEn}</td>
                            </tr>
                            <tr>
                                <th>{t('corporate_actions.previous_no_of_shares')}</th>
                                <td>{data.cpaitalSummary.currentShares} {i18n.language === 'ar' ? data.cpaitalSummary.currencyNameAr : data.cpaitalSummary.currencyNameEn}</td>
                            </tr>
                            <tr>
                                <th>{t('corporate_actions.capital_change')}</th>
                                <td>{((data.cpaitalSummary.newCapital - data.cpaitalSummary.currentCapital) / data.cpaitalSummary.currentCapital * 100).toFixed(2)}%</td>
                            </tr>
                            <tr>
                                <th>{t('corporate_actions.current_capital')} {t('corporate_actions.current_capital_currency_ryial')}</th>
                                <td>{data.cpaitalSummary.newCapital}</td>
                            </tr>
                            <tr>
                                <th>{t('corporate_actions.current_no_of_shares')} {t('corporate_actions.current_capital_currency')}</th>
                                <td>{data.cpaitalSummary.newShares}</td>
                            </tr>
                            <tr>
                                <th>{t('corporate_actions.type')}</th>
                                <td>{data.cpaitalSummary.companyCapitalStatusNameEn}</td>
                            </tr>
                            <tr>
                                <th>{t('corporate_actions.announcement')}</th>
                                <td>{new Date(data.cpaitalSummary.announcedDate).toLocaleDateString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CorporateActionsWidget

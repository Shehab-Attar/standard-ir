import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { getToken } from '../../../../services/getToken';
import axios from 'axios';
import './ChartTickerWidget.css';
const ChartTickerWidget = () => {

  const { t } = useTranslation();

    const { data, isLoading, error } = useQuery({
        queryKey: ["chartTickerData"],
        queryFn: async () => {
            const token = await getToken();
            const res = await axios.get(`https://data-ir.argaam.com/api/v1/json/ir-api/charts-data/0/${period}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data;
        }
    })
  
    return (
        <div className="border">
            <h6 className="p-2 main-title">{t('chartTicker.title')}</h6>
            <hr className="m-2 mb-0 icons-color" />
            <div className="container-lg table-responsive">
                <div className="highcharts-figure" data-highcharts-chart="9">
                    <div className="chart-container">
                        <select>
                            <option value="Zoom">{t('chartTicker.zoom')}</option>
                            <option value="1M">{t('chartTicker.1M')}</option>
                            <option value="3M">{t('chartTicker.3M')}</option>
                            <option value="6M">{t('chartTicker.6M')}</option>
                            <option value="YTD">{t('chartTicker.YTD')}</option>
                            <option value="1Y">{t('chartTicker.1Y')}</option>
                            <option value="View All">{t('chartTicker.View All')}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ChartTickerWidget

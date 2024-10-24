//Packages
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../services/getToken.js";


//Pages
import MarketDataWidget from "./OverviewSubSections/MarketDataWidget/MarketDataWidget";
import FinancialRatiosWidget from "./OverviewSubSections/FinancialRatiosWidget/FinancialRatiosWidget.jsx";
import EventsWidget from "./OverviewSubSections/EventsWidget/EventsWidget.jsx";
import CorporateActionsWidget from "./OverviewSubSections/CorporateActionsWidget/CorporateActionsWidget";
import AnalystRecommendationsWidget from "./OverviewSubSections/AnalystRecommendationsWidget/AnalystRecommendationsWidget";
import LatestNewsWidget from "./OverviewSubSections/LatestNewsWidget/LatestNewsWidget";
import EarningsWidget from "./OverviewSubSections/EarningsWidget/EarningsWidget";
import DisclousersWidget from "./OverviewSubSections/DisclousersWidget/DisclousersWidget";
import AnalystEstimatesWidget from "./OverviewSubSections/AnalystEstimatesWidget/AnalystEstimatesWidget.jsx";
import ArgaamReportsWidget from "./OverviewSubSections/ArgaamReportsWidget/ArgaamReportsWidget.jsx";
import ChartTickerWidget from "./OverviewSubSections/ChartTickerWidget/ChartTickerWidget.jsx";

const OverviewPage = () => {  
  const { t, i18n } = useTranslation();

  // == Get Overview Data
  const { data, isLoading } = useQuery({
    queryKey: ["overviewPageData"],
    queryFn: async () => {
      // Ensure token is valid
      const token = await getToken();
      
      if (!token) {
        throw new Error("Unable to authenticate");
      }

      // Get Overview Data
      const res = await axios.get(
        `https://data.argaam.com/api/v1.0/json/ir-api/overview/${i18n.language}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Encoding": "gzip",
          },
        }
      );
      return res.data;
    },
  });
  // == Get Overview Data

  // == isLoading
  if (isLoading) return <div>{t('title.loading')}</div>;
  // == isLoading

  return (
    <>
      <div className="container-lg">
        <div className="row sections">
          <div className="col-md-6">
            <ChartTickerWidget />
            <LatestNewsWidget data={data} />
            <EarningsWidget data={data} />
            <DisclousersWidget data={data} />
            <AnalystEstimatesWidget data={data} />
            <ArgaamReportsWidget data={data} />
          </div>
          <div className="col-md-6">
            <MarketDataWidget data={data} />
            <FinancialRatiosWidget data={data} />
            <EventsWidget data={data} />
            <CorporateActionsWidget data={data} />
            <AnalystRecommendationsWidget data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewPage;

//Packages
import React, {Suspense} from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../services/getToken.js";

//Components
import ErrorBoundary from "../../components/ErrorBoundary";

//Pages
const MarketDataWidget = React.lazy(() => import("./OverviewSubSections/MarketDataWidget/MarketDataWidget"));
const FinancialRatiosWidget = React.lazy(() => import("./OverviewSubSections/FinancialRatiosWidget/FinancialRatiosWidget"));
const LatestNewsWidget = React.lazy(() => import("./OverviewSubSections/LatestNewsWidget/LatestNewsWidget"));
const ChartTickerWidget = React.lazy(() => import("./OverviewSubSections/ChartTickerWidget/ChartTickerWidget"));
const EventsWidget = React.lazy(() => import("./OverviewSubSections/EventsWidget/EventsWidget"));
const CorporateActionsWidget = React.lazy(() => import("./OverviewSubSections/CorporateActionsWidget/CorporateActionsWidget"));
const AnalystRecommendationsWidget = React.lazy(() => import("./OverviewSubSections/AnalystRecommendationsWidget/AnalystRecommendationsWidget"));
const EarningsWidget = React.lazy(() => import("./OverviewSubSections/EarningsWidget/EarningsWidget"));
const DisclousersWidget = React.lazy(() => import("./OverviewSubSections/DisclousersWidget/DisclousersWidget"));
const AnalystEstimatesWidget = React.lazy(() => import("./OverviewSubSections/AnalystEstimatesWidget/AnalystEstimatesWidget.jsx"));
const ArgaamReportsWidget = React.lazy(() => import("./OverviewSubSections/ArgaamReportsWidget/ArgaamReportsWidget"));

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
  if (isLoading) return <div>{t("title.loading")}</div>;
  // == isLoading

  return (
    <>
      <div className="container-lg">
        <div className="row sections">
          <div className="col-md-6">
            
              <Suspense fallback={<div>Loading...</div>}>
                <ChartTickerWidget />
                <LatestNewsWidget />
                <EarningsWidget data={data} />
                <DisclousersWidget />
                <AnalystEstimatesWidget data={data} />
                <ArgaamReportsWidget data={data} />
              </Suspense>
            
          </div>
          <div className="col-md-6">
            
              <Suspense fallback={<div>Loading...</div>}>
                <MarketDataWidget data={data} />
                <FinancialRatiosWidget data={data} />
                <EventsWidget />
                <CorporateActionsWidget data={data} />
                <AnalystRecommendationsWidget data={data} />
              </Suspense>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewPage;

import { useQuery } from "@tanstack/react-query";
import { getOverview } from "../../services/Apis";
import MarketDataWidget from "./OverviewSubSections/MarketDataWidget/MarketDataWidget";
import FinancialRatiosWidget from "./OverviewSubSections/FinancialRatiosWidget/FinancialRatiosWidget.jsx";
import EventsWidget from "./OverviewSubSections/EventsWidget/EventsWidget.jsx";
import CorporateActionsWidget from "./OverviewSubSections/CorporateActionsWidget/CorporateActionsWidget";
import AnalystRecommendationsWidget from "./OverviewSubSections/AnalystRecommendationsWidget/AnalystRecommendationsWidget";
import LatestNewsWidget from "./OverviewSubSections/LatestNewsWidget/LatestNewsWidget";
import Earnings from "./OverviewSubSections/Earnings/Earnings";
import DisclousersWidget from "./OverviewSubSections/DisclousersWidget/DisclousersWidget";
import AnalystEstimatesWidget from "./OverviewSubSections/AnalystEstimatesWidget/AnalystEstimatesWidget.jsx"; 
import ArgaamReportsWidget from "./OverviewSubSections/ArgaamReportsWidget/ArgaamReportsWidget.jsx";
const OverviewPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["overview"],
    queryFn: getOverview,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    cacheTime: 1000 * 60 * 10, // Keep data in cache for 10 minutes
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <div className="container-lg">
        <div className="row sections">
          <div className="col-md-6">
            <h1>Chart</h1>
            <LatestNewsWidget data={data} />
            <Earnings data={data} />
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

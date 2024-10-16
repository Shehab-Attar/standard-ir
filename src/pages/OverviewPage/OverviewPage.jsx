import { useQuery } from "@tanstack/react-query";
import { getAuthToken, getOverview } from "../../services/Apis";
import MarketDataWidget from "./OverviewSubSections/MarketDataWidget/MarketDataWidget";
import FinancialRatiosWidget from "./OverviewSubSections/FinancialRatiosWidget/FinancialRatiosWidget.jsx";
import EventsWidget from "./OverviewSubSections/EventsWidget/EventsWidget.jsx";
import CorporateActionsWidget from "./OverviewSubSections/CorporateActionsWidget/CorporateActionsWidget";

const OverviewPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const token = await getAuthToken();
      return getOverview(token);
    },
    
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <div className="container-lg">
        <div className="row sections">
          <div className="col-md-6">
            <h1>Chart</h1>
          </div>
          <div className="col-md-6">
            <MarketDataWidget data={data} />
            <FinancialRatiosWidget data={data} />
            <EventsWidget data={data} />
            <CorporateActionsWidget data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewPage;

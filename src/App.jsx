import { Route, Routes, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

//Layouts
import CompanyInfo from "./layouts/CompanyInfo/CompanyInfo";
import Sidebar from "./layouts/Sidebar/Sidebar";
import Footer from "./layouts/Footer/Footer";

//Pages
import OverviewPage from "./pages/OverviewPage/OverviewPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import BoardManagementPage from "./pages/BoardManagementPage/BoardManagementPage";
import SharePerformancePage from "./pages/SharePerformancePage/SharePerformancePage";
import FinancialInformationPage from "./pages/FinancialInformationPage/FinancialInformationPage";
import InvestorsPresentationPage from "./pages/InvestorPresentationPage/InvestorPresentationPage";
import DisclosuresPage from "./pages/DisclosuresPage/DisclosuresPage";
import CorporateActionsPage from "./pages/CorporateActionsPage/CorporateActionsPage";
import MajorShareholdersPage from "./pages/MajorShareholdersPage/MajorShareholdersPage";
import BusinessSegmentsPage from "./pages/BusinessSegmentsPage/BusinessSegmentsPage";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import EstimatesPage from "./pages/EstimatesPage/EstimatesPage";

// Details Pages
import DisclosureDetailsPage from "./components/DetailsPages/DisclosureDetailsPage";
import LatestNewsDetailsPage from "./components/DetailsPages/LatestNewsDetailsPage";
import ArgaamReportsDetailsPage from "./components/DetailsPages/ArgaamReportsDetailsPage";
import AnalystEstimatesDetailsPage from "./components/DetailsPages/AnalystEstimatesDetailsPage";
import BoardDetailsPage from "./components/DetailsPages/BoardDetailsPage";
// Disclosures Sub Links
import DisclousersPageLatestNewsSubLink from "./pages/DisclosuresPage/DisclousersPageSubLinks/DisclousersPageLatestNewsSubLink";
import DisclousersPageDisclosuresSubLink from "./pages/DisclosuresPage/DisclousersPageSubLinks/DisclousersPageDisclosuresSubLink";
import DisclousersPageEventsSubLink from "./pages/DisclosuresPage/DisclousersPageSubLinks/DisclousersPageEventsSubLink/DisclousersPageEventsSubLink";
// Financial Information Sub Links
import FinancialStatements from "./pages/FinancialInformationPage/FinancialInformationPageSubLinks/FinancialStatements";
import FinancialRatios from "./pages/FinancialInformationPage/FinancialInformationPageSubLinks/FinancialRatios";
import FinancialReports from "./pages/FinancialInformationPage/FinancialInformationPageSubLinks/FinancialReports";
// Share Performance Sub Links
import Chart from "./pages/SharePerformancePage/SharePerformanceSubLinks/Chart/Chart";
import Peers from "./pages/SharePerformancePage/SharePerformanceSubLinks/Peers/Peers";
import NegotiatedDeals from "./pages/SharePerformancePage/SharePerformanceSubLinks/NegotiatedDeals/NegotiatedDeals";
import InvestmentCalculator from "./pages/SharePerformancePage/SharePerformanceSubLinks/InvestmentCalculator/InvestmentCalculator";
// Peers Sub Links
import General from "./pages/SharePerformancePage/SharePerformanceSubLinks/Peers/PeersSubTabs/General";
import Ranking from "./pages/SharePerformancePage/SharePerformanceSubLinks/Peers/PeersSubTabs/Ranking";
import Growth from "./pages/SharePerformancePage/SharePerformanceSubLinks/Peers/PeersSubTabs/Growth";
import MarketPerformance from "./pages/SharePerformancePage/SharePerformanceSubLinks/Peers/PeersSubTabs/MarketPerformance";
import PerShareData from "./pages/SharePerformancePage/SharePerformanceSubLinks/Peers/PeersSubTabs/PerShareData";
import SalariesBenefits from "./pages/SharePerformancePage/SharePerformanceSubLinks/Peers/PeersSubTabs/SalariesBenefits";

function App() {
  const { i18n } = useTranslation();

  return (
    <div className="container-fluid">
      <div className="row justify-content-between mb-5 mt-4 g-0">
        <div className="col-xl-2 col-lg-3 d-flex justify-content-end px-2">
          <Sidebar />
        </div>
        <div className="col-xl-10 col-lg-9 col-12 mb-5">
          <div className="container-lg mb-2">
            <div className="d-flex flex-wrap">
              <CompanyInfo />
            </div>
            <div className="content">
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to={`/${i18n.language}`} replace />}
                />
                <Route path={`/${i18n.language}`} element={<OverviewPage />} />
                <Route
                  path={`/${i18n.language}/profile`}
                  element={<ProfilePage />}
                />
                <Route
                  path={`/${i18n.language}/board-management`}
                  element={<BoardManagementPage />}
                />
                {/* Share Performance */}
                <Route
                  path={`/${i18n.language}/share-performance`}
                  element={<SharePerformancePage />}
                >
                  <Route index element={<Navigate to="chart" replace />} />
                  <Route path="chart" element={<Chart />} />
                  <Route path="peers" element={<Peers />}>
                    <Route index element={<Navigate to="general" replace />} />
                    <Route path="general" element={<General />} />
                    <Route path="ranking" element={<Ranking />} />
                    <Route path="growth" element={<Growth />} />
                    <Route
                      path="market-performance"
                      element={<MarketPerformance />}
                    />
                    <Route path="per-share-data" element={<PerShareData />} />
                    <Route
                      path="salaries-benefits"
                      element={<SalariesBenefits />}
                    />
                  </Route>
                  <Route
                    path="negotiated-deals"
                    element={<NegotiatedDeals />}
                  />
                  <Route
                    path="investment-calculator"
                    element={<InvestmentCalculator />}
                  />
                </Route>
                {/* End Share Performance */}
                {/* Financial Information */}
                <Route
                  path={`/${i18n.language}/financial-information`}
                  element={<FinancialInformationPage />}
                >
                  <Route
                    index
                    element={<Navigate to="financial-statements" replace />}
                  />
                  <Route
                    element={<FinancialStatements />}
                    path="financial-statements"
                  />
                  <Route path="ratios" element={<FinancialRatios />} />
                  <Route path="reports" element={<FinancialReports />} />
                </Route>
                <Route
                  path={`/${i18n.language}/investors-presentation`}
                  element={<InvestorsPresentationPage />}
                />
                {/* End Financial Information */}
                {/* Disclousers */}
                <Route
                  path={`/${i18n.language}/disclosures`}
                  element={<DisclosuresPage />}
                >
                  <Route
                    element={<DisclousersPageLatestNewsSubLink />}
                    path="latest-news"
                  />
                  <Route
                    path="disc"
                    element={<DisclousersPageDisclosuresSubLink />}
                  />
                  <Route
                    path="events"
                    element={<DisclousersPageEventsSubLink />}
                  />
                </Route>

                {/* 
                <Route path="earnings" element={<DisclousersPageEarningsSubLink />} />
                 */}
                {/* End Disclousers */}
                <Route
                  path={`/${i18n.language}/corporate-actions`}
                  element={<CorporateActionsPage />}
                />
                <Route
                  path={`/${i18n.language}/major-shareholders`}
                  element={<MajorShareholdersPage />}
                />
                <Route
                  path={`/${i18n.language}/business-segments`}
                  element={<BusinessSegmentsPage />}
                />
                <Route
                  path={`/${i18n.language}/projects`}
                  element={<ProjectsPage />}
                />
                <Route
                  path={`/${i18n.language}/estimates`}
                  element={<EstimatesPage />}
                />
                {/* Details Pages */}
                <Route
                  path={`/${i18n.language}/disclosures/:id`}
                  element={<DisclosureDetailsPage />}
                />
                <Route
                  path={`/${i18n.language}/latest-news/:id`}
                  element={<LatestNewsDetailsPage />}
                />
                <Route
                  path={`/${i18n.language}/argaam-reports/:id`}
                  element={<ArgaamReportsDetailsPage />}
                />
                <Route
                  path={`/${i18n.language}/estimates/:id`}
                  element={<AnalystEstimatesDetailsPage />}
                />
                <Route
                  path={`/${i18n.language}/board-management/:id`}
                  element={<BoardDetailsPage />}
                />
                {/* End Details Pages */}
                <Route path="*" element={<div>Not Found</div>} />
              </Routes>
            </div>
          </div>
        </div>
        <div className="fixed-bottom">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;

import { Route, Routes, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

//Layouts
import CompanyInfo from "./layouts/CompanyInfo/CompanyInfo";
import Sidebar from "./layouts/Sidebar/Sidebar";

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
// Sub Links
import DisclousersPageLatestNewsSubLink from "./pages/DisclosuresPage/DisclousersPageSubLinks/DisclousersPageLatestNewsSubLink";
import DisclousersPageDisclosuresSubLink from "./pages/DisclosuresPage/DisclousersPageSubLinks/DisclousersPageDisclosuresSubLink";
import DisclousersPageEventsSubLink from "./pages/DisclosuresPage/DisclousersPageSubLinks/DisclousersPageEventsSubLink/DisclousersPageEventsSubLink";

function App() {
  const { i18n } = useTranslation();

  return (
    <div className="container-lg">
      <div className="row justify-content-between mb-5 mt-4 g-0">
        <div className="col-xl-3 col-lg-3 d-flex px-2">
          <Sidebar />
        </div>
        <div className="col-lg-9 col-12 mb-5">
          <CompanyInfo />
          <div className="content container-lg">
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
              <Route
                path={`/${i18n.language}/share-performance`}
                element={<SharePerformancePage />}
              />
              <Route
                path={`/${i18n.language}/financial-information`}
                element={<FinancialInformationPage />}
              />
              <Route
                path={`/${i18n.language}/investors-presentation`}
                element={<InvestorsPresentationPage />}
              />
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
    </div>
  );
}

export default App;

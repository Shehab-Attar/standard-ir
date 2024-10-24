import { useTranslation } from 'react-i18next';
import { Route, Routes, Navigate } from 'react-router-dom';

//Layouts
import CompanyInfo from './layouts/CompanyInfo/CompanyInfo';
import Sidebar from './layouts/Sidebar/Sidebar';

//Pages
import OverviewPage from './pages/OverviewPage/OverviewPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import BoardManagementPage from './pages/BoardManagementPage/BoardManagementPage';
import SharePerformancePage from './pages/SharePerformancePage/SharePerformancePage';
import FinancialInformationPage from './pages/FinancialInformationPage/FinancialInformationPage';
import InvestorsPresentationPage from './pages/InvestorPresentationPage/InvestorPresentationPage';
import DisclosuresPage from './pages/DisclosuresPage/DisclosuresPage';
import CorporateActionsPage from './pages/CorporateActionsPage/CorporateActionsPage';
import MajorShareholdersPage from './pages/MajorShareholdersPage/MajorShareholdersPage';
import BusinessSegmentsPage from './pages/BusinessSegmentsPage/BusinessSegmentsPage';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import MergersAcquisitionsPage from './pages/MergersAcquisitionsPage/MergersAcquisitionsPage';
import EstimatesPage from './pages/EstimatesPage/EstimatesPage';
import ContactIRPage from './pages/ContactIRPage/ContactIRPage';
import ChartPage from './pages/ChartPage/ChartPage';

// Details Pages
import DisclosureDetailsPage from './pages/OverviewPage/OverviewSubSections/DisclousersWidget/DisclosureDetailsPage/DisclosureDetailsPage'
import LatestNewsDetailsPage from './pages/OverviewPage/OverviewSubSections/LatestNewsWidget/LatestNewsDetailsPage/LatestNewsDetailsPage'
import ArgaamReportsDetailsPage from './pages/OverviewPage/OverviewSubSections/ArgaamReportsWidget/ArgaamReportsDetailsPage/ArgaamReportsDetailsPage'
import AnalystEstimatesDetailsPage from './pages/OverviewPage/OverviewSubSections/AnalystEstimatesWidget/AnalystEstimatesDetailsPage/AnalystEstimatesDetailsPage'

function App() {

  const { i18n } = useTranslation();

  return (
    <div className='container-lg'>
      <div className='row justify-content-between mb-5 mt-4 g-0'>
        <div className="col-xl-3 col-lg-3 d-flex px-2">
          <Sidebar />
        </div>
        <div className='col-lg-9 col-12 mb-5'>
          <CompanyInfo />
          <div className='content container-lg'>
            <Routes>
              <Route path="/" element={<Navigate to={`/${i18n.language}`} replace />} />
              <Route path={`/${i18n.language}`} 
                element={<OverviewPage />} 
              />
              <Route path={`/${i18n.language}/profile`} 
                element={<ProfilePage />} 
              />
              <Route path={`/${i18n.language}/board-management`} 
                element={<BoardManagementPage />} 
              />
              <Route path={`/${i18n.language}/chart`} 
                element={<ChartPage />} 
              />
              <Route path={`/${i18n.language}/share-performance`} 
                element={<SharePerformancePage />} 
              />
              <Route path={`/${i18n.language}/financial-information`} 
                element={<FinancialInformationPage />} 
              />
              <Route path={`/${i18n.language}/investors-presentation`} 
                element={<InvestorsPresentationPage />} 
              />
              <Route path={`/${i18n.language}/disclosures`} 
                element={<DisclosuresPage />} 
              />
              <Route path={`/${i18n.language}/corporate-actions`} 
                element={<CorporateActionsPage />} 
              />
              <Route path={`/${i18n.language}/major-shareholders`} 
                element={<MajorShareholdersPage />} 
              />
              <Route path={`/${i18n.language}/business-segments`} 
                element={<BusinessSegmentsPage />} 
              />
              <Route path={`/${i18n.language}/projects`} 
                element={<ProjectsPage />} 
              />
              <Route path={`/${i18n.language}/mergers-acquisitions`} 
                element={<MergersAcquisitionsPage />} 
              />
              <Route path={`/${i18n.language}/estimates`} 
                element={<EstimatesPage />} 
              />
              <Route path={`/${i18n.language}/contact-ir`} 
                element={<ContactIRPage />} 
              />
              {/* Details Pages */}
                <Route path={`/${i18n.language}/disclosures/:articleID`} 
                  element={<DisclosureDetailsPage />} 
                />
                <Route path={`/${i18n.language}/latest-news/:articleID`} 
                  element={<LatestNewsDetailsPage />} 
                />
                <Route path={`/${i18n.language}/argaam-reports/:articleID`} 
                  element={<ArgaamReportsDetailsPage />} 
                />
                <Route path={`/${i18n.language}/estimates/:articleID`} 
                  element={<AnalystEstimatesDetailsPage />} 
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

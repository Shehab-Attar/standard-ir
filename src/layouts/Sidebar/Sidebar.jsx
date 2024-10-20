import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const handleLinkClick = () => {
    // Close the offcanvas when a link is clicked
    const offcanvasElement = document.getElementById('offcanvasSidebar');
    const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
    offcanvas.hide();
  };

  return (
    <>
      <i
        className="btn btn-light toggle-button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasSidebar"
        aria-controls="offcanvasSidebar"
        style={{ left: isRTL ? '10px' : 'auto', right: isRTL ? 'auto' : '10px' }}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          className="icons-color"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1-.5-.5v-1.5h10a.5.5 0 0 1 0 1H3v.5a.5.5 0 0 1-.5.5zm0-4a.5.5 0 0 1-.5-.5v-1.5h10a.5.5 0 0 1 0 1H3v.5a.5.5 0 0 1-.5.5zm0-4a.5.5 0 0 1-.5-.5V2h10a.5.5 0 0 1 0 1H3v.5a.5.5 0 0 1-.5.5z"
          ></path>
        </svg>
      </i>
      <div
        className={`offcanvas offcanvas-position-${isRTL ? 'end' : 'start'}`}
        tabIndex="-1"
        id="offcanvasSidebar"
        aria-labelledby="offcanvasSidebarLabel"
        data-bs-backdrop="true"
      >
        <div className="offcanvas-content overflow-hidden">
          <div className="d-flex flex-column justify-content-between align-items-center 100-vh">
            <div className="offcanvas-body m-0 p-0 d-flex flex-column fs-6" id="sidebar">
              <ul className="navbar-nav w-100 p-0 list-unstyled w-100 justify-content-start">
                <li className="asideList border-bottom">
                  <NavLink to={`/${i18n.language}`} className="nestedNavLink" end onClick={handleLinkClick}>
                    <span className="mx-2">{t('sidebar.overview')}</span>
                  </NavLink>
                </li>
                <li className="asideList border-bottom">
                  <NavLink to={`/${i18n.language}/profile`} className="nestedNavLink" onClick={handleLinkClick}>
                    <span className="mx-2">{t('sidebar.profile')}</span>
                  </NavLink>
                </li>
                <li className="asideList border-bottom">
                  <NavLink to={`/${i18n.language}/board-management`} className="nestedNavLink" onClick={handleLinkClick}>
                    <span className="mx-2">{t('sidebar.board')}</span>
                  </NavLink>
                </li>
                <li className="asideList border-bottom">
                  <NavLink to={`/${i18n.language}/share-performance`} className="nestedNavLink" onClick={handleLinkClick}>
                    <span className="mx-2">{t('sidebar.share_performance')}</span>
                  </NavLink>
                </li>
                <li className="asideList border-bottom">
                  <NavLink to={`/${i18n.language}/financial-information`} className="nestedNavLink" onClick={handleLinkClick}>
                    <span className="mx-2">{t('sidebar.financial_info')}</span>
                  </NavLink>
                </li>
                <li className="asideList border-bottom">
                  <NavLink to={`/${i18n.language}/investors-presentation`} className="nestedNavLink" onClick={handleLinkClick}>
                    <span className="mx-2">{t('sidebar.investors_presentation')}</span>
                  </NavLink>
                </li>
                <li className="asideList border-bottom">
                  <NavLink to={`/${i18n.language}/disclosures`} className="nestedNavLink" onClick={handleLinkClick}>
                    <span className="mx-2">{t('sidebar.disclosures')}</span>
                  </NavLink>
                </li>
                <li className="asideList border-bottom">
                  <NavLink to={`/${i18n.language}/corporate-actions`} className="nestedNavLink" onClick={handleLinkClick}>
                    <span className="mx-2">{t('sidebar.corporate_actions')}</span>
                  </NavLink>
                </li>
                <li className="asideList border-bottom">
                  <NavLink to={`/${i18n.language}/major-shareholders`} className="nestedNavLink" onClick={handleLinkClick}>
                    <span className="mx-2">{t('sidebar.major_shareholders')}</span>
                  </NavLink>
                </li>
                <li className="asideList border-bottom">
                  <NavLink to={`/${i18n.language}/business-segments`} className="nestedNavLink" onClick={handleLinkClick}>
                    <span className="mx-2">{t('sidebar.business_segments')}</span>
                  </NavLink>
                </li>
                <li className="asideList border-bottom">
                  <NavLink to={`/${i18n.language}/projects`} className="nestedNavLink" onClick={handleLinkClick}>
                    <span className="mx-2">{t('sidebar.projects')}</span>
                  </NavLink>
                </li>
                <li className="asideList border-bottom">
                  <NavLink to={`/${i18n.language}/mergers-acquisitions`} className="nestedNavLink" onClick={handleLinkClick}>
                    <span className="mx-2">{t('sidebar.merges_acq')}</span>
                  </NavLink>
                </li>
                <li className="asideList border-bottom">
                  <NavLink to={`/${i18n.language}/estimates`} className="nestedNavLink" onClick={handleLinkClick}>
                    <span className="mx-2">{t('sidebar.estimates')}</span>
                  </NavLink>
                </li> 
                <li className="asideList border-bottom">
                <NavLink to={`/${i18n.language}/contact-ir`} className="nestedNavLink" onClick={handleLinkClick}>
                  <span className="mx-2">{t('sidebar.contact_ir')}</span>
                </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

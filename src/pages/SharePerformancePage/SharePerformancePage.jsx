import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";
import "./SharePerformancePage.css";

const SharePerformancePage = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="container-lg">
      <div className="d-flex justify-content-start flex-wrap align-items-center mb-0 tabs">
        <NavLink
          to={`/${i18n.language}/share-performance/chart`}
          className="tablinks border-0 m-2 mb-0 p-2 pb-0"
          end
        >
          <span className="mx-2">{t("sharePerformance.chart.title")}</span>
        </NavLink>

        <NavLink
          to={`/${i18n.language}/share-performance/peers`}
          className="tablinks border-0 m-2 mb-0  p-2 pb-0"
        >
          <span className="mx-2">{t("sharePerformance.peers.title")}</span>
        </NavLink>

        <NavLink
          to={`/${i18n.language}/share-performance/negotiated-deals`}
          className="tablinks border-0 m-2 mb-0  p-2 pb-0 "
        >
          <span className="mx-2">
            {t("sharePerformance.negotiated_deals.title")}
          </span>
        </NavLink>

        <NavLink
          to={`/${i18n.language}/share-performance/investment-calculator`}
          className="tablinks border-0 m-2 mb-0  p-2 pb-0 "
        >
          <span className="mx-2">
            {t("sharePerformance.investment_calculator.title")}
          </span>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default SharePerformancePage;

import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";

const Peers = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <div className="d-flex justify-content-start align-items-center mb-3 mt-3 tabs bg-light pb-3">
        <NavLink
          to={`/${i18n.language}/share-performance/peers/general`}
          className="tablinks border-0 m-2 mb-0 p-2 pb-0"
          end
        >
          <span className="mx-2">
            {t("sharePerformance.peers.general.title")}
          </span>
        </NavLink>

        <NavLink
          to={`/${i18n.language}/share-performance/peers/ranking`}
          className="tablinks border-0 m-2 mb-0  p-2 pb-0"
        >
          <span className="mx-2">
            {t("sharePerformance.peers.ranking.title")}
          </span>
        </NavLink>

        <NavLink
          to={`/${i18n.language}/share-performance/peers/growth`}
          className="tablinks border-0 m-2 mb-0  p-2 pb-0 "
        >
          <span className="mx-2">
            {t("sharePerformance.peers.growth.title")}
          </span>
        </NavLink>

        <NavLink
          to={`/${i18n.language}/share-performance/peers/market-performance`}
          className="tablinks border-0 m-2 mb-0  p-2 pb-0 "
        >
          <span className="mx-2">
            {t("sharePerformance.peers.marketPerformance.title")}
          </span>
        </NavLink>
        <NavLink
          to={`/${i18n.language}/share-performance/peers/per-share-data`}
          className="tablinks border-0 m-2 mb-0  p-2 pb-0 "
        >
          <span className="mx-2">
            {t("sharePerformance.peers.perShareData.title")}
          </span>
        </NavLink>
        <NavLink
          to={`/${i18n.language}/share-performance/peers/salaries-benefits`}
          className="tablinks border-0 m-2 mb-0  p-2 pb-0 "
        >
          <span className="mx-2">
            {t("sharePerformance.peers.salariesBenefits.title")}
          </span>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default Peers;

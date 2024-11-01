import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";
import "./DisclosuresPage.css";

const DisclosuresPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="container-lg">
      <div className="d-flex justify-content-start flex-wrap align-items-center mb-0 tabs">
        <NavLink
          to={`/${i18n.language}/disclosures/latest-news`}
          className="tablinks border-0 m-2 mb-0 p-2 pb-0"
          end
        >
          <span className="mx-2">{t("disclosures.latest_news.mainTitle")}</span>
        </NavLink>

        <NavLink
          to={`/${i18n.language}/disclosures/disc`}
          className="tablinks border-0 m-2 mb-0  p-2 pb-0"
        >
          <span className="mx-2">{t("disclosures.disc.title")}</span>
        </NavLink>

        {/* <NavLink
          to={`/${i18n.language}/disclosures/earnings`}
          className="tablinks border-0 m-2 mb-0  p-2 pb-0 "
        >
          <span className="mx-2">{t("overview.earnings.title")}</span>
        </NavLink> */}

        <NavLink
          to={`/${i18n.language}/disclosures/events`}
          className="tablinks border-0 m-2 mb-0  p-2 pb-0 "
        >
          <span className="mx-2">{t("overview.events.mainTitle")}</span>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default DisclosuresPage;

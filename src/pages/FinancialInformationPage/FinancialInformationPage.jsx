import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";
import "./FinancialInformationPage.css";

const FinancialInformationPage = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="container-lg">
      <div className="d-flex justify-content-start flex-wrap align-items-center mb-0 tabs">
        <NavLink
          to={`/${i18n.language}/financial-information/financial-statements`}
          className="tablinks border-0 m-2 mb-0 p-2 pb-0"
          end
        >
          <span className="mx-2">{t("financialInformation.statements")}</span>
        </NavLink>

        <NavLink
          to={`/${i18n.language}/financial-information/ratios`}
          className="tablinks border-0 m-2 mb-0  p-2 pb-0"
        >
          <span className="mx-2">{t("financialInformation.ratios")}</span>
        </NavLink>

        <NavLink
          to={`/${i18n.language}/financial-information/reports`}
          className="tablinks border-0 m-2 mb-0  p-2 pb-0 "
        >
          <span className="mx-2">{t("financialInformation.reports")}</span>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default FinancialInformationPage;

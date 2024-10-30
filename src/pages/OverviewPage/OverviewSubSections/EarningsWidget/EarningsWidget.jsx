import "./EarningsWidget.css";
import { useTranslation } from "react-i18next";

const EarningsWidget = ({ data }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="border border-top-0">
      <h6 className="p-2 main-title">{t("overview.earnings.title")}</h6>
      <hr className="m-2 mb-0 icons-color" />
      <div className="container-lg table-responsive p-0">
        <table className="table hover fs-14">
          <thead className="table-light">
            <tr>
              <th>{t("overview.earnings.report")}</th>
              <th>{t("overview.earnings.interim")}</th>
              <th>{t("overview.earnings.year")}</th>
            </tr>
          </thead>
          <tbody>
            {data.earnings.slice(0, 3).map((earning, index) => (
              <tr key={index}>
                <td>
                  <a
                    className="text-decoration-none text-dark fs-14"
                    href={
                      i18n.language === "ar"
                        ? earning.fileURLAr
                        : earning.fileURLEn
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {earning.title}
                  </a>
                </td>
                <td className="value">
                  {t(`overview.earnings.fiscalPeriods.${earning.fiscalValue}`)}
                </td>
                <td>{earning.forYear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EarningsWidget;

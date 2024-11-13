import { useTranslation } from "react-i18next";
import MoreButton from "../../../../components/MoreButton";

const FinancialRatiosWidget = ({ data }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="border border-top-0">
      <h6 className="p-2 main-title">{t("overview.financial_ratios.title")}</h6>
      <hr className="m-2 mb-0 icons-color" />
      <div className="container-lg">
        <table className="table table-striped mb-0">
          <tbody>
            {data.financialRatios.fields?.map((field) => (
              <tr key={field.ratioName}>
                <th>{i18n.language === "ar" ? field.nameAr : field.nameEn}:</th>
                <td
                  style={{
                    color: field.values.value < 0 ? "red" : null,
                    textAlign: "end",
                    [i18n.language === "ar" ? "paddingLeft" : "paddingRight"]:
                      "50px",
                  }}
                >
                  {field.values.value < 0
                    ? `(${Math.abs(field.values.value)})`
                    : field.values.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <MoreButton path="financial-information" />
      </div>
    </div>
  );
};

export default FinancialRatiosWidget;

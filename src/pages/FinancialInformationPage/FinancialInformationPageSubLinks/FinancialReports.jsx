import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../../services/getToken";
import { useTranslation } from "react-i18next";

const FinancialReports = () => {
  const { t, i18n } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ["FinancialReports"],
    queryFn: async () => {
      // Ensure token is valid
      const token = await getToken();

      if (!token) {
        throw new Error("Unable to authenticate");
      }
      // Get Reports Data
      const res = await axios.get(
        `https://data.argaam.com/api/v1.0/json/ir-api/financial-results/${i18n.language}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Encoding": "gzip",
          },
        }
      );

      return res.data;
    },
  });

  if (isLoading) return <div>{t("title.loading")}</div>;

  const reportsArray = Array.isArray(data.financialResults)
    ? data.financialResults
    : [];

  const reportLinks = [
    { key: "q1", label: t("financialInformation.financialReports.Q1") },
    { key: "q2", label: t("financialInformation.financialReports.Q2") },
    { key: "q3", label: t("financialInformation.financialReports.Q3") },
    { key: "q4", label: t("financialInformation.financialReports.Q4") },
    { key: "annual", label: t("financialInformation.financialReports.annual") },
    {
      key: "management",
      label: t("financialInformation.financialReports.boardReport"),
    },
  ];

  const renderReportLinks = (item) => {
    return reportLinks.map(({ key }) => (
      <td key={key}>
        {item[`${key}ar`] || item[`${key}en`] ? (
          <>
            <h5 className="text-danger p-0 d-inline">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"></path>
                <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z"></path>
              </svg>
            </h5>
            <a
              className="p-1 header-title"
              href={item[`${key}ar`]}
              target="_blank"
              rel="noreferrer"
            >
              AR
            </a>
            <a
              className="p-1 header-title"
              href={item[`${key}en`]}
              target="_blank"
              rel="noreferrer"
            >
              EN
            </a>
          </>
        ) : (
          "-"
        )}
      </td>
    ));
  };

  return (
    <div className="container-lg pb-3 mt-3">
      <div>
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <td>{t("financialInformation.financialReports.year")}</td>
              {reportLinks.map(({ key, label }) => (
                <td key={key}>{label}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {reportsArray.map((item, index) => (
              <tr key={index}>
                <td>{item.year}</td>
                {renderReportLinks(item)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialReports;

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../services/getToken.js";
import { useTranslation } from "react-i18next";

const ProjectsPage = () => {
  const { t, i18n } = useTranslation();

  const getQuarterAndYear = (dateString, language) => {
    const [monthStr, yearStr] = dateString.split("-");
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    if (isNaN(month) || isNaN(year)) {
      return t("projects.NYD");
    }

    if (month === 0) {
      return `${year}`;
    }

    const quarter = Math.ceil(month / 3);
    const quarterNamesEn = ["Q1", "Q2", "Q3", "Q4"];
    const quarterNamesAr = [
      "الربع الأول",
      "الربع الثاني",
      "الربع الثالث",
      "الربع الرابع",
    ];
    const quarterName =
      language === "ar"
        ? quarterNamesAr[quarter - 1]
        : quarterNamesEn[quarter - 1];
    return `${quarterName} ${year}`;
  };

  const getQuarterAndYearCompletion = (dateString, language) => {
    const parts = dateString.split("-");

    if (parts.length === 1) {
      const year = parseInt(parts[0], 10);
      return isNaN(year) ? "-" : `${year}`; // Return the year if only the year is provided
    }

    const [monthStr, yearStr] = parts;
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    if (isNaN(month) || isNaN(year)) {
      return "-"; // Return a dash if the date is invalid
    }

    if (month === 0) {
      return `${year}`; // Return only the year if the month is 0
    }

    const quarter = Math.ceil(month / 3);
    const quarterNamesEn = ["Q1", "Q2", "Q3", "Q4"];
    const quarterNamesAr = [
      "الربع الأول",
      "الربع الثاني",
      "الربع الثالث",
      "الربع الرابع",
    ];
    const quarterName =
      language === "ar"
        ? quarterNamesAr[quarter - 1]
        : quarterNamesEn[quarter - 1];
    return `${quarterName} ${year}`;
  };

  // == Get Projects Data
  const { data, isLoading } = useQuery({
    queryKey: ["ProjectsPageData"],
    queryFn: async () => {
      // Ensure token is valid
      const token = await getToken();

      if (!token) {
        throw new Error("Unable to authenticate");
      }

      // Get Projects Data
      const res = await axios.get(
        `https://data.argaam.com/api/v1.0/json/ir-api/projects-news/${i18n.language}`,
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

  // == isLoading
  if (isLoading) return <div>{t("title.loading")}</div>;
  // == isLoading

  const projectsArray = Array.isArray(data.projects)
    ? data.projects
    : [data.projects];

  return (
    <div className="container-lg">
      <table className="table">
        <thead
          className="table-light table-hover"
          style={{ verticalAlign: "middle" }}
        >
          <tr>
            <th>{t("projects.date")}</th>
            <th>{t("projects.projects")}</th>
            <th>{t("projects.country")}</th>
            <th>{t("projects.status")}</th>
            <th>{t("projects.start")}</th>
            <th>{t("projects.completion")}</th>
          </tr>
        </thead>
        <tbody>
          {projectsArray.map((item, index) => (
            <tr key={index}>
              <td>{new Date(item.announcedDate).toLocaleDateString()}</td>
              <td>
                {i18n.language === "ar"
                  ? item.projectNameAr
                  : item.projectNameEn}
              </td>
              <td>
                {i18n.language === "ar"
                  ? item.countryNameAr
                  : item.countryNameEn}
              </td>
              <td>
                {i18n.language === "ar"
                  ? item.projectStatusNameAr
                  : item.projectStatusNameEn}
              </td>
              <td>{getQuarterAndYear(item.startDate, i18n.language)}</td>
              <td>
                {getQuarterAndYearCompletion(
                  item.expectedCompletionDate,
                  i18n.language
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsPage;

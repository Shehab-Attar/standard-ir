import axios from "axios";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getToken } from "../../services/getToken";

const ArgaamReportsDetailsPage = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["argaamReports", id, i18n.language],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("Unable to authenticate");
      }
      const res = await axios.get(
        `https://data.argaam.com/api/v1.0/json/ir-api/overview/${i18n.language}`,
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
  const foundReports = data?.argaamReports.find(
    (d) => d.articleID === parseInt(id)
  );

  if (isLoading) {
    return <div>{t("title.loading")}</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!foundReports) {
    return <div>Error loading reports details.</div>;
  }

  return (
    <div className="disclosure-details">
      <div dangerouslySetInnerHTML={{ __html: foundReports.body }} />
    </div>
  );
};

export default ArgaamReportsDetailsPage;

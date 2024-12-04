import axios from "axios";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getToken } from "../../services/getToken";
import "./DetailsPagesCSS.css";
const AnalystEstimatesDetailsPage = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["estimates", i18n.language],
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
  const foundEstimates = data?.analystEstimates.find(
    (d) => d.articleID === parseInt(id)
  );

  if (isLoading) {
    return <div>{t("title.loading")}</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!foundEstimates) {
    return <div>Error loading estimates details.</div>;
  }

  return (
    <div className="details-page">
      <div dangerouslySetInnerHTML={{ __html: foundEstimates.body }} />
    </div>
  );
};

export default AnalystEstimatesDetailsPage;

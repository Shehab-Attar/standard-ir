import axios from "axios";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getToken } from "../../services/getToken";
import "./DetailsPagesCSS.css";
const DisclosureDetailsPage = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["disclosure", i18n.language],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("Unable to authenticate");
      }
      const res = await axios.get(
        `https://data.argaam.com/api/v1/json/ir-widget/disclosures-articles-with-body/${i18n.language}`,
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
  const foundDisclosure = data?.find((d) => d.articleID === parseInt(id));

  if (isLoading) {
    return <div>{t("title.loading")}</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!foundDisclosure) {
    return <div>Error loading disclosure details.</div>;
  }

  return (
    <div className="details-page">
      <div dangerouslySetInnerHTML={{ __html: foundDisclosure.body }} />
    </div>
  );
};

export default DisclosureDetailsPage;

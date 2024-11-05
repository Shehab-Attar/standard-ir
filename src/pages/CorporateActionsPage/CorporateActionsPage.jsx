import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../services/getToken.js";
import { useTranslation } from "react-i18next";
import "./CorporateActionsPage.css";

//sub sections
import CapitalChange from "./CorporateActionsPageSubSections/CapitalChange";
import RecentChanges from "./CorporateActionsPageSubSections/RecentChanges";
import RecentDividends from "./CorporateActionsPageSubSections/RecentDividends";
import CapitalChangeHistory from "./CorporateActionsPageSubSections/CapitalChangeHistory";
import CapitalDividendHistory from "./CorporateActionsPageSubSections/CapitalDividendHistory";
import HistoricalDividends from "./CorporateActionsPageSubSections/HistoricalDividends";
const CorporateActionsPage = () => {
  const { t, i18n } = useTranslation();

  // == Get Corporate Actions Data
  const { data, isLoading } = useQuery({
    queryKey: ["CorporateActionsPageData"],
    queryFn: async () => {
      // Ensure token is valid
      const token = await getToken();

      if (!token) {
        throw new Error("Unable to authenticate");
      }

      // Get Corporate Actions Data
      const res = await axios.get(
        `https://data.argaam.com/api/v1.0/json/ir-api/corporate-actions/${i18n.language}`,
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

  return (
    <div className="container-lg ">
      <CapitalChange data={data} />
      <HistoricalDividends data={data} />
      <RecentChanges data={data} />
      <RecentDividends data={data} />
      <CapitalChangeHistory data={data} />
      <CapitalDividendHistory data={data} />
    </div>
  );
};

export default CorporateActionsPage;

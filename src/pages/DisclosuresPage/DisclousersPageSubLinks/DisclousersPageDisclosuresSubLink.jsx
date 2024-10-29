import axios from "axios";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../../services/getToken";
import { useState } from "react";

const DisclousersPageDisclosuresSubLink = () => {
  const { t, i18n } = useTranslation();
  const [selectedDisclosure, setSelectedDisclosure] = useState(null);
  const { data } = useQuery({
    queryKey: ["DisclousersPageDisclosuresSubLink"],
    queryFn: async () => {
      // Ensure token is valid
      const token = await getToken();

      if (!token) {
        throw new Error("Unable to authenticate");
      }
      // Get Overview Data
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

  const handleDisclosureClick = (disclosure) => {
    setSelectedDisclosure(disclosure);
  };

  return (
    <div>
      <div className="continer-lg my-1 mx-0 px-0">
        <div className="container-lg my-3 table-responsive ">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>{t("disclosures_latest_news.date")}</th>
                <th>{t("disclosures_disc.title")}</th>
                <th>{t("disclosures_latest_news.source")}</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ minWidth: "100px" }}>
                    {item.publishedOn.split(" ")[0]}
                  </td>
                  <td style={{ minWidth: "135px", cursor: "pointer" }}>
                    <span onClick={() => handleDisclosureClick(item)}>
                      {item.title}
                    </span>
                  </td>
                  <td style={{ width: "150px" }}>{item.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DisclousersPageDisclosuresSubLink;

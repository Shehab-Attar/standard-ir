import axios from "axios";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../../services/getToken";
import { useNavigate } from "react-router-dom";
import "../DisclosuresPage.css";

const DisclousersPageDisclosuresSubLink = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
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

  return (
    <div>
      <div className="continer-lg my-1 mx-0 px-0">
        <div className="container-lg my-3 table-responsive ">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>{t("disclosures.latest_news.date")}</th>
                <th>{t("disclosures.disc.title")}</th>
                <th>{t("disclosures.latest_news.source")}</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.publishedOn.split(" ")[0]}</td>
                  <td style={{ minWidth: "650px", cursor: "pointer" }}>
                    <span
                      onClick={() =>
                        navigate(
                          `/${i18n.language}/disclosures/${item.articleID}`
                        )
                      }
                    >
                      {item.title}
                    </span>
                  </td>
                  <td>{item.source}</td>
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

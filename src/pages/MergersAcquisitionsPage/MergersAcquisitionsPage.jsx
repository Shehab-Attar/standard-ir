import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../services/getToken.js";
import { useTranslation } from "react-i18next";

const MergersAcquisitionsPage = () => {
  const { t, i18n } = useTranslation();

  // == Get MergersAcquisitions Data
  const { data, isLoading } = useQuery({
    queryKey: ["MergersAcquisitionsPageData"],
    queryFn: async () => {
      // Ensure token is valid
      const token = await getToken();

      if (!token) {
        throw new Error("Unable to authenticate");
      }

      // Get MergersAcquisitions Data
      const res = await axios.get(
        `https://data.argaam.com/api/v1.0/json/ir-api/MergersAndAcquisitions/${i18n.language}`,
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
    <div className="container-lg">
      <table className="table">
        <thead
          className="table-light table-hover"
          style={{ verticalAlign: "middle" }}
        >
          <tr>
            <th>{t("mergersAcquisitions.date")}</th>
            <th>{t("mergersAcquisitions.firstParty")}</th>
            <th>{t("mergersAcquisitions.secondParty")}</th>
            <th>{t("mergersAcquisitions.relatedParties")}</th>
            <th>{t("mergersAcquisitions.value")}</th>
            <th>{t("mergersAcquisitions.type")}</th>
            <th>{t("mergersAcquisitions.status")}</th>
          </tr>
        </thead>
        <tbody>
          {/* {data.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default MergersAcquisitionsPage;

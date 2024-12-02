import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getToken } from "../../services/getToken.js";
import "./MajorShareholdersPage.css";
import MajorShareholders from "./MajorShareholdersPageSubPages/MajorShareholders.jsx";
import HistoricalChanges from "./MajorShareholdersPageSubPages/HistoricalChanges.jsx";

const MajorShareholdersPage = () => {
  const { t, i18n } = useTranslation();

  // == Get Major Shareholders Data
  const { data, isLoading } = useQuery({
    queryKey: ["MajorPageData"],
    queryFn: async () => {
      // Ensure token is valid
      const token = await getToken();

      if (!token) {
        throw new Error("Unable to authenticate");
      }

      // Get profile Data
      const res = await axios.get(
        `https://data.argaam.com/api/v1.0/json/ir-api/major-shareholders/${i18n.language}`,
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
  // == Get Major Shareholders Data

  //isLoading
  if (isLoading) return <div>{t("title.loading")}</div>;
  //isLoading

  return (
    <div className="container-lg my-1">
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li
            className="d-flex justify-content-evenly flex-wrap align-items-center mb-3 tabs"
            role="presentation"
          >
            <button
              className="nav-link active rounded-0 fs-14"
              id="majorShareholders"
              data-bs-toggle="tab"
              data-bs-target="#majorShareholders-pane"
              type="button"
              role="tab"
              aria-controls="majorShareholders-pane"
              aria-selected="true"
            >
              {t("major_shareholders.majorShareholders")}
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link rounded-0 fs-14"
              id="historicalChanges-tab"
              data-bs-toggle="tab"
              data-bs-target="#historicalChanges-pane"
              type="button"
              role="tab"
              aria-controls="historicalChanges-pane"
              aria-selected="false"
            >
              {t("major_shareholders.historicalChanges")}
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane active mx-0 border-0"
            id="majorShareholders-pane"
            role="tabpanel"
            aria-labelledby="majorShareholders-tab"
          >
            <MajorShareholders data={data} />
          </div>
          <div
            className="tab-pane fade mx-0 border-0"
            id="historicalChanges-pane"
            role="tabpanel"
            aria-labelledby="historicalChanges-tab"
          >
            <HistoricalChanges data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MajorShareholdersPage;

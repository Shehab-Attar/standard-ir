import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../services/getToken.js";
import { useTranslation } from "react-i18next";
import "./BoardManagementPage.css";

// Sub Tabs
import Board from "./BoardManagementTabs/Board.jsx";
import Executives from "./BoardManagementTabs/Executives.jsx";
import Salaries from "./BoardManagementTabs/Salaries.jsx";

const BoardManagementPage = () => {
  const { t } = useTranslation();

  // == Get Board & Management Data
  const { data, isLoading } = useQuery({
    queryKey: ["boardManagementPageData"],
    queryFn: async () => {
      // Ensure token is valid
      const token = await getToken();

      if (!token) {
        throw new Error("Unable to authenticate");
      }

      // Get Board & Management Data
      const res = await axios.get(
        `https://data.argaam.com/api/v1/json/ir-api/organizational-structure`,
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
      <div
        id="mytab"
        role="tablist"
        className="d-flex justify-content-between flex-wrap align-items-center mb-3 tabs"
      >
        <div className="d-flex">
          <div
            type="button"
            id="individuals-tab"
            data-bs-toggle="tab"
            aria-controls="individuals"
            data-bs-target="#individuals"
            className="header-title tablinks border-0 m-2 mb-0  p-2 pb-0 active"
          >
            {t("boardManagement.board")}
          </div>
          <div
            type="button"
            id="executives-tab"
            data-bs-toggle="tab"
            aria-controls="executives"
            data-bs-target="#executives"
            className="header-title tablinks border-0 m-2 mb-0  p-2 pb-0"
          >
            {t("boardManagement.executives")}
          </div>
          <div
            type="button"
            id="salaries-tab"
            data-bs-toggle="tab"
            aria-controls="salaries"
            data-bs-target="#salaries"
            className="header-title tablinks border-0 m-2 mb-0  p-2 pb-0"
          >
            {t("boardManagement.salaries")}
          </div>
        </div>
      </div>
      <div className="tab-content " id="pills-tabContent">
        <div
          className="tab-pane border-0 fade m-0 p-0 active show"
          id="individuals"
          role="tabpanel"
          aria-labelledby="individuals-tab"
        >
          <Board data={data} />
        </div>
        <div
          className="tab-pane border-0 fade m-0 p-0"
          id="executives"
          role="tabpanel"
          aria-labelledby="executives-tab"
        >
          <Executives data={data} />
        </div>
        <div
          className="tab-pane border-0 fade m-0 p-0"
          id="salaries"
          role="tabpanel"
          aria-labelledby="salaries-tab"
        >
          <Salaries data={data} />
        </div>
      </div>
    </div>
  );
};

export default BoardManagementPage;

import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../services/getToken";
import { useTranslation } from "react-i18next";
import AnalystEstimates from "./EstimatesPageSubPages/AnalystEstimates";
import Opinions from "./EstimatesPageSubPages/Opinions";
import "./EstimatesPage.css";
const EstimatesPage = () => {
  const { t } = useTranslation();

  const [periodType, setPeriodType] = useState("year");
  const { data, isLoading } = useQuery({
    queryKey: ["estimatesPageData", periodType],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("Unable to authenticate");
      }
      const res = await axios.get(
        `https://data.argaam.com/api/v1/json/ir-api/get-analyst-estimates?fiscalPeriodType=${periodType}`,
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

  if (isLoading) return <div>{t("title.loading")}</div>;

  return (
    <div className="container-lg mt-2">
      <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
        <li className="d-flex justify-content-evenly " role="presentation">
          <button
            className="nav-link active rounded-0 fs-14"
            id="analyst-tab"
            data-bs-toggle="tab"
            data-bs-target="#analyst-pane"
            type="button"
            role="tab"
            aria-controls="analyst-pane"
            aria-selected="true"
          >
            {t("estimates.analystEstimates.title")}
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link rounded-0 fs-14"
            id="opinions-tab"
            data-bs-toggle="tab"
            data-bs-target="#opinions-pane"
            type="button"
            role="tab"
            aria-controls="opinions-pane"
            aria-selected="false"
          >
            {t("estimates.opinions.title")}
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="analyst-pane"
          role="tabpanel"
          aria-labelledby="analyst-tab"
        >
          <AnalystEstimates
            data={data}
            periodType={periodType}
            setPeriodType={setPeriodType}
          />
        </div>
        <div
          className="tab-pane fade"
          id="opinions-pane"
          role="tabpanel"
          aria-labelledby="opinions-tab"
        >
          <Opinions data={data} />
        </div>
      </div>
    </div>
  );
};

export default EstimatesPage;

import axios from "axios";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../services/getToken";
import { formatChange } from "../../utils/Helpers";
import { Spin } from "antd";
import "./CompanyInfo.css";

const CompanyInfo = () => {
  const { i18n } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ["companyInfo"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("Unable to authenticate");
      }
      const res = await axios.get(
        `https://data.argaam.com/api/v1/json/ir-widget/stock-summary`,
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

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div className="container-lg mb-2 px-xl-0">
      <div className="d-flex border-bottom flex-wrap">
        <div className="p-3 bg-light fs-4 fw-bold text-secondary d-flex align-items-center">
          <span className="dynamicTitle">1820</span>
        </div>
        <div className="px-lg-3 fw-bold">
          <div className="main-title fw-bold dynamicTitle">
            {i18n.language === "ar" ? data?.shortNameAr : data?.shortNameEn}
            &nbsp; (
            {i18n.language === "ar" ? data?.shortNameAr : data?.shortNameEn})
          </div>
          <div className="dynamicTitle mb-1">
            <span style={{ color: "black" }}>
              {formatChange(data?.closeValue)}
            </span>
            <span className="mx-1">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                color="#198754"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  color: data?.change > 0 ? "rgb(25, 135, 84)" : "red",
                }}
                transform={`rotate(${data?.change > 0 ? 0 : 180}, 0, 0)`}
              >
                <path d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm292 116V256h70.9c10.7 0 16.1-13 8.5-20.5L264.5 121.2c-4.7-4.7-12.2-4.7-16.9 0l-115 114.3c-7.6 7.6-2.2 20.5 8.5 20.5H212v116c0 6.6 5.4 12 12 12h64c6.6 0 12-5.4 12-12z"></path>
              </svg>
            </span>
            <span
              className="mx-1"
              style={{ color: data?.change > 0 ? "green" : "red" }}
            >
              ({formatChange(data?.change)})
            </span>
            <span
              className="mx-1"
              style={{ color: data?.change > 0 ? "green" : "red" }}
            >
              ({formatChange(data?.percentageChange)} %)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;

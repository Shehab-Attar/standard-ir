import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../services/getToken";
import { useTranslation } from "react-i18next";
import { formatChange } from "../../utils/Helpers";
import Marquee from "react-fast-marquee";
import dayjs from "dayjs";
import "./Footer.css";

const Footer = () => {
  const { t, i18n } = useTranslation();

  // == Get Ticker Data
  const { data, isLoading } = useQuery({
    queryKey: ["footerTickerData"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("Unable to authenticate");
      }
      const res = await axios.get(
        `https://data.argaam.com/api/v1.0/json/ir-widget/footer-ticker/${i18n.language}`,
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
  // == Get Ticker Data

  // == isLoading
  if (isLoading) return <div>{t("title.loading")}</div>;
  // == isLoading

  const tickerDataArray = Array.isArray(data) ? data : [data];

  return (
    <div className={`marquee-container ${i18n.language === "ar" ? "rtl" : ""}`}>
      <Marquee
        direction={i18n.language === "en" ? "left" : "right"}
        speed={100}
        pauseOnHover={true}
        autoFill={true}
        loop={0}
        gradient={true}
        gradientWidth={60}
        gradientColor={"#597d79"}
      >
        <ul className="ticker-bar">
          {tickerDataArray.map((tickerData, index) => (
            <li key={index} className="ticker-item">
              <h6 className="m-0 text-uppercase">{t("ticker.lastPrice")}:</h6>
              <span
                className={`text-bg-success ${
                  tickerData.price.change > 0
                    ? "text-bg-success"
                    : "text-bg-danger"
                }`}
              >
                {formatChange(tickerData.price.closeValue)}
              </span>
              <h6 className="m-0 text-uppercase">{t("ticker.high")}:</h6>
              <span
                className={`text-bg-success ${
                  tickerData.price.change > 0
                    ? "text-bg-success"
                    : "text-bg-danger"
                }`}
              >
                {formatChange(tickerData.price.high)}
              </span>
              <h6 className="m-0 text-uppercase">{t("ticker.low")}:</h6>
              <span
                className={`text-bg-success ${
                  tickerData.price.change > 0
                    ? "text-bg-success"
                    : "text-bg-danger"
                }`}
              >
                {formatChange(tickerData.price.low)}
              </span>
              <h6 className="m-0 text-uppercase">{t("ticker.change")}:</h6>
              <span
                className={`text-bg-success ${
                  tickerData.price.change > 0
                    ? "text-bg-success"
                    : "text-bg-danger"
                }`}
              >
                {formatChange(tickerData.price.change)}
              </span>
              <h6 className="m-0 text-uppercase">{t("ticker.change%")}:</h6>
              <span
                className={`text-bg-success ${
                  tickerData.price.percentageChange > 0
                    ? "text-bg-success"
                    : "text-bg-danger"
                }`}
              >
                {formatChange(tickerData.price.percentageChange)}
              </span>
              <h6 className="m-0 text-uppercase">
                <span className="custom-bac px-2 mx-3">
                  {t("ticker.latestNews")}:
                </span>
                {tickerData.news.title}
              </h6>
              <h6 className="m-0 text-uppercase">
                <span className="custom-bac px-2 mx-3">
                  {t("ticker.calendar")}:
                </span>
                {i18n.language === "en"
                  ? tickerData.calendarEvent.typeNameEn
                  : tickerData.calendarEvent.typeNameAr}
                <span className="border px-2 mx-3 text-bg-dark">
                  {dayjs(tickerData.calendarEvent.occursOn).format(
                    "DD-MM-YYYY"
                  )}
                </span>
              </h6>
            </li>
          ))}
        </ul>
      </Marquee>
    </div>
  );
};

export default Footer;

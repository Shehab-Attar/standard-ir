import { useTranslation } from "react-i18next";
import "./Footer.css";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="footer text-center py-2">
      <a href="https://www.argaam.com" target="_blank">
        <span className="poweredBy">{t("title.poweredBy")}</span>
        <span className="Argaam" style={{ color: "rgb(238, 123, 11)" }}>
          Argaam.com
        </span>
      </a>
    </div>
  );
};

export default Footer;

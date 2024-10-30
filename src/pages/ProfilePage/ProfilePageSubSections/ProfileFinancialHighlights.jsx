import { useTranslation } from "react-i18next";
import "../ProfilePage.css";
const ProfileFinancialHighlights = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className="continer corporate-actions my-3 mx-0 px-0">
      <div className="highlights-header d-flex justify-content-between align-items-center">
        <h6 className="m-0 p-0 mx-2 profile-title">
          {t("profile.financialHighlights.title")}
        </h6>
        <div className="d-flex m-0 rounded btnsBoarder">
          <button
            id="usdButton"
            value="usd"
            data-bs-toggle="button"
            className="btn rounded CurrBtn"
            aria-pressed="false"
            onClick={() => {
              document.getElementById("sarButton").classList.remove("active");
              document
                .getElementById("sarButton")
                .setAttribute("aria-pressed", "false");
              document.getElementById("usdButton").classList.add("active");
              document
                .getElementById("usdButton")
                .setAttribute("aria-pressed", "true");
            }}
          >
            {t("profile.financialHighlights.usd")}
          </button>
          <button
            id="sarButton"
            value="sar"
            data-bs-toggle="button"
            className="btn rounded CurrBtn active"
            aria-pressed="true"
            onClick={() => {
              document.getElementById("usdButton").classList.remove("active");
              document
                .getElementById("usdButton")
                .setAttribute("aria-pressed", "false");
              document.getElementById("sarButton").classList.add("active");
              document
                .getElementById("sarButton")
                .setAttribute("aria-pressed", "true");
            }}
          >
            {t("profile.financialHighlights.riyal")}
          </button>
        </div>
        <hr className="m-2 mb-0 icons-color" />
      </div>
    </div>
  );
};

export default ProfileFinancialHighlights;

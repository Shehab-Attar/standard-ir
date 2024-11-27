import { useTranslation } from "react-i18next";
import MoreButton from "../../../../components/MoreButton";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../../../services/getToken";
import axios from "axios";

const DisclousersWidget = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["DisclousersWidget"],
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
    <>
      <div className="border border-top-0">
        <h6 className="p-2 main-title">
          {t("overview.disclosures.mainTitle")}
        </h6>

        <hr className="m-2 mb-0 icons-color" />

        <div className="fs-14">
          {data?.slice(0, 3).map((elm, idx) => {
            return (
              <div key={idx} className="p-1 px-2 border-bottom">
                <span
                  className="news-title link-color hovered fs-14"
                  onClick={() =>
                    navigate(`/${i18n.language}/disclosures/${elm.articleID}`)
                  }
                >
                  {elm.title}
                </span>

                <p className="m-0">
                  <span className="text-secondary">
                    {elm.articleSourceName}
                  </span>
                  <span className="mx-2">{elm.publishedOn.split(" ")[0]}</span>
                </p>
              </div>
            );
          })}
        </div>

        <MoreButton path="disclosures/disc" />
      </div>
      {/* Modal */}
      {/* <div
        className="modal fade"
        id="disclosure-modal"
        tabIndex="-1"
        aria-labelledby="disclosure-modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="disclosure-modal-label">
                {data?.discloser?.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body fs-14" id="disclosure-modal-body">
              <div className="mt-3">
                <h6 className="mb-2">{t("events.details")}</h6>
                <div
                  dangerouslySetInnerHTML={{ __html: selectedDisclosure?.body }}
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* End Modal */}
    </>
  );
};

export default DisclousersWidget;

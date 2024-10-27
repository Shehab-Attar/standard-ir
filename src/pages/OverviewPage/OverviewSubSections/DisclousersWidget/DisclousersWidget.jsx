import { useTranslation } from "react-i18next";
import { useState } from "react";
import MoreButton from "../../../../components/MoreButton";

const DisclousersWidget = ({ data }) => {
  const { t } = useTranslation();
  const [selectedDisclosure, setSelectedDisclosure] = useState(null);

  const handleDisclosureClick = (disclosure) => {
    setSelectedDisclosure(disclosure);
  };

  return (
    <>
      <div className="border border-top-0">
        <h6 className="p-2 main-title">{t("disclosures.mainTitle")}</h6>

        <hr className="m-2 mb-0 icons-color" />

        <div className="fs-14">
          {data?.discloser.slice(0, 3).map((elm, idx) => {
            return (
              <div key={idx} className="p-1 px-2 border-bottom">
                <span
                  data-bs-toggle="modal"
                  data-bs-target="#disclosure-modal"
                  className="news-title link-color hovered fs-14"
                  onClick={() => handleDisclosureClick(elm)}
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

        <MoreButton path="disclosures" />
      </div>
      {/* Modal */}
      <div
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
      </div>
    </>
  );
};

export default DisclousersWidget;

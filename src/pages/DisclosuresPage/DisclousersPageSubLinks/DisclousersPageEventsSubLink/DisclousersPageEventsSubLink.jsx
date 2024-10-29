import axios from "axios";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../../../services/getToken";
import { useState } from "react";
import "./DisclousersPageEventsSubLink.css";

const DisclousersPageEventsSubLink = () => {
  const { t, i18n } = useTranslation();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const { data } = useQuery({
    queryKey: ["DisclousersPageEventsSubLink"],
    queryFn: async () => {
      // Ensure token is valid
      const token = await getToken();

      if (!token) {
        throw new Error("Unable to authenticate");
      }
      // Get Overview Data
      const res = await axios.get(
        `https://data.argaam.com/api/v1/json/ir-widget/events`,
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
    <div className="container-lg">
      <div className="container-lg m-0 p-0 mb-3 table-responsive">
        {data?.map((item, idx) => (
          <table
            key={idx}
            className="table table-responsive table-hover my-2 fs-14"
          >
            <thead>
              <tr>
                <td className="border border-0  text-start bg-white">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    className="main-title m-2"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5.5 9.5A.5.5 0 0 1 6 9h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"></path>
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"></path>
                  </svg>
                  <span className="main-title mx-2">
                    {new Date(item.occursOn).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })}
                  </span>
                </td>
              </tr>
              <tr className="bg-light shadow-sm table-light border">
                <th>{t("events.event")}</th>
                <th>{t("events.type")}</th>
                <th>{t("events.company")}</th>
                <th>{t("events.venue")}</th>
                <th>{t("events.details")}</th>
              </tr>
            </thead>
            <tbody className="shadow-sm">
              <tr>
                <td style={{ width: 300, minWidth: 250 }}>
                  {i18n.language === "ar" ? item.titleAr : item.titleEn}
                </td>
                <td style={{ width: 200 }}>
                  {i18n.language === "ar" ? item.typeNameAr : item.typeNameEn}
                </td>
                <td>
                  {i18n.language === "ar"
                    ? item.companyNameAr
                    : item.companyNameEn}
                </td>
                <td className="w-25">
                  {i18n.language === "ar"
                    ? item.eventLocationAr
                      ? item.eventLocationAr
                      : "-"
                    : item.eventLocationEn
                    ? item.eventLocationEn
                    : "-"}
                </td>
                <td>
                  <div
                    type="button"
                    className="link-color rounded p-2"
                    onClick={() => handleEventClick(item)}
                    data-bs-toggle="modal"
                    data-bs-target="#events-modal"
                  >
                    {t("events.details")}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
      {/* Modal */}
      <div
        className="modal fade"
        id="events-modal"
        tabIndex="-1"
        aria-labelledby="events-modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="events-modal-label">
                {selectedEvent
                  ? i18n.language === "ar"
                    ? selectedEvent.titleAr
                    : selectedEvent.titleEn
                  : t("events.details")}
              </h5>
              <button
                type="button"
                className={
                  i18n.language === "ar" ? "btn-close ar" : "btn-close en"
                }
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body fs-14" id="events-modal-body">
              {selectedEvent && (
                <div className="container-lg table-responsive">
                  <table className="table mb-0 table-hover">
                    <tbody>
                      <tr>
                        <td>{t("events.market")}</td>
                        <td>
                          {i18n.language === "ar"
                            ? selectedEvent.marketNameAr
                            : selectedEvent.marketNameEn}
                        </td>
                      </tr>
                      <tr>
                        <td>{t("events.company")}</td>
                        <td>
                          {i18n.language === "ar"
                            ? selectedEvent.companyNameAr
                            : selectedEvent.companyNameEn}
                        </td>
                      </tr>
                      <tr>
                        <td>{t("events.date")}</td>
                        <td>
                          {new Date(
                            selectedEvent.occursOn
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                      <tr>
                        <td>{t("events.type")}</td>
                        <td>
                          {i18n.language === "ar"
                            ? selectedEvent.typeNameAr
                            : selectedEvent.typeNameEn}
                        </td>
                      </tr>
                      <tr>
                        <td>{t("events.venue")}</td>
                        <td>
                          {i18n.language === "ar"
                            ? selectedEvent.eventLocationAr
                              ? selectedEvent.eventLocationAr
                              : "-"
                            : selectedEvent.eventLocationEn
                            ? selectedEvent.eventLocationEn
                            : "-"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-3">
                    <h6 className="mb-2">{t("events.details")}</h6>
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          i18n.language === "ar"
                            ? selectedEvent.descriptionAr
                            : selectedEvent.descriptionEn,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* End Modal */}
    </div>
  );
};

export default DisclousersPageEventsSubLink;

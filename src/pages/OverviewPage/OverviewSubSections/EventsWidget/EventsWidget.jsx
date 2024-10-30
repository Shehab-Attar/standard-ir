import React, { useState } from "react";
import "./EventsWidget.css";
import { useTranslation } from "react-i18next";
import MoreButton from "../../../../components/MoreButton";

const EventsWidget = ({ data }) => {
  const { t, i18n } = useTranslation();
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Extract the first four events
  const events = data.events.slice(0, 4);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="border border-top-0">
      <h6 className="p-2 main-title">{t("overview.events.mainTitle")}</h6>
      <hr className="m-2 mb-0 icons-color" />
      <div className="container table-responsive">
        <table className="table mb-0 table-hover">
          <thead className="table-light">
            <tr>
              <th>{t("overview.events.date")}</th>
              <th>{t("overview.events.event")}</th>
              <th>{t("overview.events.venue")}</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.calendarEventID}
                data-bs-toggle="modal"
                data-bs-target="#events-modal"
                onClick={() => handleEventClick(event)}
                style={{ cursor: "pointer" }}
              >
                <td>{new Date(event.occursOn).toLocaleDateString()}</td>
                <td>
                  {i18n.language === "ar" ? event.typeNameAr : event.typeNameEn}
                </td>
                <td className="text-center">
                  {i18n.language === "ar"
                    ? event.eventLocationAr
                      ? event.eventLocationAr
                      : "-"
                    : event.eventLocationEn
                    ? event.eventLocationEn
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <MoreButton path="disclosures/events" />
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
                  : t("overview.events.details")}
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
                        <td>{t("overview.events.market")}</td>
                        <td>
                          {i18n.language === "ar"
                            ? selectedEvent.marketNameAr
                            : selectedEvent.marketNameEn}
                        </td>
                      </tr>
                      <tr>
                        <td>{t("overview.events.company")}</td>
                        <td>
                          {i18n.language === "ar"
                            ? selectedEvent.companyNameAr
                            : selectedEvent.companyNameEn}
                        </td>
                      </tr>
                      <tr>
                        <td>{t("overview.events.date")}</td>
                        <td>
                          {new Date(
                            selectedEvent.occursOn
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                      <tr>
                        <td>{t("overview.events.type")}</td>
                        <td>
                          {i18n.language === "ar"
                            ? selectedEvent.typeNameAr
                            : selectedEvent.typeNameEn}
                        </td>
                      </tr>
                      <tr>
                        <td>{t("overview.events.venue")}</td>
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
                    <h6 className="mb-2">{t("overview.events.details")}</h6>
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
    </div>
  );
};

export default EventsWidget;

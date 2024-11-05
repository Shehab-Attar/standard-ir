import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const Executives = ({ data }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const executivesDataArray = Array.isArray(data.individuals)
    ? data.individuals
    : [data.individuals];

  return (
    <div>
      <div className="row d-flex flex-wrap">
        {executivesDataArray
          .slice(1, executivesDataArray.length)
          .map((item, index) =>
            item.companyPositionTypeNameEn.includes("Executive") ? (
              <div
                className="col-6 my-4"
                key={index}
                style={{
                  cursor:
                    item.resumeHighLightAr || item.resumeHighLightEn
                      ? "pointer"
                      : "default",
                }}
                onClick={() => {
                  const resumeHighlight =
                    i18n.language === "ar"
                      ? item.resumeHighLightAr
                      : item.resumeHighLightEn;
                  if (resumeHighlight) {
                    navigate(
                      `/${i18n.language}/board-management/${item.individualID}`
                    );
                  }
                }}
              >
                <div
                  type="button"
                  className="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-lg-start my-4"
                >
                  {item.profilePicURL ? (
                    <>
                      <img
                        src={item.profilePicURL}
                        className="personImg"
                        alt={i18n.language === "ar" ? item.nameAr : item.nameEn}
                      />
                      <div className="m-3">
                        <h6 className="link-color fw-bold fs-5">
                          {i18n.language === "ar" ? item.nameAr : item.nameEn}
                        </h6>
                        <p className="text-dark fw-normal">
                          {i18n.language === "ar"
                            ? item.positionNameAr
                            : item.positionNameEn}
                        </p>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            ) : null
          )}
      </div>
    </div>
  );
};

export default Executives;

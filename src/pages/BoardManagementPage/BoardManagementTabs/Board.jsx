import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Board = ({ data }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const boardDataArray = Array.isArray(data.individuals)
    ? data.individuals
    : [data.individuals];

  const boardMembers = boardDataArray
    .slice(1, boardDataArray.length)
    .filter((item) => item.companyPositionTypeNameEn === "Board Member");

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? boardMembers.length - 4 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === boardMembers.length - 4 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      {boardDataArray.slice(0, 1).map((item, index) => (
        <div
          type="button"
          className="d-flex flex-wrap flex-md-nowrap my-4 mb-5"
          key={index}
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
          <img
            src={item.profilePicURL}
            className="personImg object-fit-cover"
            alt={i18n.language === "ar" ? item.nameAr : item.nameEn}
          />
          <div className="m-3">
            <h6 className="link-color fw-bold fs-5 fs-4 ">
              {i18n.language === "ar" ? item.nameAr : item.nameEn}
            </h6>
            <p className="text-dark fw-normal">
              {i18n.language === "ar"
                ? item.positionNameAr
                : item.positionNameEn}
            </p>
          </div>
        </div>
      ))}
      <div className="slider d-flex align-items-center">
        <button
          className="prev"
          onClick={handlePrev}
          style={{ height: "200px" }}
        >
          &#10094;
        </button>
        <div className="slider-container d-flex">
          {boardMembers
            .slice(currentIndex, currentIndex + 4)
            .map((item, index) => {
              const resumeHighlight =
                i18n.language === "ar"
                  ? item.resumeHighLightAr
                  : item.resumeHighLightEn;

              return (
                <div className="slider-item text-center" key={index}>
                  <img
                    src={item.profilePicURL}
                    className="personImg object-fit-cover"
                    alt={i18n.language === "ar" ? item.nameAr : item.nameEn}
                  />
                  <div className="info mt-2">
                    <h6
                      className="board-members-name link-color fw-bold"
                      style={{
                        cursor: resumeHighlight ? "pointer" : "default",
                      }}
                      onClick={() => {
                        if (resumeHighlight) {
                          navigate(
                            `/${i18n.language}/board-management/${item.individualID}`
                          );
                        }
                      }}
                    >
                      {i18n.language === "ar" ? item.nameAr : item.nameEn}
                    </h6>
                    <p className="board-members text-dark fw-normal">
                      {i18n.language === "ar"
                        ? item.positionNameAr
                        : item.positionNameEn}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
        <button
          className="next"
          onClick={handleNext}
          style={{ height: "200px" }}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Board;

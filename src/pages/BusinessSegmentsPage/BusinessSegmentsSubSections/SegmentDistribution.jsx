import { useTranslation } from "react-i18next";

const SegmentDistribution = ({ data }) => {
  const { t, i18n } = useTranslation();

  const segmentDefArray =
    data && Array.isArray(data.businessSegmentsDefinitions)
      ? data.businessSegmentsDefinitions
      : [];

  return (
    <div>
      <h4 className="header-title">
        {t("businessSegments.segmentDistribution")}
      </h4>
      <hr />
      <table className="table table-hover">
        <tbody>
          {segmentDefArray.map((item, index) => (
            <tr key={index}>
              <th>
                {i18n.language === "ar"
                  ? item.businessSegmentNameAr
                  : item.businessSegmentNameEn}
              </th>
              <td>
                {i18n.language === "ar" && item.definitionAr
                  ? item.definitionAr
                  : i18n.language === "en" && item.definitionEn
                  ? item.definitionEn
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SegmentDistribution;

import React from "react";
import { useTranslation } from "react-i18next";
import { ensureLTR } from "../../../utils/Helpers";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.css";
import "../ProfilePage.css";

const Intro = ({ data }) => {
  const { t, i18n } = useTranslation();
  const profileInfoArray = Array.isArray(data.profileInfo)
    ? data.profileInfo
    : [data.profileInfo];

  return (
    <>
      <div className="businessInfo">
        <h6 className="fw-bold header-title">{t("profile.info.business")}</h6>
        <hr className="m-2 mb-0 icons-color" />
        <div className="business-div">
          <div
            dangerouslySetInnerHTML={{
              __html:
                i18n.language === "ar"
                  ? data?.profileInfo?.overviewAr
                  : data?.profileInfo?.overviewEn,
            }}
          />
        </div>
        <div>
          <h6 className="fw-bold header-title">{t("profile.info.summary")}</h6>
          <hr className="m-2 mb-0 icons-color" />
          <div
            dangerouslySetInnerHTML={{
              __html:
                i18n.language === "ar"
                  ? data?.profileInfo?.summaryAr
                  : data?.profileInfo?.summaryEn,
            }}
          />
        </div>
      </div>
      <div className="basicInfo">
        <h6 className="fw-bold header-title">{t("profile.info.basicInfo")}</h6>
        <hr className="m-2 mb-0 icons-color" />
        <SimpleBar style={{ maxHeight: "400px", overflowX: "auto" }}>
          <table className="table fs-14 table-hover">
            <tbody>
              {profileInfoArray.map((item, idx) => (
                <React.Fragment key={idx}>
                  <tr>
                    <th>{t("profile.info.city")}:</th>
                    <td>
                      {i18n.language === "ar"
                        ? item.cityNameAr
                        : item.cityNameEn}
                    </td>
                    <th>{t("profile.info.country")}:</th>
                    <td>{t("profile.info.countryName")}</td>
                  </tr>
                  <tr>
                    <th>{t("profile.info.ownershipType")}:</th>
                    <td>{t("profile.info.jointStock")}</td>
                    <th>{t("profile.info.establishDate")}:</th>
                    <td>1978</td>
                  </tr>
                  <tr>
                    <th>{t("profile.info.commercialRegister")}:</th>
                    <td>1010014211</td>
                    <th>{t("profile.info.website")}:</th>
                    <td>{item.websiteURL}</td>
                  </tr>
                  <tr>
                    <th>{t("profile.info.email")}:</th>
                    <td>{item.email}</td>
                    <th>{t("profile.info.phone")}:</th>
                    <td>{ensureLTR(item.phone)}</td>
                  </tr>
                  <tr>
                    <th>{t("profile.info.fax")}:</th>
                    <td>{ensureLTR(item.fax)}</td>
                    <th>{t("profile.info.poBox")}:</th>
                    <td>{item.poBoxEn}</td>
                  </tr>
                  <tr>
                    <th>{t("profile.info.address")}:</th>
                    <td colSpan={3}>
                      {i18n.language === "ar" ? item.addressAr : item.addressEn}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </SimpleBar>
      </div>
    </>
  );
};

export default Intro;

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../BoardManagementPage.css";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.css";

const Salaries = ({ data }) => {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState(data.salaries[1]?.year);

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  const selectedData = data.salaries.find((item) => item.year === selectedYear);

  return (
    <div
      className="tab-pane border-0 fade m-0 p-0 show active"
      id="salaries"
      role="tabpanel"
      aria-labelledby="salaries-tab"
    >
      <div className="container-lg m-3 px-0">
        <div className="d-flex justify-content-between align-items-center flex-wrap m-lg-3 mb-5 border">
          {data.salaries.map((item, index) => (
            <div
              className={`btn secondBtn yearsBtn ${
                item.year === selectedYear ? "active" : ""
              }`}
              key={index}
              onClick={() => handleYearClick(item.year)}
            >
              {item.year}
            </div>
          ))}
        </div>
        <SimpleBar style={{ maxHeight: "400px", overflowX: "auto" }}>
          <div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>{t("boardManagement.salary.details")}</th>
                  <th>{t("boardManagement.salary.members")}</th>
                  <th>{t("boardManagement.salary.executives")}</th>
                  <th>{t("boardManagement.salary.total")}</th>
                </tr>
              </thead>
              <tbody>
                {selectedData && (
                  <>
                    <tr>
                      <td>
                        {t("boardManagement.salary.salaries_title") +
                          " " +
                          t("boardManagement.salary.salaryUnit")}
                      </td>
                      <td>
                        {selectedData.boardMembersRenumerations.salaries || "-"}
                      </td>
                      <td>
                        {selectedData.executivesRenumerations.salaries || "-"}
                      </td>
                      <td>{selectedData.totalsRenumerations.salaries || "-"}</td>
                    </tr>
                    <tr>
                      <td>
                        {t("boardManagement.salary.bonuses") +
                          " " +
                          t("boardManagement.salary.salaryUnit")}
                      </td>
                      <td>
                        {selectedData.boardMembersRenumerations.bonuses || "-"}
                      </td>
                      <td>
                        {selectedData.executivesRenumerations.bonuses || "-"}
                      </td>
                      <td>{selectedData.totalsRenumerations.bonuses || "-"}</td>
                    </tr>
                    <tr>
                      <td>
                        {t("boardManagement.salary.otherRewards") +
                          " " +
                          t("boardManagement.salary.salaryUnit")}
                      </td>
                      <td>
                        {selectedData.boardMembersRenumerations.otherRewards ||
                          "-"}
                      </td>
                      <td>
                        {selectedData.executivesRenumerations.otherRewards || "-"}
                      </td>
                      <td>
                        {selectedData.totalsRenumerations.otherRewards || "-"}
                      </td>
                    </tr>
                    <tr>
                      <td>{t("boardManagement.salary.total")}</td>
                      <td>
                        {selectedData.boardMembersRenumerations.total || "-"}
                      </td>
                      <td>{selectedData.executivesRenumerations.total || "-"}</td>
                      <td>{selectedData.totalsRenumerations.total || "-"}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default Salaries;

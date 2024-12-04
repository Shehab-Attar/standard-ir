import axios from "axios";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getToken } from "../../services/getToken";

const BoardDetailsPage = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["board"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("Unable to authenticate");
      }
      const res = await axios.get(
        `https://data.argaam.com/api/v1/json/ir-api/organizational-structure`,
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

  const foundBoardMember = data?.individuals.find(
    (d) => d.individualID === parseInt(id)
  );

  if (isLoading) {
    return <div>{t("title.loading")}</div>;
  }

  if (isError) {
    console.error("Error fetching data:", error);
    return <div>Error: {error.message}</div>;
  }

  if (!foundBoardMember) {
    return <div>Error loading board member details.</div>;
  }

  return (
    <div className="container-lg  mb-4">
      <h2>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          type="button"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => navigate(`/${i18n.language}/board-management`)}
        >
          <path d="M48 256c0 114.87 93.13 208 208 208s208-93.13 208-208S370.87 48 256 48 48 141.13 48 256zm212.65-91.36a16 16 0 01.09 22.63L208.42 240H342a16 16 0 010 32H208.42l52.32 52.73A16 16 0 11238 347.27l-79.39-80a16 16 0 010-22.54l79.39-80a16 16 0 0122.65-.09z"></path>
        </svg>
      </h2>
      <hr />
      <div className="my-1 mx-0 px-0" />
      <div className="d-flex align-items-center flex-wrap">
        <img src={foundBoardMember.profilePicURL} alt="" />
        <div className="m-3">
          <h4 className="link-color fw-bold fs-5 fs-4">
            {i18n.language === "ar"
              ? foundBoardMember.nameAr
              : foundBoardMember.nameEn}
          </h4>
          <p className="text-dark fw-normal">
            {i18n.language === "ar"
              ? foundBoardMember.positionNameAr
              : foundBoardMember.positionNameEn}
          </p>
        </div>
      </div>
      <hr />
      <div className="container-lg newDetail my-3">
        <h4>{t("boardManagement.highlights")}</h4>
        <div
          dangerouslySetInnerHTML={{
            __html:
              i18n.language === "ar"
                ? foundBoardMember.resumeHighLightAr
                : foundBoardMember.resumeHighLightEn,
          }}
        />
      </div>
      <hr />
      <div className="container table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>{t("boardManagement.companyName")}</th>
              <th>{t("boardManagement.title")}</th>
              <th>{t("boardManagement.startDate")}</th>
              <th>{t("boardManagement.endDate")}</th>
            </tr>
          </thead>
          <tbody>
            {foundBoardMember.positionHistory.map((item, index) => (
              <tr key={index}>
                <td>
                  {i18n.language === "ar"
                    ? item.companyNameAr
                    : item.companyNameEn}
                </td>
                <td>
                  {i18n.language === "ar"
                    ? item.positionNameAr
                    : item.positionNameEn}
                </td>
                <td>{item.startedOn ? item.startedOn : "-"}</td>
                <td>{item.endedOn ? item.endedOn : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BoardDetailsPage;

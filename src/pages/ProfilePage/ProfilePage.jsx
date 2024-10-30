import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../services/getToken.js";
import { useTranslation } from "react-i18next";
import "./ProfilePage.css";

// Sub Sections
import ProfileIntro from "./ProfilePageSubSections/ProfileIntro";
import ProfileFinancialHighlights from "./ProfilePageSubSections/ProfileFinancialHighlights";
const ProfilePage = () => {
  const { t } = useTranslation();

  // == Get Profile Data
  const { data, isLoading } = useQuery({
    queryKey: ["profilePageData"],
    queryFn: async () => {
      // Ensure token is valid
      const token = await getToken();

      if (!token) {
        throw new Error("Unable to authenticate");
      }

      // Get profile Data
      const res = await axios.get(
        `https://data.argaam.com/api/v1.0/json/ir-api/profile`,
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

  // == isLoading
  if (isLoading) return <div>{t("title.loading")}</div>;
  // == isLoading

  return (
    <div className="">
      <div>
        <ProfileIntro data={data} />
        <ProfileFinancialHighlights data={data} />
      </div>
    </div>
  );
};

export default ProfilePage;

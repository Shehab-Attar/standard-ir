import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getToken } from "../../../../../services/getToken";

const DisclosureDetailsPage = () => {
  const [disclosure, setDisclosure] = useState(null);
  const { articleID } = useParams();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchDisclosure = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(
          `https://data.argaam.com/api/v1.0/json/ir-api/overview/${i18n.language}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);

        const foundDisclosure = response.data.discloser.find(
          (d) => d.articleID === parseInt(articleID)
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchDisclosure();
  }, [articleID]);

  if (!disclosure) {
    return null;
  }

  return (
    <div className="disclosure-details">
      <div dangerouslySetInnerHTML={{ __html: disclosure.body }} />
    </div>
  );
};

export default DisclosureDetailsPage;

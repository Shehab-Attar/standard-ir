import { useTranslation } from "react-i18next";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import PropTypes from "prop-types";

const Chart = ({ data }) => {
  const { i18n } = useTranslation();

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: null,
    },
    xAxis: {
      title: {
        text: null,
      },
      categories: data.years || [],
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    tooltip: {
      enabled: true,
    },
    series: [
      {
        name: i18n.language === "ar" ? data.DisplayNameAr : data.DisplayNameEn,
        data: data.values.slice(0, 5) || [],
        color: "#374C5F",
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

Chart.propTypes = {
  data: PropTypes.shape({
    years: PropTypes.array.isRequired,
    DisplayNameEn: PropTypes.string.isRequired,
    DisplayNameAr: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,
  }).isRequired,
};

export default Chart;

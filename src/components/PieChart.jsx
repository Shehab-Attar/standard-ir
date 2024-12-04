import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useTranslation } from "react-i18next";
const PieChart = ({ pieData }) => {
  const { i18n } = useTranslation();
  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: null,
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          style: {
            fontSize: "12px",
            fontWeight: "bold",
          },
        },
        showInLegend: false,
      },
    },
    series: [
      {
        name: i18n.language === "ar" ? "النسبة" : "Share",
        colorByPoint: true,
        data: pieData,
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PieChart;

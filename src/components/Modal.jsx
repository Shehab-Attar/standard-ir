import Chart from "./HighCharts";
import PieChart from "./PieChart";

// Function to map API response to Chart data format
const mapDataToChartProps = (data, isUSD, conversionRate) => {
  // Determine the keys for years and values based on the data structure
  let years = [];
  let values = [];

  if (data.financialHighlights) {
    // Example for financial highlights
    years = Object.keys(data.financialHighlights[0]).filter(
      (key) => !isNaN(key) && key < 2024
    );
    values = years.map((year) => data.financialHighlights[0][year]);
  } else if (data.periodicValues) {
    // Example for business segments
    years = data.periodicValues.map((item) => item.forDate);
    values = data.periodicValues.map((item) =>
      isUSD ? item.value / conversionRate : item.value
    );
  } else {
    // Default case
    years = Object.keys(data).filter((key) => !isNaN(key) && key < 2024);
    values = Object.entries(data)
      .filter(([key]) => !isNaN(key) && key < 2024)
      .map(([, value]) => (isUSD ? value / conversionRate : value));
  }

  // Determine the display names based on available fields
  const displayNameEn =
    data.DisplayNameEn || data.businessSegmentNameEn || "Default Name En";
  const displayNameAr =
    data.DisplayNameAr || data.businessSegmentNameAr || "Default Name Ar";

  return {
    years,
    values,
    DisplayNameEn: displayNameEn,
    DisplayNameAr: displayNameAr,
  };
};

const ModalComponent = ({
  isVisible,
  closeModal,
  selectedField,
  isUSD,
  conversionRate,
  showPieChart,
  pieData,
}) => {
  const chartData = selectedField
    ? mapDataToChartProps(selectedField, isUSD, conversionRate)
    : null;

  return (
    <div
      className={`modal fade ${isVisible ? "show" : ""}`}
      id="chartModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden={!isVisible}
      style={{
        display: isVisible ? "block" : "none",
        backgroundColor: isVisible ? "#0000005d" : "transparent",
      }}
      onClick={closeModal}
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            {chartData && !showPieChart && <Chart data={chartData} />}
            {showPieChart && <PieChart data={pieData} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;

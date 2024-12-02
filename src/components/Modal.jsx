import Chart from "./HighCharts";

// Function to map API response to Chart data format
const mapDataToChartProps = (data, isUSD, conversionRate) => {
  // Determine the keys for years and values based on the data structure
  let years = [];
  let values = [];

  if (data.periodicValues) {
    // Example for business segments
    years = data.periodicValues.map((item) => item.forDate);
    values = data.periodicValues.map((item) =>
      isUSD ? item.value / conversionRate : item.value
    );
  } else if (data.values) {
    // Example for financial statements
    years = data.values.map((item) => item.forDate || item.year);
    values = data.values.map((item) =>
      isUSD ? item.value / conversionRate : item.value
    );
  }

  // Determine the display names based on available fields
  const displayNameEn =
    data.businessSegmentNameEn ||
    data.displayNameEn ||
    data.DisplayNameEn ||
    data.nameEn ||
    "Default Name En";
  const displayNameAr =
    data.businessSegmentNameAr ||
    data.displayNameAr ||
    data.DisplayNameAr ||
    data.nameAr ||
    "Default Name Ar";

  return {
    years: years,
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
            {chartData && <Chart data={chartData} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;

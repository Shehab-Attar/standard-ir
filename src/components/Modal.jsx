import Chart from "./HighCharts";

const ModalComponent = ({
  isVisible,
  closeModal,
  selectedField,
  isUSD,
  conversionRate,
}) => {
  const years = selectedField
    ? Object.keys(selectedField).filter((key) => !isNaN(key) && key < 2024)
    : [];
  const yearsValues = selectedField
    ? Object.entries(selectedField)
        .filter(([key]) => !isNaN(key) && key < 2024)
        .map(([, value]) => value)
        .map((value) => (isUSD ? value / conversionRate : value))
    : [];

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
            {selectedField && (
              <Chart
                data={{
                  years: years,
                  values: yearsValues,
                  DisplayNameEn: selectedField?.DisplayNameEn,
                  DisplayNameAr: selectedField?.DisplayNameAr,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;

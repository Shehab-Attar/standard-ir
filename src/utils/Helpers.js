export const formatValue = (value, isCurrency, isPercentage) => {
    if (value === "-") return value;
    const num = parseFloat(value);
    const formatted = Math.abs(num).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return isCurrency ? `${formatted}` : isPercentage ? `${formatted}%` : formatted;
  };

export const formatChange = (value) => {
    return Math.abs(value).toFixed(2);
};


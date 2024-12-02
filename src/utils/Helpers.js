export const formatChange = (value) => {
    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
  });
  return formatter.format(Math.abs(value));
};

// Utility function to ensure numbers are displayed LTR
export const ensureLTR = (text) => {
  const LRM = '\u200E'; 
  return `${LRM}${text}`;
};
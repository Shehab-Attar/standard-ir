export const formatChange = (value) => {
    return Math.abs(value).toLocaleString();
};

// Assuming item.date is in the format "YYYY-MM-DD"
export const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`; // Convert to DD/MM/YYYY
};

// Utility function to ensure numbers are displayed LTR
export const ensureLTR = (text) => {
  const LRM = '\u200E'; 
  return `${LRM}${text}`;
};





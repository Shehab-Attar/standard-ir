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

export const getTodayDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0"); 
  const month = String(today.getMonth() + 1).padStart(2, "0"); 
  const year = today.getFullYear();

  return `${month}/${day}/${year}`; 
};

export const getDateOneWeekAgo = () => {
  const today = new Date();
  today.setDate(today.getDate() - 7); // Subtract 7 days from today
  const day = String(today.getDate()).padStart(2, "0"); 
  const month = String(today.getMonth() + 1).padStart(2, "0"); 
  const year = today.getFullYear();

  return `${month}/${day}/${year}`; 
};
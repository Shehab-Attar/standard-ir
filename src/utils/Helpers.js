export const formatChange = (value) => {
    return Math.abs(value).toFixed(2);
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






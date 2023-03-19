export const getDateString = (dateObj) => {
  const date = dateObj.getDate();
  const day = days[dateObj.getDay()];
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  return `${day}, ${date} ${month} ${year}`;
};

export const getTimeString = (dateObj) => {
  return dateObj.toTimeString().split(" ")[0];
};

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

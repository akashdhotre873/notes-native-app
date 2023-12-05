import spacetime from 'spacetime';

export const getDateString = (dateObj) => {
  const date = dateObj.getDate();
  const day = days[dateObj.getDay()];
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  return `${day}, ${date} ${month} ${year}`;
};

export const getTimeString = (dateObj) => {
  const spaceTimeDateObj = spacetime(dateObj);
  const t = spaceTimeDateObj.format('{hour}:{minute-pad}:{second-pad} {AMPM}');
  return t.toUpperCase();
};

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const monthNames = [
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

export const formatTimeStamp = (postTimestamp, type) => {
  const localDate = new Date(0);
  localDate.setUTCSeconds(postTimestamp);
  const month = monthNames[localDate.getMonth().toString()];
  const date = localDate.getDate();
  const hours =
    localDate.getHours() % 12 === 0 ? 12 : localDate.getHours() % 12;
  const minutes =
    localDate.getMinutes() < 10
      ? `0${localDate.getMinutes()}`
      : localDate.getMinutes();
  const ampm = localDate.getHours() >= 12 ? "PM" : "AM";
  const year = localDate.getFullYear();

  const currentTimestamp = Math.round(Date.now() / 1000);
  const numberOfMinutes = (currentTimestamp - postTimestamp) / 60;
  const numberOfHours = numberOfMinutes / 60;
  const numberOfDays = numberOfHours / 24;
  return numberOfMinutes < 1
    ? type === "post"
      ? "Just now"
      : "1m"
    : numberOfMinutes < 60
    ? Math.floor(numberOfMinutes) + "m"
    : numberOfHours < 24
    ? Math.floor(numberOfHours) + "h"
    : numberOfDays < 365
    ? type === "post"
      ? `${month} ${date} at ${hours}:${minutes} ${ampm}`
      : Math.floor(numberOfDays) + "d"
    : type === "post"
    ? `${month} ${date}, ${year}`
    : Math.floor(numberOfDays / 365) + "y";
};

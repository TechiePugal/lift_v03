import dayjs from "dayjs";
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

export // Function to format the date range display
const formatDateOneWeekRange = ({ startDate, endDate }) => {
  if (startDate && endDate) {
    const startFormatted = `${startDate.getDate()} ${startDate.toLocaleString(
      "default",
      { month: "short" }
    )} `;
    const endFormatted = `${endDate.getDate()} ${endDate.toLocaleString(
      "default",
      { month: "short" }
    )} ${endDate.getFullYear()}`;
    return `${startFormatted} - ${endFormatted}`;
  } else if (startDate) {
    return `${startDate.getDate()} ${startDate.toLocaleString("default", {
      month: "long",
    })} ${startDate.getFullYear()}`;
  } else {
    return "Select a date range";
  }
};

export const calculateAge = (dateOfBirth) => {
  try {
    return new Promise((resolve, reject) => {
      const dob = new Date(dateOfBirth);
      const currentDate = new Date();

      let yearsDiff = currentDate.getFullYear() - dob.getFullYear();
      const monthsDiff = currentDate.getMonth() - dob.getMonth();
      const daysDiff = currentDate.getDate() - dob.getDate();

      // Check if the birthdate for the current year has occurred yet
      if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
        yearsDiff--;
      }

      resolve(yearsDiff);
    });
  } catch (error) {
    console.log("calculateAge Error");
  }
};

export const formatNormalDate = (date) => {
  if (date) {
    try {
      return dayjs(date).format("YYYY-MM-DD");
    } catch {
      console.log("Date format Error");
    }
  } else {
    return "-";
  }
};
export const formatNormalTime = (date) => {
  if (date) {
    try {
      const isoDateString = date;
      const isoDate = new Date(isoDateString);

      // Extract the date components
      const day = isoDate.getUTCDate();
      const month = isoDate.getUTCMonth() + 1; // Adding 1 because months are 0-indexed
      const year = isoDate.getUTCFullYear();

      // Extract the time components
      const hours = isoDate.getUTCHours();
      const minutes = isoDate.getUTCMinutes();
      const seconds = isoDate.getUTCSeconds();

      // Create the formatted date and time string
      const formattedDateTime = `${day < 10 ? "0" : ""}${
        month < 10 ? "0" : ""
      }${hours}:${minutes} `;

      return formattedDateTime;
    } catch {
      console.log("Date format Error");
    }
  } else {
    return "-";
  }
};

export const formatDateToString = (date) => {
  try {
    return dayjs.utc(date).format("YYYY-MM-DD");
  } catch (error) {
    console.log("formatDateToString Error");
  }
};

export const formatToSearchDate = (date) => {
  if (date) {
    try {
      return dayjs(date).format("YYYY-MM-DD");
    } catch {
      console.log("Date format Error");
    }
  } else {
    return "";
  }
};

export const displayDate = (date) => {
  if (date) {
    try {
      const formattedDate = dayjs.utc(date).format("DD-MM-YYYY");
      return formattedDate !== "Invalid Date" ? formattedDate : "-";
    } catch {
      console.log("Date format Error");
      return "-";
    }
  } else {
    return "";
  }
};

export const formatDate1 = (date) => {
  const isoString = date.toISOString(); // Convert to ISO string
  return isoString.split('T')[0]; // Extract date part only
};

export const formatDate = (date) => {
  if (date) {
    try {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      return formattedDate !== "Invalid Date" ? formattedDate : "-";
    } catch {
      console.log("Date format Error");
    }
  } else {
    return "";
  }
};

export const handle24Time = (time) => {
  try {
    // Parse the railway time using Day.js
    const parsedDate = dayjs(`2023-01-01 ${time}`, {
      format: "YYYY-MM-DD HH:mm",
    });

    // Format the time with AM/PM
    const formattedTime = parsedDate.format("hh:mm A");
    return formattedTime;
  } catch {
    return "Time Format Error";
    // console.log("Time Format Error");
  }
};

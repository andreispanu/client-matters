import { format, parseISO } from "date-fns";

const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const isValidDate = (dateString: string): boolean => {
  const timestamp = Date.parse(dateString);
  return !isNaN(timestamp);
};

export const formatCustomDate = (dateString: string): string => {
  if (!isValidDate(dateString)) {
    return "Invalid date";
  }

  const date = parseISO(dateString);
  const day = format(date, "d");
  const monthYear = format(date, "MMMM yyyy");
  const ordinalSuffix = getOrdinalSuffix(parseInt(day, 10));
  return `${day}${ordinalSuffix} ${monthYear}`;
};

export const formatCustomDateTime = (dateString: string): string => {
  if (!isValidDate(dateString)) {
    return "Invalid date";
  }

  const date = parseISO(dateString);
  const day = format(date, "d");
  const monthYear = format(date, "MMMM yyyy");
  const ordinalSuffix = getOrdinalSuffix(parseInt(day, 10));
  return `${day}${ordinalSuffix} ${monthYear}`;
};

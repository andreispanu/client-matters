import { format } from 'date-fns';

const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

export const formatCustomDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = format(date, 'd'); 
  const monthYear = format(date, 'MMMM yyyy'); 
  const ordinalSuffix = getOrdinalSuffix(parseInt(day, 10));
  return `${day}${ordinalSuffix} ${monthYear}`;
};

import { parseISO, format } from "date-fns";
export const convertToDate = (value: string): string | null => {
  try {
    const parsedDate = parseISO(value);
    const formattedDate = format(parsedDate, "dd-MM-yyyy, HH:mm:ss");
    return formattedDate;
  } catch (error) {
    // console.error("Ошибка при парсинге даты:", error);
    return "-";
  }
};

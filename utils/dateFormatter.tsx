const dateFormatter = (
  date: string,
  structure: "do MMM yyyy" | "MMM do yyyy"
) => {
  // Directly split the input date string
  const [year, month, day] = date.split('-').map(num => parseInt(num, 10));

  //console.log("/utils/dateFormatter.tsx dateFormatter in", year, month, day);

  // Helper function to get the month name
  const getMonthName = (month: number): string => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[month - 1]; // Adjust because array is 0-indexed but month is 1-indexed
  };

  // Helper function to format the day with ordinal suffix
  const formatDayWithOrdinal = (day: number): string => {
    let suffix = "th";
    if (day === 1 || day === 21 || day === 31) suffix = "st";
    else if (day === 2 || day === 22) suffix = "nd";
    else if (day === 3 || day === 23) suffix = "rd";
    return `${day}${suffix}`;
  };

  const monthName = getMonthName(month);
  const dayWithOrdinal = formatDayWithOrdinal(day);

  //console.log("/utils/dateFormatter.tsx dateFormatter out", `${dayWithOrdinal} ${monthName} ${year}`);

  if (structure === "do MMM yyyy") {
    return `${dayWithOrdinal} ${monthName} ${year}`;
  } else if (structure === "MMM do yyyy") {
    return `${monthName} ${dayWithOrdinal} ${year}`;
  } else {
    throw new Error("Unsupported date structure");
  }
};

export default dateFormatter;

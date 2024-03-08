// ------------------------------
// Convert date string to readable format
// ------------------------------
const dateFormatter = (
  date: string,
  structure: "do MMM yyyy" | "MMM do yyyy"
) => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.toLocaleString('default', { month: 'short' });
  const year = newDate.getFullYear();

  let ordinalDay;
  switch (day) {
    case 1:
    case 21:
    case 31:
      ordinalDay = `${day}st`;
      break;
    case 2:
    case 22:
      ordinalDay = `${day}nd`;
      break;
    case 3:
    case 23:
      ordinalDay = `${day}rd`;
      break;
    default:
      ordinalDay = `${day}th`;
  }

  if (structure === "do MMM yyyy") {
    return `${ordinalDay} ${month} ${year}`;
  } else if (structure === "MMM do yyyy") {
    return `${month} ${ordinalDay} ${year}`;
  } else {
    throw new Error("Unsupported date structure");
  }
};

export default dateFormatter;

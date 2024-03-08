import { cx } from "../utils/cx";
import Image from "next/image";
import maybeTruncateTextBlock from "../utils/maybeTruncateTextBlock";

function formatDate(dateString: string) {
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
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  // Adding suffix to day
  let daySuffix;
  switch (day) {
    case 1:
    case 21:
    case 31:
      daySuffix = "st";
      break;
    case 2:
    case 22:
      daySuffix = "nd";
      break;
    case 3:
    case 23:
      daySuffix = "rd";
      break;
    default:
      daySuffix = "th";
  }

  return `${month} ${day}${daySuffix}, ${year}`;
}

export default function ArticleCard({
  slug,
  publishedDate,
  authors,
  image,
  title,
  summary,
}: {
  slug: string;
  publishedDate: string;
  authors:string;
  image: string;
  title: string;
  summary: string;
}) {
  // Use the formatDate function to format the publishedDate
  const niceDate = formatDate(publishedDate);

  return (
    <li className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out overflow-hidden">
      <a href={slug} className="block">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-500">{niceDate}</div>
            <div className="text-sm text-gray-700">{authors}</div>
          </div>
          <div className="text-center">
            <img
              src={image}
              alt=""
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
              className="mb-4 rounded-lg"
            />
            <h3 className="text-xl font-medium group-hover:underline">
              {title}
            </h3>
            {summary && <p className="mt-3 text-gray-600">{summary}</p>}
          </div>
        </div>
      </a>
    </li>
  );
}

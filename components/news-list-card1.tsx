import formatDate from "../utils/format-date";


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
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out overflow-hidden">
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
              className="mb-4 rounded-lg h-[200px] w-auto object-cover"
            />
            <h3 className="text-xl font-medium group-hover:underline">
              {title}
            </h3>
            {summary && <p className="mt-3 text-gray-600">{summary}</p>}
          </div>
        </div>
      </a>
    </div>
  );
}

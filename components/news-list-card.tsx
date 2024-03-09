import formatDate from "../utils/format-date";
import React from "react";

export default function ArticleCard({
  slug,
  publishedDate,
  authors,
  title,
  summary,
  newsCategories,
}: {
  slug: string;
  publishedDate: string;
  authors: string;
  title: string;
  summary: string;
  newsCategories: { slug: string; description: string }[];
}) {
  // Use the formatDate function to format the publishedDate
  const niceDate = formatDate(publishedDate);

  return (
    <div
      key={slug}
      className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4"
    >
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          {niceDate}
        </div>
        <span className="block mt-1 text-lg leading-tight font-medium text-black">
          {title}
        </span>
        <p className="mt-2 text-gray-500">{summary}</p>
        <div className="flex justify-between items-center mt-4">
          <div>
            {newsCategories.map((rec) => (
              <a href={`/news/category/${rec.slug}`} key={rec.slug}>
                <button
                  key={rec.slug}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-gray-300"
                >
                  {rec.description}
                </button>
              </a>
            ))}
          </div>
          <div className="text-sm text-gray-600">By {authors}</div>
        </div>
      </div>
    </div>
  );
}

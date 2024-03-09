import formatDate from "../utils/format-date";
import React from "react";

export default function ArticleCard({
  slug,
  publishedDate,
  authors,
  title,
  summary,
}: any) {
  // Use the formatDate function to format the publishedDate
  const niceDate = formatDate(publishedDate);

  const categories = ["Category 1", "Category 2", "Category 3"];

  const handleCategoryClick = (category : string) => {
    console.log(`Category clicked: ${category}`);
  };

  return (
    <div key={slug} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{niceDate}</div>
        <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{title}</a>
        <p className="mt-2 text-gray-500">{summary}</p>
        <div className="flex justify-between items-center mt-4">
          <div>
            {categories.map((category, index) => (
              <button key={index} onClick={() => handleCategoryClick(category)}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-gray-300">{category}</button>
            ))}
          </div>
          <div className="text-sm text-gray-600">By {authors}</div>
        </div>
      </div>
    </div>
  );
}

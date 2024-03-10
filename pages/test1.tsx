import React from "react";

const blogs = [
  {
    id: 1,
    title: "Sed do eiusmod tempor incididunt ut labore",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "2023-04-01",
    categories: ["Category 1", "Category 2"],
    author: "Jane Doe",
  },
  {
    id: 2,
    title: "Ut enim ad minim veniam, quis nostrud exercitation",
    summary:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    date: "2023-04-02",
    categories: ["Category 2", "Category 3"],
    author: "John Smith",
  },
  {
    id: 3,
    title: "Excepteur sint occaecat cupidatat non proident",
    summary: "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "2023-04-03",
    categories: ["Category 1", "Category 3", "Category 4"],
    author: "Alice Johnson",
  },
  // Add more blogs as needed
];

const handleCategoryClick = (category: string) => {
  console.log(`Category clicked: ${category}`);
};

const App = () => {
  return (
    <div className="container mx-auto px-4">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4"
        >
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {blog.date}
            </div>
            <a
              href="#"
              className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
            >
              {blog.title}
            </a>
            <p className="mt-2 text-gray-500">{blog.summary}</p>
            <div className="flex justify-between items-center mt-4">
              <div>
                {blog.categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategoryClick(category)}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-gray-300"
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="text-sm text-gray-600">By {blog.author}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

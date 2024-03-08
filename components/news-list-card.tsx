import { cx } from "../utils/cx";
import Image from "next/image";
import maybeTruncateTextBlock from "../utils/maybeTruncateTextBlock";

export default function NewsListCard({
                image,
                title,
                summary,
                slug,
                publishedDate,
                authors,
                language,
              }: {
  image: string;
  title?: string;
  summary?: string;
  slug?: string;
  publishedDate?: string;
  authors?: any[];
  language?: string;
}) {
  console.log("authors:", authors);
  const authorsLine = authors
    ?.map((author) => (language === "en" ? author.nameEn : author.nameEs))
    .join(", ");
  return (
    <li className={cx("group")}>
      <a href={slug} className="group">
        <div>{publishedDate}</div>
        <div>{authorsLine}</div>
        <div>
          <div>
            <Image
              src={image}
              alt=""
              width={768}
              height={400}
              className="ring-1 ring-black/5 rounded-sm"
            />
          </div>
          <h3 className="mt-4 text-xl font-medium group-hover:underline">
            {title}
          </h3>
          {summary && (
            <p className="mt-3 text-gray-600 line-clamp-3">
              {maybeTruncateTextBlock(summary, 100)}
            </p>
          )}
        </div>
      </a>
    </li>
  );
}
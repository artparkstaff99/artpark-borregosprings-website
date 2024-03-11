import Link from "next/link";
import Image from "next/image";
import formatDate from "../utils/format-date";
import React from "react";
import { useLanguage } from "./default-language-provider";

export default function CardNews({
  image,
  title,
  summary,
  link,
  publishedDate,
  authors,
  newsAuthors
}: {
  image: string;
  title: string;
  summary: string;
  link: string;
  publishedDate: string;
  authors: any;
  newsAuthors: string[];
}) {

  const { language } = useLanguage();

  const authorsLine = authors.filter((author : any) => {
    return newsAuthors.includes(author.slug);
  })
    ?.map((author: any) =>
      language === "en" ? author?.nameEn : author?.nameEs,
    )
    .join(", ");

  return (
    <div className="p-6 mt-6">
      <div
        className="mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-lg p-4"
        style={{ height: "250px" }}
      >
        <div className="flex h-full">
          <div className="flex-none w-1/3 relative">
            <Image src={image} alt="" layout="fill"  priority
                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{objectFit:"cover"}}/>
          </div>
          <div className="flex-auto p-6">
            <div>
              <Link href={link} className="no-underline hover:underline">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  {formatDate(publishedDate)}
                </div>
                <span className="block mt-1 text-lg leading-tight font-medium text-black">
                  {title}
                </span>
                <span className="block mt-1 text-sm leading-tight font-light text-black">
                  Author{newsAuthors.length > 1 ? "s": ""}: {authorsLine}
                </span>
              </Link>
              <p className="mt-2 text-gray-500">{summary}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

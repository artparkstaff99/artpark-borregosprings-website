import Link from "next/link";
import Image from "next/image";
import formatDate from "../utils/format-date";
import React from "react";

export default function CardNews({
                                   image,
                                   title,
                                   summary,
                                   link,
                                   publishedDate,
                                 }: {
  image: string;
  title: string;
  summary: string;
  link: string;
  publishedDate: string;
}) {
  return (
    <Link href={link} target="_self" className="no-underline">
      <Image src={image} alt="" width={768} height={400} />
      <div className="p-8">
        <Link
          href={link}
          className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
        >
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {formatDate(publishedDate)}
          </div>
          <span className="block mt-1 text-lg leading-tight font-medium text-black">
            {title}
          </span>
          <p className="mt-2 text-gray-500">{summary}</p>
        </Link>
      </div>
    </Link>
  );
}


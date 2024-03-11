import Link from "next/link";
import Image from "next/image";
import maybeTruncateTextBlock from "../utils/maybeTruncateTextBlock";
import React from "react";

export default function CardStation({
                                      image,
                                      title,
                                      summary,
                                      link,
                                    }: {
  image: string;
  title: string;
  summary: string;
  link: string;
}) {
  return (
    <li className="group">
      <Link href={link} target="_self" className="no-underline">
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
      </Link>
    </li>
  );
}

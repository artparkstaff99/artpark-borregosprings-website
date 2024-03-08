import Link from "next/link";
import Image from "next/image";
import type { InferGetStaticPropsType } from "next";

import { DocumentRenderer } from "@keystatic/core/renderer";

// import Seo from "../components/Seo";

import { useEffect, useState } from "react";
import {
  getHomeData,
  getNewsData,
  getAllAuthors,
} from "../../utils/get-static-page-utils";
import { useLanguage } from "../../components/default-language-provider";
import Header from "../../components/Header";
import Divider from "../../components/Divider";
import Footer from "../../components/Footer";
import NewsListCard from "../../components/news-list-card1";

export async function getStaticProps({ locale }: { locale: string }) {
  // locale is "en" or "es"
  const [home, news, authors] = await Promise.all([
    getHomeData(),
    getNewsData(),
    getAllAuthors(),
  ]);

  return {
    props: {
      home,
      news: news ?? [],
      authors: authors ?? [],
    },
  };
}

export default function NewsPage({
  home,
  news,
  authors,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { language } = useLanguage();
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setShowResult(true);
  }, []);

  const newsFiltered = news
    .filter((rec) => rec.show)
    .sort((a, b) => {
      if (a?.publishedDate && b?.publishedDate) {
        return new Date(a.publishedDate).getTime() <
          new Date(b.publishedDate).getTime()
          ? 1
          : -1;
      }

      return 0;
    });

  return (
    showResult && (
      <div className="flex min-h-screen flex-col font-sans bg-neutral-200">
        <Header home={home} />
        <main className="max-w-none flex flex-1 flex-col">
          <div className="flex-1">
            <div className="px-4 md:px-28 max-w-7xl mx-auto">
              {/*<Seo />*/}
              {home.heading_news_en && home.heading_news_es && (
                <>
                  <DocumentRenderer
                    document={
                      language === "en"
                        ? home.heading_news_en
                        : home.heading_news_es
                    }
                    renderers={{
                      inline: {
                        bold: ({ children }) => {
                          return (
                            <span className="text-cyan-700">{children}</span>
                          );
                        },
                      },
                      block: {
                        paragraph: ({ children }) => {
                          return (
                            <h1 className="text-center font-bold text-2xl max-w-xs sm:text-5xl sm:max-w-2xl lg:text-7xl lg:max-w-[60rem] mx-auto">
                              {children}
                            </h1>
                          );
                        },
                      },
                    }}
                  />
                  {newsFiltered.length > 0 && <Divider />}
                </>
              )}
              {newsFiltered.length === 0 ? (
                <h2>There are no recs available</h2>
              ) : (
                <ul className="grid grid-cols-1 gap-4 md:gap-x-6 gap-y-20 sm:gap-y-16 md:grid-cols-2 xl:grid-cols-3 pl-0">
                  {newsFiltered.map(function (rec) {
                    const languageOfItem = rec.slug.startsWith("es/")
                      ? "es"
                      : "en";
                    const showItem = languageOfItem === language;

                    const linkSlug = `/news/${rec.slug
                      .replace("es/", "")
                      .replace("en/", "")}`;

                    const authorsLine = authors
                      ?.map((author) => (language === "en" ? author?.nameEn : author?.nameEs))
                      .join(", ");

                    return (
                      <div
                        key={rec.slug}
                        style={{ display: showItem ? "block" : "none" }}
                      >
                        <NewsListCard
                          image={`/images/news/${rec.slug}/${rec.coverImage}`}
                          title={rec.title ?? ""}
                          summary={rec.summary ?? ""}
                          key={rec.slug}
                          slug={linkSlug}
                          publishedDate={rec.publishedDate ?? "2024-01-01"}
                          authors={authorsLine}
                        />
                      </div>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </main>
        <Footer home={home} />
      </div>
    )
  );
}


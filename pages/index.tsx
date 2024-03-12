import Link from "next/link";
import Image from "next/image";
import type { InferGetStaticPropsType } from "next";

import { DocumentRenderer } from "@keystatic/core/renderer";

// import Seo from "../components/Seo";
import Divider from "../components/Divider";
import { cx } from "../utils/cx";
import maybeTruncateTextBlock from "../utils/maybeTruncateTextBlock";
import { useLanguage } from "../components/default-language-provider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  getAllAuthors,
  getHomeData,
  getNewsData,
  getStationData,
} from "../utils/get-static-page-utils";
import React, { useEffect, useState } from "react";
import Seo from "../components/Seo";
import formatDate from "../utils/format-date";
import CardStation from "../components/card-station";
import CardNews from "../components/card-news";

export async function getStaticProps({ locale }: { locale: string }) {
  // locale is "en" or "es"
  const [home, news, stations, authors] = await Promise.all([
    getHomeData(),
    getNewsData(),
    getStationData(),
    getAllAuthors(),
  ]);

  return {
    props: {
      home,
      news: news ?? [],
      stations: stations ?? [],
      authors: authors ?? [],
    },
  };
}

export default function Home({
  home,
  news,
  stations,
  authors,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { language } = useLanguage();
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setShowResult(true);
  }, []);

  const stationsFiltered = stations
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

  const showStations = process.env.NEXT_PUBLIC_SHOW_STATIONS === "true";

  const showNews = process.env.NEXT_PUBLIC_SHOW_NEWS === "true";

  return (
    showResult && (
      <div className="flex min-h-screen flex-col font-sans bg-neutral-200">
        <Header home={home} />
        <main className="max-w-none flex flex-1 flex-col">
          <div className="flex-1">
            <div className="px-4 md:px-28 max-w-7xl mx-auto">
              <Seo />
              {home.heading_en && home.heading_es && (
                <>
                  <DocumentRenderer
                    document={
                      language === "en" ? home.heading_en : home.heading_es
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
                  {stationsFiltered.length > 0 && <Divider />}
                </>
              )}

              {stationsFiltered.length > 0 && showStations ? (
                <ul className="grid grid-cols-1 gap-4 md:gap-x-6 gap-y-20 sm:gap-y-16 md:grid-cols-2 xl:grid-cols-3 pl-0">
                  {stationsFiltered
                    .sort((a: any, b: any) => {
                      return (a.orderBy ?? "").localeCompare(b.orderBy ?? "");
                    })
                    .map((rec) => {
                      const languageOfItem = rec.slug.startsWith("es/")
                        ? "es"
                        : "en";
                      const showItem = languageOfItem === language;
                      return (
                        <div
                          key={rec.slug}
                          style={{ display: showItem ? "block" : "none" }}
                        >
                          <CardStation
                            image={`/images/stations/${rec.slug}/${rec.coverImage}`}
                            title={rec?.title ?? ""}
                            summary={rec?.summary ?? ""}
                            key={rec.slug}
                            link={`/stations/${rec.slug
                              .replace("es/", "")
                              .replace("en/", "")}`}
                          />
                        </div>
                      );
                    })}
                </ul>
              ) : null}
              {showNews && news.length > 0 && (
                <>
                  <div className="mt-10">
                    <h1 className="text-center font-bold text-2xl max-w-xs sm:text-5xl sm:max-w-2xl lg:text-7xl lg:max-w-[60rem] mx-auto">
                      {language === "en"
                        ? home.news_banner_top_en
                        : home.news_banner_top_es}
                    </h1>

                    <div className="container mx-auto px-4">
                      {news
                        .sort((a: any, b: any) => {
                          return (
                            new Date(b.publishedDate).getTime() -
                            new Date(a.publishedDate).getTime()
                          );
                        })
                        .slice(0, 6) // assuming there is one for en and one for es, 6 means really top 3
                        .map((rec: any) => {
                          const languageOfItem = rec.slug.startsWith("es/")
                            ? "es"
                            : "en";
                          const showItem = languageOfItem === language;

                          return (
                            <div
                              key={rec.slug}
                              style={{ display: showItem ? "block" : "none" }}
                            >
                              <CardNews
                                authors={authors}
                                newsAuthors={rec.authors}
                                image={`/images/news/${rec.slug}/${rec.coverImage}`}
                                title={rec.title ?? ""}
                                summary={rec.summary ?? ""}
                                link={`/news/${rec.slug
                                  .replace("es/", "")
                                  .replace("en/", "")}`}
                                publishedDate={rec.publishedDate ?? ""}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div>
                    <Link
                      href="/news"
                      className="block text-center text-cyan-700 mt-8 font-bold lg:text-5xl"
                    >
                      {language === "en"
                        ? home.news_banner_bottom_more_en
                        : home.news_banner_bottom_more_es}
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
        <Footer home={home} />
      </div>
    )
  );
}

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
  getHomeData,
  getNewsData,
  getStationData,
} from "../utils/get-static-page-utils";
import { useEffect, useState } from "react";
import Seo from "../components/Seo";

export async function getStaticProps({ locale }: { locale: string }) {
  // locale is "en" or "es"
  const [home, news, stations] = await Promise.all([
    getHomeData(),
    getNewsData(),
    getStationData(),
  ]);

  return {
    props: {
      home,
      news: news ?? [],
      stations: stations ?? [],
    },
  };
}

export default function Home({
  home,
  news,
  stations,
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
                  {stationsFiltered.map((rec) => {
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

                    <div className="mt-12">
                      <ul className="grid grid-cols-1 gap-4 md:gap-x-6 gap-y-20 sm:gap-y-16 md:grid-cols-2 xl:grid-cols-3 pl-0">
                        {news.map((rec) => {
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
                                image={`/images/news/${rec.slug}/${rec.coverImage}`}
                                title={rec.title ?? ""}
                                summary={rec.summary ?? ""}
                                link={`/news/${rec.slug
                                  .replace("es/", "")
                                  .replace("en/", "")}`}
                              />
                            </div>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <Link
                      href="/news"
                      className="block text-center text-cyan-700 mt-8 font-bold lg:text-5xl"
                    >
                      {language === "en" ? "More News" : "Más Noticias"}
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

function CardStation({
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

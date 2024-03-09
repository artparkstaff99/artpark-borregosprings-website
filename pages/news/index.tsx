import type { InferGetStaticPropsType } from "next";

import { useEffect, useState } from "react";
import {
  getAllAuthors,
  getAllNewsCategories,
  getHomeData,
  getNewsData,
} from "../../utils/get-static-page-utils";
import { useLanguage } from "../../components/default-language-provider";
import Header from "../../components/Header";
import Divider from "../../components/Divider";
import Footer from "../../components/Footer";
import NewsListCard from "../../components/news-list-card";
import Seo from "../../components/Seo";
import NewsListRender from "../../components/news-list-render";

export async function getStaticProps() {
  const [home, news, authors, newsCategories] = await Promise.all([
    getHomeData(),
    getNewsData(),
    getAllAuthors(),
    getAllNewsCategories(),
  ]);

  return {
    props: {
      home,
      news: news ?? [],
      authors: authors ?? [],
      newsCategories: newsCategories ?? [],
    },
  };
}

export default function NewsPage({
  home,
  news,
  authors,
  newsCategories,
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
      <NewsListRender
        home={home}
        newsFiltered={newsFiltered}
        language={language}
        authors={authors}
        newsCategories={newsCategories}
      />
    )
  );
}

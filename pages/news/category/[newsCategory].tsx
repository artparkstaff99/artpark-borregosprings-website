import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { useEffect, useState } from "react";
import {
  getAllAuthors,
  getAllNewsCategories,
  getHomeData,
  getNewsData,
} from "../../../utils/get-static-page-utils";
import { useLanguage } from "../../../components/default-language-provider";
import NewsListRender from "../../../components/news-list-render";
import { createReader } from "@keystatic/core/reader";
import config from "../../../keystatic.config";

export async function getStaticPaths() {
  const reader = createReader("", config);
  const categoryList = await reader.collections.newsCategories.list();
  const retValue = {
    // Generate paths for each rec
    paths: categoryList.map((slug) => ({
      params: { newsCategory: `${slug}` },
    })),
    fallback: false,
  };
  return retValue;
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const category = params?.newsCategory as string;
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
      category: category ?? ("" as string),
    },
  };
}

export default function NewsPage({
  home,
  news,
  authors,
  newsCategories,
  category,
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
        category={category}
      />
    )
  );
}

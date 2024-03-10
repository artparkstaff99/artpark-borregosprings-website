import config from "../keystatic.config";
import { inject } from "./slugHelpers";
import { createReader } from "@keystatic/core/reader";

const reader = createReader("", config);

export async function getHomeData() {
  const reader = createReader("", config);
  const homePage = await reader.singletons.home.read();
  return {
    ...homePage,
    heading_en: await (homePage?.heading_en() || []),
    heading_es: await (homePage?.heading_es() || []),
    heading_news_en: await (homePage?.heading_news_en() || []),
    heading_news_es: await (homePage?.heading_news_es() || []),
  };
}

export async function getNewsData() {
  const postSlugs = await reader.collections.news.list();
  return await Promise.all(
    postSlugs.map(async (slug) => {
      const news = await reader.collections.news.read(slug);
      const content = (await news?.content()) || [];
      return {
        ...news,
        content,
        slug,
        ...({ type: "news" } as const),
      };
    }),
  );
}

export async function getStationData() {
  const stationSlugs = await reader.collections.stations.list();
  return await Promise.all(
    stationSlugs.map(async (slug) => {
      const station = await reader.collections.stations.read(slug);
      const content = (await station?.content()) || [];
      return {
        ...station,
        content,
        slug,
        ...({ type: "station" } as const),
      };
    }),
  );
}

export async function getAllAuthors() {
  const authorsList = await reader.collections.authors.list();
  return await Promise.all(
    authorsList.map((slug) => inject(slug, reader.collections.authors)),
  );
}

export async function getAllNewsCategories() {
  const list = await reader.collections.newsCategories.list();
  return await Promise.all(
    list.map((slug) => inject(slug, reader.collections.newsCategories)),
  );
}

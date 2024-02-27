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
  };
}

export async function getAboutPage() {
  const reader = createReader("", config);
  const aboutPage = await reader.singletons.about.read();
  const aboutPageContent = await (aboutPage?.content() || []);
  return {
    ...aboutPage,
    content: aboutPageContent,
  };
}

export async function getPostData() {
  const postSlugs = await reader.collections.posts.list();
  return await Promise.all(
    postSlugs.map(async (slug) => {
      const post = await reader.collections.posts.read(slug);
      const content = (await post?.content()) || [];
      return {
        ...post,
        content,
        slug,
        ...({ type: "post" } as const),
      };
    }),
  );
}

export async function getExternalArticleData() {
  const externalArticles = await reader.collections.externalArticles.list();
  const externalArticleData = await Promise.all(
    externalArticles.map((slug) =>
      inject(slug, reader.collections.externalArticles),
    ),
  );
  return externalArticleData.map((article) => ({
    ...({ type: "externalArticle" } as const),
    ...article,
  }));
}

export async function getAllAuthors() {
  const authorsList = await reader.collections.authors.list();
  return await Promise.all(
    authorsList.map((slug) => inject(slug, reader.collections.authors)),
  );
}
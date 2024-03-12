import Header from "./Header";
import Seo from "./Seo";
import Divider from "./Divider";
import NewsListCard from "./news-list-card";
import Footer from "./Footer";
import { DocumentRenderer } from "@keystatic/core/renderer";

export default function NewsListRender({
  home,
  language,
  newsFiltered,
  authors,
  newsCategories,
  category,
}: {
  home: any;
  language: string;
  newsFiltered: any;
  authors: any;
  newsCategories: any;
  category?: string;
}) {

  return (
    <div className="flex min-h-screen flex-col font-sans bg-neutral-200">
      <Header home={home} />
      <main className="max-w-none flex flex-1 flex-col">
        <div className="flex-1">
          <div className="px-4 md:px-28 max-w-7xl mx-auto">
            <Seo />
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
              <h2>No News Available</h2>
            ) : (
              <div className="container mx-auto px-4">
                {newsFiltered
                  .filter((rec: any) => rec.show)
                  .filter(
                    (rec: any) =>
                      rec.newsCategories.includes(category) || !category,
                  )
                  .sort((a: any, b: any) => {
                    if (a?.publishedDate && b?.publishedDate) {
                      return new Date(a.publishedDate).getTime() <
                        new Date(b.publishedDate).getTime()
                        ? 1
                        : -1;
                    }
                    return 0;
                  })
                  .map(function (rec: any) {
                    const languageOfItem = rec.slug.startsWith("es/")
                      ? "es"
                      : "en";
                    const showItem = languageOfItem === language;

                    const linkSlug = `/news/${rec.slug
                      .replace("es/", "")
                      .replace("en/", "")}`;

                    const authorsLine = authors.filter((author : any) => rec.authors?.includes(author.slug))
                      ?.map((author: any) =>
                        language === "en" ? author?.nameEn : author?.nameEs,
                      )
                      .join(", ");

                    const newsCategoriesForPost = rec.newsCategories?.map(
                      (slug: string) => {
                        const newsCategory = newsCategories.find(
                          (nc: any) => nc?.slug === slug,
                        );
                        return language === "en"
                          ? {
                              description: newsCategory?.categoryNameEn ?? "",
                              slug: newsCategory?.slug ?? "",
                            }
                          : {
                              description: newsCategory?.categoryNameEs ?? "",
                              slug: newsCategory?.slug ?? "",
                            };
                      },
                    );

                    return (
                      <div
                        key={rec.slug}
                        style={{ display: showItem ? "block" : "none" }}
                      >
                        <NewsListCard
                          title={rec.title ?? ""}
                          summary={rec.summary ?? ""}
                          key={rec.slug}
                          linkSlug={linkSlug}
                          publishedDate={rec.publishedDate ?? "2024-01-01"}
                          authors={authorsLine}
                          newsCategories={
                            newsCategoriesForPost ?? [
                              {
                                description: "No-description",
                                slug: "no-category",
                              },
                            ]
                          }
                        />
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer home={home} />
    </div>
  );
}

import NextImage from "next/image";
import type { GetStaticPropsContext } from "next";
import { createReader } from "@keystatic/core/reader";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { getHomeData, getNewsData } from "../../utils/get-static-page-utils";
import Seo from "../../components/Seo";
import config from "../../keystatic.config";
import dateFormatter from "../../utils/dateFormatter";
import readTime from "../../utils/readTime";
import InlineCTA from "../../components/InlineCTA";
import Divider from "../../components/Divider";
import Banner from "../../components/Banner";
import Image from "../../components/Image";
import YouTubeEmbed from "../../components/YouTubeEmbed";
import TweetEmbed from "../../components/TweetEmbed";
import LoopingVideo from "../../components/LoopingVideo";
import Testimonial from "../../components/Testimonial";
import AvatarList from "../../components/AvatarList";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React from "react";
import { useLanguage } from "../../components/default-language-provider";

export async function getStaticPaths() {
  const reader = createReader("", config);
  // Get collection of all records
  const slugsAll = await reader.collections.news.list();
  const slugs = Array.from(new Set(slugsAll.map((item) => item.split("/")[1])));

  return {
    // Generate paths for each rec
    paths: slugs.map((slug) => ({
      params: { news: slug },
    })),
    fallback: false,
  };
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const slug = params?.news;

  if (typeof slug !== "string") {
    throw new Error("What? WHYYYYY");
  }

  const reader = createReader("", config);

  const slugEn = `en/${slug}`;
  const slugEs = `es/${slug}`;

  let newsEn;
  let newsEs;
  try {
    newsEn = await reader.collections.news.readOrThrow(slugEn, {
      resolveLinkedFiles: true,
    });
    newsEs = await reader.collections.news.readOrThrow(slugEs, {
      resolveLinkedFiles: true,
    });
  } catch (e) {
    console.error("one or both of slugs not found for news", slugEn, slugEs, e);
  }

  if (!newsEn || !newsEs) {
    const errorString = `News not found for the news articles: ${slugEn} or ${slugEs}. Both have to be available`;
    return {
      props: {
        errorString,
      },
    };
  }

  const authorsDataEn = await Promise.all(
    newsEn.authors.map(async (authorSlug: any) => {
      const author = await reader.collections.authors.read(authorSlug || "");
      return { ...author, slug: authorSlug };
    }),
  );

  const authorsDataEs = await Promise.all(
    newsEs.authors.map(async (authorSlug: any) => {
      const author = await reader.collections.authors.read(authorSlug || "");
      return { ...author, slug: authorSlug };
    }),
  );

  const [home] = await Promise.all([getHomeData()]);

  return {
    props: {
      newsEn: {
        ...newsEn,
        slug: slugEn,
      },
      newsEs: {
        ...newsEs,
        slug: slugEs,
      },
      authorsEn: authorsDataEn,
      authorsEs: authorsDataEs,
      home,
    },
  };
};

export default function News({
  newsEn,
  newsEs,
  authorsEn,
  authorsEs,
  home,
  errorString,
}: {
  newsEn: any;
  newsEs: any;
  authorsEn: any;
  authorsEs: any;
  home: any;
  errorString?: string;
}) {
  const { language } = useLanguage();

  if (errorString) {
    return (
      <div>
        Error: {errorString}.
      </div>
    )
  }

  return ["en", "es"].map(function (currentLanguage) {
    const newsItem = currentLanguage === "en" ? newsEn : newsEs;
    const authors = currentLanguage === "en" ? authorsEn : authorsEs;

    console.log("/pages/news/[news].tsx", newsItem);

    const names = authors.reduce(
      (acc: string[], author: any) =>
        "name" in author ? [...acc, author.name as string] : acc,
      [],
    );

    const formattedNames = new Intl.ListFormat("en")
      .format(names)
      .replace("and", "&");

    const show = language === currentLanguage;

    return (
      <div key={currentLanguage} style={{ display: show ? "block" : "none" }}>
        <div className="flex min-h-screen flex-col font-sans bg-neutral-200">
          <Header home={home} />
          <main className="max-w-none flex flex-1 flex-col">
            <div className="flex-1">
              <div className="max-w-4xl mx-auto px-4 md:px-10">
                <Seo
                  title={newsItem?.title}
                  description={newsItem?.summary}
                  imagePath={
                    newsItem?.coverImage
                      ? `/images/news/${newsItem.slug}/${newsItem?.coverImage}`
                      : "/images/seo-image.png"
                  }
                />
                <div className="flex gap-3 items-center flex-wrap">
                  {authors && <AvatarList authors={authors} />}
                  <p className="font-semibold text-gray-900">
                    {formattedNames}
                  </p>
                </div>

                <div className="mt-4 flex justify-between">
                  <span className="flex gap-1 text-gray-700">
                    {newsItem?.publishedDate && (
                      <p className="">
                        {dateFormatter(newsItem?.publishedDate, "do MMM yyyy")}
                      </p>
                    )}
                    {newsItem?.wordCount && newsItem?.wordCount !== 0 ? (
                      <p className="">· {readTime(newsItem?.wordCount)}</p>
                    ) : null}
                  </span>
                </div>

                <div className="mt-8 prose max-w-none">
                  <h1 className="mt-4">{newsItem?.title}</h1>
                  <p className="text-lg">{newsItem?.summary}</p>
                  {newsItem?.coverImage && (
                    <div className="mt-10 not-prose">
                      <NextImage
                        width={1536}
                        height={800}
                        src={`/images/news/${newsItem.slug}/${newsItem?.coverImage}`}
                        alt={`${newsItem.title} Cover image`}
                        className="w-full rounded-md"
                      />
                    </div>
                  )}
                  <div className="mt-10">
                    <DocumentRenderer
                      document={newsItem?.content}
                      componentBlocks={{
                        inlineCta: (props) => (
                          <InlineCTA
                            title={props.title}
                            summary={props.summary}
                            linkButton={{
                              externalLink: props.externalLink,
                              href: props.href,
                              label: props.linkLabel,
                            }}
                          />
                        ),
                        divider: (props) => <Divider noIcon={props.noIcon} />,
                        banner: (props) => (
                          <Banner
                            heading={props.heading}
                            bodyText={props.bodyText}
                            externalLink={{
                              href: props.externalLinkHref,
                              label: props.externalLinkLabel,
                            }}
                          />
                        ),
                        youtubeEmbed: (props) => (
                          <YouTubeEmbed youtubeLink={props.youtubeLink} />
                        ),
                        tweetEmbed: (props) => (
                          <TweetEmbed tweet={props.tweet} />
                        ),
                        loopingVideo: (props) => (
                          <LoopingVideo
                            src={props.src}
                            caption={props.caption}
                          />
                        ),
                        image: (props) => (
                          <Image
                            src={props.src}
                            alt={props.alt}
                            caption={props.caption}
                          />
                        ),
                        testimonial: (props) => (
                          <Testimonial
                            quote={props.quote}
                            author={props.author}
                            workplaceOrSocial={props.workplaceOrSocial}
                            socialLink={props.socialLink}
                          />
                        ),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer home={home} />
        </div>
      </div>
    );
  });
}

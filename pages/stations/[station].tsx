import NextImage from "next/image";
import type { GetStaticPropsContext } from "next";
import { createReader } from "@keystatic/core/reader";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { getHomeData } from "../../utils/get-static-page-utils";
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
  // Get collection of all stations
  const slugsAll = await reader.collections.stations.list();
  const slugs = Array.from(
    new Set(slugsAll.map((item) => item.split("/")[1])),
  );

  return {
    // Generate paths for each rec
    paths: slugs.map((slug) => ({
      params: { station: slug },
    })),
    fallback: false,
  };
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const slug = params?.station;

  if (typeof slug !== "string") {
    throw new Error("What? WHYYYY");
  }

  const reader = createReader("", config);

  const slugEn = `en/${slug}`;
  const slugEs = `es/${slug}`;

  const stationEn = await reader.collections.stations.readOrThrow(slugEn, {
    resolveLinkedFiles: true,
  });

  const stationEs = await reader.collections.stations.readOrThrow(slugEs, {
    resolveLinkedFiles: true,
  });

  const authorsDataEn = await Promise.all(
    stationEn.authors.map(async (authorSlug : any) => {
      const author = await reader.collections.authors.read(authorSlug || "");
      return { ...author, slug: authorSlug };
    }),
  );

  const authorsDataEs = await Promise.all(
    stationEs.authors.map(async (authorSlug : any) => {
      const author = await reader.collections.authors.read(authorSlug || "");
      return { ...author, slug: authorSlug };
    }),
  );

  const [home] = await Promise.all([getHomeData()]);

  return {
    props: {
      stationEn: {
        ...stationEn,
        slug: slugEn,
      },
      stationEs: {
        ...stationEs,
        slug: slugEs,
      },
      authorsEn: authorsDataEn,
      authorsEs: authorsDataEs,
      home,
    },
  };
};

export default function Station({
  stationEn,
  stationEs,
  authorsEn,
  authorsEs,
  home,
}: {
  stationEn: any;
  stationEs: any;
  authorsEn: any;
  authorsEs: any;
  home: any;
}) {

  const { language } = useLanguage();

  return ["en", "es"].map(function (currentLanguage) {
    const station = currentLanguage === "en" ? stationEn : stationEs;
    const authors = currentLanguage === "en" ? authorsEn : authorsEs;

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
                  title={station.title}
                  description={station?.summary}
                  imagePath={
                    station.coverImage
                      ? `/images/stations/${station.slug}/${station.coverImage}`
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
                    {station.publishedDate && (
                      <p className="">
                        {dateFormatter(station.publishedDate, "do MMM yyyy")}
                      </p>
                    )}
                    {station.wordCount && station.wordCount !== 0 ? (
                      <p className="">· {readTime(station.wordCount)}</p>
                    ) : null}
                  </span>
                </div>

                <div className="mt-8 prose max-w-none">
                  <h1 className="mt-4">{station.title}</h1>
                  <p className="text-lg">{station.summary}</p>
                  {station.coverImage && (
                    <div className="mt-10 not-prose">
                      <NextImage
                        width={1536}
                        height={800}
                        src={`/images/stations/${station.slug}/${station.coverImage}`}
                        alt={`${station.title} Cover image`}
                        className="w-full rounded-md"
                      />
                    </div>
                  )}
                  <div className="mt-10">
                    <DocumentRenderer
                      document={station.content}
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

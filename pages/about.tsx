import type { InferGetStaticPropsType } from "next";
import { createReader } from "@keystatic/core/reader";
import config from "../keystatic.config";
import { DocumentRenderer } from "@keystatic/core/renderer";

import Seo from "../components/Seo";
import Banner from "../components/Banner";
import InlineCTA from "../components/InlineCTA";
import Divider from "../components/Divider";
import YouTubeEmbed from "../components/YouTubeEmbed";
import TweetEmbed from "../components/TweetEmbed";
import LoopingVideo from "../components/LoopingVideo";
import Image from "../components/Image";
import Testimonial from "../components/Testimonial";
import Header from "../components/Header";
import {
  getAboutPage,
  getAllAuthors,
  getExternalArticleData,
  getHomeData,
  getPostData,
} from "../utils/get-static-page-utils";
import Footer from "../components/Footer";

// export async function getStaticProps() {
//   const [home, posts, externalArticles, authors,aboutPage] = await Promise.all([
//     getHomeData(),
//     getPostData(),
//     getExternalArticleData(),
//     getAllAuthors(),
//     getAboutPage(),
//   ]);
//
//   console.log("/pages/about.tsx: aboutPage:", aboutPage)
//
//   return {
//     props: {
//       home,
//       posts,
//       externalArticles,
//       authors,
//       aboutPage,
//     },
//   };
// }

export async function getStaticProps() {
  const reader = createReader("", config);
  const aboutPage = await reader.singletons.about.read();
  const aboutPageContent = await (aboutPage?.content() || []);

  console.log("/pages/about.tsx: aboutPage:", aboutPage, "aboutPageContent:", aboutPageContent);

  const [home] = await Promise.all([getHomeData()]);

  return {
    props: {
      home,
      about: {
        ...aboutPage,
        content: aboutPageContent,
      },
    },
  };
}

export default function About({ about, home }: { about: any; home: any }) {

  return (
    <div className="flex min-h-screen flex-col font-sans bg-neutral-200/80">
      <Header home={home} />
      <main className="max-w-none flex flex-1 flex-col">
        <div className="flex-1">
          <div className="mx-auto px-4 md:px-10 prose max-w-4xl">
            <Seo title="The ArtPark at Borrego Springs" />
            <DocumentRenderer
              document={about.content}
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
                tweetEmbed: (props) => <TweetEmbed tweet={props.tweet} />,
                loopingVideo: (props) => (
                  <LoopingVideo src={props.src} caption={props.caption} />
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
      </main>
      <Footer home={home} />
    </div>
  );
}

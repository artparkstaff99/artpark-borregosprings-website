import React from "react";
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
import { getAllAuthors, getHomeData } from "../utils/get-static-page-utils";
import Footer from "../components/Footer";
import { useLanguage } from "../components/default-language-provider";

interface Image {
  src: string;
  alt: string;
  name: string;
  description: string;
}

interface ImageGroup {
  title: string;
  images: Image[];
}



const generateDummyName = () => { return "ipsum lorum"; }
const generateDummyDescription = () => { return "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"; }

const ImageGroup: React.FC<ImageGroup> = function ({ title, images }) {
  //function ImageGroup({ title, images }: ImageGroup) {
  return (
    <div className="pt-0.5">
      <div className="mb-10 p-6 border-4 border-gray-300 rounded-lg shadow-lg relative mt-12">
        {/* Group title adjusted to flow on the border, with more outer border padding */}
        <div className="absolute top-1 left-5 -translate-y-1/2 bg-neutral-200 px-3 -mt-4">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-6">
          {images.map((image, id) => (
            <div
              key={image.src}
              className="flex flex-col bg-white border-2 border-gray-300 rounded-lg shadow overflow-hidden"
            >
              {/* Image container with aspect ratio enforcement */}
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Text container with increased padding for more breathing room */}
              <div className="p-6">
                <p className="font-bold">{image.name}</p>
                <p className="text-sm">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const reader = createReader("", config);
  const aboutPageEn = await reader.singletons.aboutEn.read();
  const aboutPageContentEn = await (aboutPageEn?.content() || []);

  const aboutPageEs = await reader.singletons.aboutEs.read();
  const aboutPageContentEs = await (aboutPageEs?.content() || []);

  const [home] = await Promise.all([getHomeData()]);

  const authorData = await getAllAuthors();

  return {
    props: {
      home,
      aboutEn: {
        ...aboutPageEn,
        content: aboutPageContentEn,
      },
      aboutEs: {
        ...aboutPageEs,
        content: aboutPageContentEs,
      },
      authors: {
        ...authorData,
      },
    },
  };
}

export default function About({
  aboutEn,
  aboutEs,
  home,
  authors,
}: {
  aboutEn: any;
  aboutEs: any;
  home: any;
  authors: any;
}) {

  const imageSrc = "https://via.placeholder.com/150"; // Replace with your image placeholder

  const { language } = useLanguage();

  return ["en", "es"].map((currentLanguage: string) => {
    const about = currentLanguage === "en" ? aboutEn : aboutEs;

    interface Author {
      slug: string;
      avatar: string;
      nameEs: string;
      nameEn: string;
      descriptionEs: string;
      descriptionEn: string;
      authorType: string;
      showAuthor: boolean;
    }

    interface ImageType {
      src: string;
      alt: string;
      name: string;
      description: string;
    }

    interface ImageGroup {
      title: string;
      images: ImageType[];
    }

    let imageGroups: ImageGroup[] = [];

    function createImageGroup(title: string, authorType: string, authors: Author[], language: string): ImageGroup {
      return {
        title,
        images: Object.values(authors)
          .filter(author => author.authorType === authorType && author.showAuthor)
          .map(author => ({
            src: `/images/authors/${author.slug}/${author.avatar}`,
            alt: language === "es" ? author.nameEs : author.nameEn,
            name: language === "es" ? author.nameEs : author.nameEn,
            description: language === "es" ? author.descriptionEs : author.descriptionEn,
          })),
      };
    }

    imageGroups.push(createImageGroup(about.group1Title, "kid", authors, language));
    imageGroups.push(createImageGroup(about.group2Title, "staff", authors, language));
    imageGroups.push(createImageGroup(about.group3Title, "community", authors, language));

    if (about.addDummyImagesForTesting) {
      function addDummyImagesToGroup(groupIndex: number, numImages: number) {
        imageGroups[groupIndex].images.push(...Array.from({ length: numImages }, (_, index) => ({
          src: imageSrc,
          alt: `Dummy Image ${groupIndex + 1}-${index + 1}`,
          name: generateDummyName(),
          description: generateDummyDescription(),
        })));
      }

      if (about.addDummyImagesForTesting) {
        // Add dummy images to each group
        addDummyImagesToGroup(0, 1); // Add n new dummy images to imageGroup[0]
        addDummyImagesToGroup(1, 2); // Add n new dummy images to imageGroup[1]
        addDummyImagesToGroup(2, 5); // Add n new dummy images to imageGroup[2]
      }
    }

    const showPost = language === currentLanguage;

    return (
      <div
        key={currentLanguage}
        style={{ display: showPost ? "block" : "none" }}
      >
        <div
          className="flex min-h-screen flex-col font-sans bg-neutral-200"
          key={currentLanguage}
        >
          <Header home={home} />
          <main className="max-w-none flex flex-1 flex-col">
            <div className="flex-1">
              <div className="mx-auto px-4 md:px-10 prose max-w-4xl">
                <Seo title="The ArtPark at Borrego Springs" />

                {/* Big Title and Short Description */}
                <div className="text-center my-10">
                  <h1 className="text-4xl font-bold mb-4">{about.pageTitle}</h1>
                  <p className="text-lg">{about.pageTextBelowTitle}</p>
                </div>

                {/* ImageType Groups Rendered Here */}
                {imageGroups.map((group) => (
                  <ImageGroup
                    key={group.title}
                    title={group.title}
                    images={group.images}
                  />
                ))}

                <Divider noIcon={false} />

                <h2 className="text-3xl font-bold mb-4">
                  {about.titleAboveContent}
                </h2>

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
      </div>
    );
  });
}

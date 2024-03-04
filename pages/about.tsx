import React, { useState, useEffect } from "react";
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
import { getHomeData } from "../utils/get-static-page-utils";
import Footer from "../components/Footer";

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

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const generateRandomName = function () {
  const words = loremIpsum.split(" ");
  const firstName = getRandomItem(words);
  const lastName = getRandomItem(words.filter((word) => word !== firstName));
  return `${firstName} ${lastName}`;
};

const generateRandomDescription = function () {
  const words = loremIpsum.split(" ").filter((word) => word.length > 3); // Filter out short words
  const sentence = [];
  for (let i = 0; i < 4; i++) {
    sentence.push(getRandomItem(words));
  }
  return sentence.join(" ");
};

const getRandomItem = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)];

const ImageGroup: React.FC<ImageGroup> = function ({ title, images }) {
  return (
    <div className="pt-0.5">
      <div className="mb-10 p-6 border-4 border-gray-300 rounded-lg shadow-lg relative mt-12">
        {/* Group title adjusted to flow on the border, with more outer border padding */}
        <div className="absolute top-1 left-5 -translate-y-1/2 bg-neutral-200 px-3 -mt-4">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-6">
          {images.map((image) => (
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
  const aboutPage = await reader.singletons.about.read();
  const aboutPageContent = await (aboutPage?.content() || []);

  console.log(
    "/pages/about.tsx: aboutPage:",
    aboutPage,
    "aboutPageContent:",
    aboutPageContent,
  );

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
  const imageSrc = "https://via.placeholder.com/150"; // Replace with your image placeholder
  const groupTitles = ["Kids", "School Staff", "ArtPark and Community"]; // Array of group titles

  const [imageGroups, setImageGroups] = useState<ImageGroup[]>([]);

  useEffect(() => {
    const generateImageGroups = () => {
      const groups: ImageGroup[] = groupTitles.map((title, index) => {
        const numImages = Math.floor(Math.random() * 6) + 2; // Random between 2 and 7
        const images = Array.from({ length: numImages }).map((_) => ({
          src: imageSrc,
          alt: `Image ${index + 1}`,
          name: generateRandomName(),
          description: generateRandomDescription(),
        }));
        return { title, images };
      });
      setImageGroups(groups);
    };

    generateImageGroups();
  }, []);

  return (
    <div className="flex min-h-screen flex-col font-sans bg-neutral-200">
      <Header home={home} />
      <main className="max-w-none flex flex-1 flex-col">
        <div className="flex-1">
          <div className="mx-auto px-4 md:px-10 prose max-w-4xl">
            <Seo title="The ArtPark at Borrego Springs" />

            {/*<div className="container mx-auto px-4">*/}
            {/* Big Title and Short Description */}
            <div className="text-center my-10">
              <h1 className="text-4xl font-bold mb-4">
                The ArtPark Website Project
              </h1>
              <p className="text-lg">
                A collaborative effort to showcase the intersection of art,
                education, and community spirit.
              </p>
            </div>

            {/* Image Groups Rendered Here */}
            {imageGroups.map((group) => (
              <ImageGroup
                key={group.title}
                title={group.title}
                images={group.images}
              />
            ))}

            {/* Our Story Section */}
            <div className="my-10">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p>
                The inception of the ArtPark website is a testament to the power
                of collaboration and community spirit. It all began as a joint
                venture between the dedicated staff of Borrego High School, the
                creative and enthusiastic students ("The Kids"), the ArtPark
                itself, and a group of volunteer members from the community.
              </p>
              <p>
                Each party brought their unique strengths and perspectives to
                the table, creating a melting pot of ideas, skills, and
                passions.
              </p>
              <ul className="list-disc list-inside space-y-2 my-4">
                <li>
                  The high school staff provided the educational framework and
                  guidance, ensuring that the project aligned with learning
                  objectives and fostered student growth.
                </li>
                <li>
                  The students injected vitality, creativity, and fresh ideas
                  into the project, turning it into a vibrant and dynamic
                  platform.
                </li>
                <li>
                  The ArtPark offered a canvas for this creativity, a physical
                  and conceptual space where art and nature intersect, inspiring
                  all involved.
                </li>
                <li>
                  Meanwhile, the community volunteers contributed their time,
                  expertise, and resources, bridging the gap between the school,
                  the park, and the wider community.
                </li>
              </ul>
              <p>
                Together, this coalition transformed a simple idea into a
                flourishing website that showcases the beauty of collaboration,
                art, and education, making the ArtPark more accessible and
                engaging for everyone.
              </p>
            </div>
            {/*</div>*/}

            {/*<DocumentRenderer*/}
            {/*  document={about.content}*/}
            {/*  componentBlocks={{*/}
            {/*    inlineCta: (props) => (*/}
            {/*      <InlineCTA*/}
            {/*        title={props.title}*/}
            {/*        summary={props.summary}*/}
            {/*        linkButton={{*/}
            {/*          externalLink: props.externalLink,*/}
            {/*          href: props.href,*/}
            {/*          label: props.linkLabel,*/}
            {/*        }}*/}
            {/*      />*/}
            {/*    ),*/}
            {/*    divider: (props) => <Divider noIcon={props.noIcon} />,*/}
            {/*    banner: (props) => (*/}
            {/*      <Banner*/}
            {/*        heading={props.heading}*/}
            {/*        bodyText={props.bodyText}*/}
            {/*        externalLink={{*/}
            {/*          href: props.externalLinkHref,*/}
            {/*          label: props.externalLinkLabel,*/}
            {/*        }}*/}
            {/*      />*/}
            {/*    ),*/}
            {/*    youtubeEmbed: (props) => (*/}
            {/*      <YouTubeEmbed youtubeLink={props.youtubeLink} />*/}
            {/*    ),*/}
            {/*    tweetEmbed: (props) => <TweetEmbed tweet={props.tweet} />,*/}
            {/*    loopingVideo: (props) => (*/}
            {/*      <LoopingVideo src={props.src} caption={props.caption} />*/}
            {/*    ),*/}
            {/*    image: (props) => (*/}
            {/*      <Image*/}
            {/*        src={props.src}*/}
            {/*        alt={props.alt}*/}
            {/*        caption={props.caption}*/}
            {/*      />*/}
            {/*    ),*/}
            {/*    testimonial: (props) => (*/}
            {/*      <Testimonial*/}
            {/*        quote={props.quote}*/}
            {/*        author={props.author}*/}
            {/*        workplaceOrSocial={props.workplaceOrSocial}*/}
            {/*        socialLink={props.socialLink}*/}
            {/*      />*/}
            {/*    ),*/}
            {/*  }}*/}
            {/*/>*/}
          </div>
        </div>
      </main>
      <Footer home={home} />
    </div>
  );
}

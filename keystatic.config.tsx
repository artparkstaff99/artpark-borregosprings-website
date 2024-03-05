import { collection, config, fields, GitHubConfig, LocalConfig, singleton } from "@keystatic/core";

import { ComponentBlocks } from "./components/ComponentBlocks";

const storage: LocalConfig["storage"] | GitHubConfig["storage"] =
  process.env.NODE_ENV === "development"
    ? { kind: "local" }
    : {
        kind: "github",
        repo: "pkellner/artpark-nextjs-proto1",
      };

function getAboutSingletonConfig(language: string) {
  return {
    label: `${language}/About`,
    path: `content/pages/about/${language}/`,
    schema: {
      pageTitle: fields.text({
        label: "Top Title (ex: The ArtPark Website Project)",
      }),
      pageTextBelowTitle: fields.text({
        label: "Text Below Title (ex: The ArtPark Website Project)",
        multiline: true,
      }),

      group1Title: fields.text({ label: "Group 1 Title (Kids)" }),
      group2Title: fields.text({ label: "Group 2 Title (School Staff)" }),
      group3Title: fields.text({
        label: "Group 3 Title (ArtPark and Community)",
      }),

      addDummyImagesForTesting: fields.checkbox({
        label: "Add Dummy Images for Testing",
      }),

      titleAboveContent: fields.text({ label: "Title Above Content (Our Story)" }),

      content: fields.document({
        formatting: true,
        dividers: true,
        links: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2, 1],
        ],
        label: "Content",
        images: {
          directory: "public/images/about",
          publicPath: "/images/about",
          schema: {
            alt: fields.text({ label: "Alt text" }) as any,
            title: fields.text({ label: "Title" }) as any,
          },
        },
        componentBlocks: ComponentBlocks,
      }),
    },
  }
}

export default config({
  storage,
  singletons: {
    home: singleton({
      label: "Home",
      path: "content/pages/home/",
      schema: {
        special_banner_top_show: fields.checkbox({
          label: "Show Special Banner at Top of Page",
        }),
        special_banner_top_en: fields.text({
          label: "Special Banner at Top of Page (English)",
        }),
        special_banner_top_es: fields.text({
          label: "Special Banner at Top of Page (Spanish)",
        }),

        top_left_header_en: fields.text({
          label: "Message in header top left (English)",
        }),
        top_left_header_es: fields.text({
          label: "Message in header top left (Spanish)",
        }),

        copyright_message_after_c_en: fields.text({
          label: "CopyRight Message After c On Bottom of Page (English)",
        }),
        copyright_message_after_c_es: fields.text({
          label: "CopyRight Message After c On Bottom of Page (Spanish)",
        }),

        bottom_right_message_en: fields.text({
          label: "Message Showing on Bottom Right of Page (English)",
        }),
        bottom_right_message_es: fields.text({
          label: "Home Menu Item (Spanish)",
        }),

        menu_home_en: fields.text({
          label: "Home Menu Item (English)",
        }),
        menu_home_es: fields.text({
          label: "Home Menu Item (Spanish)",
        }),

        menu_about_en: fields.text({
          label: "About Menu Item (English)",
        }),
        menu_about_es: fields.text({
          label: "About Menu Item (Spanish)",
        }),

        heading_en: fields.document({
          formatting: {
            inlineMarks: {
              bold: true,
            },
          },
          label:
            "English Heading (note: text that is bolded will show up in blue)",
        }),
        heading_es: fields.document({
          formatting: {
            inlineMarks: {
              bold: true,
            },
          },
          label:
            "Spanish Heading (note: text that is bolded will show up in blue)",
        }),
      },
    }),
    aboutEn: singleton(getAboutSingletonConfig("en")),
    aboutEs: singleton(getAboutSingletonConfig("es")),
  },
  collections: {
    authors: collection({
      label: "Authors",
      path: "content/authors/*",
      slugField: "name",
      schema: {
        showAuthor: fields.checkbox({
          label: "Show Author",
          description:
            "Show this author on the site, if unchecked it will not be shown.",
        }),
        name: fields.slug({
          name: {
            label: "Name",
            validation: {
              length: {
                min: 1,
              },
            },
          },
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
        }),
        role: fields.text({ label: "Role" }),
        avatar: fields.image({
          label: "Author avatar",
          directory: "public/images/authors",
        }),
      },
    }),
    posts: collection({
      label: "Posts",
      path: "content/posts/**/",
      slugField: "title",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
          },
        }),
        summary: fields.text({
          label: "Summary",
          validation: { length: { min: 4 } },
        }),
        publishedDate: fields.date({ label: "Published Date" }),
        coverImage: fields.image({
          label: "Image",
          directory: "public/images/posts",
        }),
        wordCount: fields.integer({
          label: "Word count",
        }),
        authors: fields.array(
          fields.relationship({
            label: "Post author",
            collection: "authors",
          }),
          {
            label: "Authors",
            validation: { length: { min: 1 } },
            itemLabel: (props: any) => props.value || "Please select an author",
          },
        ),
        content: fields.document({
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "public/images/posts/content",
            publicPath: "/images/posts/content",
            schema: {
              alt: fields.text({ label: "Alt text" }) as any,
              title: fields.text({ label: "Title" }) as any,
            },
          },
          layouts: [
            [1, 1],
            [1, 1, 1],
            [2, 1],
            [1, 2, 1],
          ],
          label: "Content",
          componentBlocks: ComponentBlocks,
        }),
      },
    }),
    externalArticles: collection({
      label: "External Article",
      path: "content/externalArticles/*/",
      slugField: "title",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: { length: { min: 4 } },
          },
        }),
        directLink: fields.url({
          label: "Article Link",
        }),
        source: fields.text({
          label: "Link Source",
          defaultValue: "Read more.",
        }),
        coverImage: fields.image({
          label: "Cover Image",
          directory: "public/images/external-articles",
        }),
        summary: fields.text({
          label: "Summary",
          validation: { length: { min: 4, max: 200 } },
        }),
        publishedDate: fields.date({ label: "Published Date" }),
      },
    }),
  },
});

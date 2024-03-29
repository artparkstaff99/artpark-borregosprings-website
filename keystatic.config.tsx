import {
  collection,
  config,
  fields,
  GitHubConfig,
  LocalConfig,
  singleton,
} from "@keystatic/core";

import { ComponentBlocks } from "./components/ComponentBlocks";

const storage: LocalConfig["storage"] | GitHubConfig["storage"] =
  process.env.NODE_ENV === "development"
    ? { kind: "local" }
    : {
        kind: "github",
        repo: "artparkstaff99/artpark-borregosprings-website",
        branchPrefix: "dev",
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

      titleAboveContent: fields.text({
        label: "Title Above Content (Our Story)",
      }),

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
  };
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

        news_banner_top_en: fields.text({
          label: "Home Page News Title 'Top News' (English)",
        }),
        news_banner_top_es: fields.text({
          label: "Home Page News Title 'Top News' (Spanish)",
        }),

        news_banner_bottom_more_en: fields.text({
          label: "Home Page More News Text 'More News' (English)",
        }),
        news_banner_bottom_more_es: fields.text({
          label: "Home Page More News Text 'More News' (Spanish)",
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

        menu_news_en: fields.text({
          label: "News Menu Item (English)",
        }),
        menu_news_es: fields.text({
          label: "News Menu Item (Spanish)",
        }),

        heading_en: fields.document({
          formatting: {
            inlineMarks: {
              bold: true,
            },
          },
          label:
            "English Heading Home Page (note: text that is bolded will show up in blue)",
        }),
        heading_es: fields.document({
          formatting: {
            inlineMarks: {
              bold: true,
            },
          },
          label:
            "Spanish Heading Home Page (note: text that is bolded will show up in blue)",
        }),
        heading_news_en: fields.document({
          formatting: {
            inlineMarks: {
              bold: true,
            },
          },
          label:
            "English Heading NewsCategory Page (note: text that is bolded will show up in blue)",
        }),
        heading_news_es: fields.document({
          formatting: {
            inlineMarks: {
              bold: true,
            },
          },
          label:
            "Spanish Heading NewsCategory Page (note: text that is bolded will show up in blue)",
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
      slugField: "nameEn",
      columns: ["nameEn", "showAuthor"],
      schema: {
        showAuthor: fields.checkbox({
          label: "Show Author",
          description:
            "Show this author on the site, if unchecked it will not be shown.",
        }),
        authorType: fields.select({
          label: "Type Person",
          options: [
            { label: "Kids", value: "kid" },
            { label: "High School Staff", value: "staff" },
            { label: "ArtPark and Community", value: "community" },
          ] as any,
          defaultValue: "kid",
        }),
        nameEn: fields.slug({
          name: {
            label: "Name (English)",
            validation: {
              length: {
                min: 1,
              },
            },
          },
        }),
        descriptionEn: fields.text({
          label: "Description (English)",
          multiline: true,
        }),
        nameEs: fields.text({
          label: "Name (Spanish)",
        }),
        descriptionEs: fields.text({
          label: "Description (Spanish)",
          multiline: true,
        }),
        role: fields.text({ label: "Role" }),
        avatar: fields.image({
          label: "Author avatar",
          directory: "public/images/authors",
        }),
      },
    }),
    stations: collection({
      label: "Stations",
      path: "content/stations/**/",
      slugField: "title",
      columns: ["title","orderBy", "show"],
      schema: {
        show: fields.checkbox({
          label: "Show Station",
          description:
            "Show this station on the site, if unchecked it will not be shown.",
        }),
        orderBy: fields.text({
          label: "Order By",
          defaultValue: "",
          description:
            "Order by this field (Suggest always use the same length for all items, something like 001,002,003,..)",
        }),
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
          directory: "public/images/stations",
        }),
        wordCount: fields.integer({
          label: "Word count",
        }),
        authors: fields.array(
          fields.relationship({
            label: "Station author",
            collection: "authors",
          }) as any,
          {
            label: "Authors",
            validation: { length: { min: 1 } },
            itemLabel: (props: any) => props.value || "Please select an author",
          } as any,
        ),
        content: fields.document({
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "public/images/stations/content",
            publicPath: "/images/stations/content",
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
    news: collection({
      label: "News",
      path: "content/news/**/",
      slugField: "title",
      columns: ["title", "show", "publishedDate"],
      schema: {
        show: fields.checkbox({
          label: "Show News Item",
          description:
            "Show this news item on the site, if unchecked it will not be shown.",
        }),
        title: fields.slug({
          name: {
            label: "Title",
            description:
              "The title of the news item (upper and lower case including spaces. ex: My First NewsCategory Article) " +
              "Then, for the SLUG field below, replace spaces with dashes and make all lower case and use EXACTLY this format:  " +
              "en/2024-03-08-my-first-news-article or es/2024-03-08-my-first-news-article  For each article, both have to be created.  " +
              "Make sure to include the date at the beginning of the slug just like this or it will not sort properly",
          },
        }),
        summary: fields.text({
          label: "Summary",
          validation: { length: { min: 4 } },
        }),
        newsCategories: fields.array(
          fields.relationship({
            label: "NewsCategory Categories",
            collection: "newsCategories",
          }) as any,
          {
            label: "Categories",
            validation: { length: { min: 1 } },
            itemLabel: (props: any) =>
              props.value || "Please select a category",
          } as any,
        ),
        publishedDate: fields.date({
          label: "Published Date",
          validation: { isRequired: true },
        }),
        coverImage: fields.image({
          label: "Image",
          directory: "public/images/news",
        }),
        wordCount: fields.integer({
          label: "Word count",
        }),
        authors: fields.array(
          fields.relationship({
            label: "NewsCategory author",
            collection: "authors",
          }) as any,
          {
            label: "Authors",
            validation: { length: { min: 1 } },
            itemLabel: (props: any) => props.value || "Please select an author",
          } as any,
        ),
        content: fields.document({
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "public/images/news/content",
            publicPath: "/images/news/content",
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
    newsCategories: collection({
      label: "NewsCategories",
      path: "content/newsCategories/*",
      slugField: "categoryNameEn",
      columns: ["categoryNameEn", "categoryNameEs"],
      schema: {
        categoryNameEn: fields.slug({
          name: {
            label: "Category Name (English)",
            validation: {
              length: {
                min: 1,
              },
            },
          },
        }),
        categoryNameEs: fields.text({
          label: "Category Name (Spanish)",
          validation: {
            length: {
              min: 1,
            },
          },
        }),
      },
    }),
  },
});

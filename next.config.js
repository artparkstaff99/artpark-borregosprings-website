/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  typescript: { ignoreBuildErrors: true },
  i18n: {
    // These are the locales you want to support
    locales: ["en", "es"],
    // This is the default locale you want to be used when visiting a non-locale prefixed path
    defaultLocale: "en",
  },
  async redirects() {

    const redirectArray = [];


    // PRODUCTION! Add redirects for production
    if (process.env.ENVIRONMENT === "production") {
      redirectArray.push(
        {
          source: '/keystatic',
          destination: '/about',
          permanent: false, // Set to true if this is a permanent redirect
        });
    }

    // NOT PRODUCTION! Add redirects for development
    if (process.env.ENVIRONMENT !== "production") {
      redirectArray.push(
        {
          source: '/admin',
          destination: '/keystatic',
          permanent: false, // Set to true if this is a permanent redirect
        });
      redirectArray.push(
        {
          source: '/robots.txt',
          destination: '/robots/robots-no-crawl.txt',
          permanent: false, // Set to true if this is a permanent redirect
        });
    }

    return redirectArray;
  },
};

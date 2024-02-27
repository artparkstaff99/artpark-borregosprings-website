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
};

/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')()

module.exports = withMDX({
  reactStrictMode: false,
  typescript: { ignoreBuildErrors: true },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  i18n: {
    // These are the locales you want to support
    locales: ["en", "es"],
    // This is the default locale you want to be used when visiting a non-locale prefixed path
    defaultLocale: "en",
  },
});

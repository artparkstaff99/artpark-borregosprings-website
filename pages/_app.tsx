import type { AppProps } from "next/app";

import "../styles/global.css";
import "../styles/scoped-preflight.css";

import { LanguageProvider } from "../components/default-language-provider";

export async function getStaticProps({ locale } : { locale: string }) {
  return {
    props: {
      locale, // this is from build system
    },
  };
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider defaultLanguage={pageProps.locale ?? "en"}>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}

export default MyApp;

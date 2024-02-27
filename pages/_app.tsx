import type { AppProps } from "next/app";

import "../styles/global.css";
import "../styles/scoped-preflight.css";

import { LanguageProvider } from "../components/default-language-provider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider defaultLanguage="en">
      <Component {...pageProps} />
    </LanguageProvider>
  );
}

export default MyApp;

import type { AppProps } from "next/app";

import "../styles/global.css";
import "../styles/scoped-preflight.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { LanguageProvider } from "../components/default-language-provider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-neutral-200/80">
      <LanguageProvider defaultLanguage="en">
        <Header />
        <main className="max-w-none flex flex-1 flex-col">
          <div className="flex-1">
            <Component {...pageProps} />
          </div>
        </main>
        <Footer />
      </LanguageProvider>
    </div>
  );
}

export default MyApp;

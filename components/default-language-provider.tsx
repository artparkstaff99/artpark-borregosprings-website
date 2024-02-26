import React, { useState } from "react";

type AllowedLanguage = "en" | "es";

interface ILanguageContext {
  language: AllowedLanguage;
  setLanguage: (language: AllowedLanguage) => void;
}

// LanguageContext.tsx

const defaultLanguage: ILanguageContext = {
  language: "en", // default language
  setLanguage: () => {}, // placeholder function
};

const LanguageContext = React.createContext<ILanguageContext>(defaultLanguage);

export interface ILanguageProviderProps {
  defaultLanguage: AllowedLanguage;
  children?: React.ReactNode;
}

export function LanguageProvider({
  children,
  defaultLanguage,
}: ILanguageProviderProps) {
  const [language, setLanguage] = useState<AllowedLanguage>(defaultLanguage);

  const value: ILanguageContext = {
    language,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};

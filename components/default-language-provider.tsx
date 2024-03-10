import React, { useState } from "react";
//import useLocalStorage from "../utils/useLocalStorage";

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
  const [language, setLang] = useState<AllowedLanguage>(defaultLanguage);
  //const [language, setLanguage] = useLocalStorage<AllowedLanguage>("language", defaultLanguage)

  // Update this function to log a message every time it's called
  const setLanguage = (newLanguage: AllowedLanguage) => {
    //console.log(`Language changed to: ${newLanguage}`); // Log the language change
    setLang(newLanguage); // Update the state
  };

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

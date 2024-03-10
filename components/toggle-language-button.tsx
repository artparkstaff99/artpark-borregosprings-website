import React from "react";
import { useLanguage } from "./default-language-provider";

function ToggleLanguageButton() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "es" : "en";
    setLanguage(newLanguage);
  };

  // Hover titles for accessibility and user guidance
  const hoverTitle =
    language === "en" ? "cambiar al español" : "Switch to English";

  return (
    <div
      className="w-24 bg-blue-500 rounded-full p-1 flex items-center justify-center cursor-pointer"
      onClick={toggleLanguage}
      title={hoverTitle} // Adding title for hover effect
    >
      <div
        className={`w-12 h-12 rounded-full shadow flex items-center justify-center ${
          language === "en"
            ? "bg-white translate-x-6"
            : "bg-white -translate-x-6"
        }`}
        style={{ transition: "transform 0.3s ease-in-out" }}
      >
        {/* Only display the flag */}
        {language === "en" ? (
          <span className="text-2xl">🇺🇸</span>
        ) : (
          <span className="text-2xl">🇪🇸</span>
        )}
      </div>
    </div>
  );
}

export default ToggleLanguageButton;

import { createContext, useContext, useState, useEffect } from "react";

type Lang = "en" | "hi" | "ta" | "pa";

interface LangContextType {
    lang: Lang;
    setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
    const [lang, setLangState] = useState<Lang>("en");

    // 🔥 Load from localStorage on first render
    useEffect(() => {
        const savedLang = localStorage.getItem("lang") as Lang | null;
        if (savedLang) {
            setLangState(savedLang);
        }
    }, []);

    // 🔥 Save to localStorage whenever lang changes
    const setLang = (newLang: Lang) => {
        setLangState(newLang);
        localStorage.setItem("lang", newLang);
    };

    return (
        <LangContext.Provider value={{ lang, setLang }}>
            {children}
        </LangContext.Provider>
    );
};

export const useLang = () => {
    const context = useContext(LangContext);
    if (!context) {
        throw new Error("useLang must be used within LangProvider");
    }
    return context;
};
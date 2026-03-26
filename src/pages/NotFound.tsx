import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLang } from "@/context/LangContext";

const LABELS = {
  en: { heading: "404", message: "Oops! Page not found", back: "Return to Home" },
  hi: { heading: "404", message: "उफ़! पृष्ठ नहीं मिला", back: "होम पर वापस जाएं" },
  ta: { heading: "404", message: "அடடா! பக்கம் கிடைக்கவில்லை", back: "முகப்புக்குத் திரும்பு" },
  pa: { heading: "404", message: "ਓਹੋ! ਪੰਨਾ ਨਹੀਂ ਮਿਲਿਆ", back: "ਹੋਮ 'ਤੇ ਵਾਪਸ ਜਾਓ" },
};

const NotFound = () => {
  const location = useLocation();
  const { lang } = useLang();
  const t = LABELS[lang] ?? LABELS["en"];

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t.heading}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t.message}</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          {t.back}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
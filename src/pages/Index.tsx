import { useState, useCallback } from "react";
import { Leaf } from "lucide-react";
import Header from "@/components/Header";
import UploadArea from "@/components/UploadArea";
import ProcessingSpinner from "@/components/ProcessingSpinner";
import HistorySidebar from "@/components/HistorySidebar";
import { useNavigate } from "react-router-dom";
import { predictCrop } from "@/lib/api";
import { usePredictionHistory } from "@/hooks/use-prediction-history";
import { useLang } from "@/context/LangContext";
import ChatBot from "@/components/ChatBot";
import { useChatHistory } from "@/hooks/use-chat-history";

const LABELS = {
  en: {
    title: "Smart Agro Crop Disease Detection",
    subtitle: "Upload a photo of your crop leaf and get instant AI-based disease analysis with treatment recommendations.",
  },
  hi: {
    title: "स्मार्ट एग्रो फसल रोग पहचान",
    subtitle: "अपनी फसल की पत्ती की फोटो अपलोड करें और उपचार की सिफारिशों के साथ तत्काल AI-आधारित रोग विश्लेषण प्राप्त करें।",
  },
  ta: {
    title: "ஸ்மார்ட் அக்ரோ பயிர் நோய் கண்டறிதல்",
    subtitle: "உங்கள் பயிர் இலையின் புகைப்படத்தை பதிவேற்றி சிகிச்சை பரிந்துரைகளுடன் உடனடி AI-அடிப்படையிலான நோய் பகுப்பாய்வைப் பெறுங்கள்.",
  },
  pa: {
    title: "ਸਮਾਰਟ ਐਗਰੋ ਫਸਲ ਰੋਗ ਖੋਜ",
    subtitle: "ਆਪਣੀ ਫਸਲ ਦੀ ਪੱਤੀ ਦੀ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ ਅਤੇ ਇਲਾਜ ਦੀਆਂ ਸਿਫ਼ਾਰਸ਼ਾਂ ਦੇ ਨਾਲ ਤੁਰੰਤ AI-ਆਧਾਰਿਤ ਰੋਗ ਵਿਸ਼ਲੇਸ਼ਣ ਪ੍ਰਾਪਤ ਕਰੋ।",
  },
};

const LANG_OPTIONS = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "ta", label: "தமிழ்" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
] as const;

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { history, loading: historyLoading, refetch, clearHistory } = usePredictionHistory();
  const { lang, setLang } = useLang();
  const { sessions, loading: chatLoading } = useChatHistory();

  const t = LABELS[lang] ?? LABELS["en"];

  const handleAnalyze = useCallback(async (file: File) => {
    setIsProcessing(true);

    try {
      const data = await predictCrop(file, lang);

      if (data.status === "success") {
        setTimeout(() => refetch(), 1000);
      }

      navigate("/result", {
        state: {
          ...data,
          image_url: URL.createObjectURL(file),

        },
      });

    } catch (error) {
      console.error("Prediction error:", error);
      alert("Failed to connect to backend.");
    } finally {
      setIsProcessing(false);
    }
  }, [navigate, refetch, lang]);


  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <div className="mx-auto flex w-full max-w-7xl flex-1">
        <main className="flex flex-1 flex-col p-4 md:p-6">

          {/* Welcome section */}
          {!isProcessing && (
            <div className="mb-6 flex items-start gap-3 rounded-xl bg-primary/5 p-5">
              <div className="rounded-full bg-primary/10 p-2">
                <Leaf className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold md:text-2xl">{t.title}</h1>
                <p className="mt-1 text-sm text-muted-foreground">{t.subtitle}</p>

                {/* Language Selector */}
                <div className="mt-3 flex gap-2">
                  {LANG_OPTIONS.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLang(l.code)}
                      className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${lang === l.code
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Upload section */}
          <UploadArea onAnalyze={handleAnalyze} isProcessing={isProcessing} />

          <ChatBot language={lang} diseaseContext={null} />

          {/* Recent Chats Section */}
          {sessions.length > 0 && (
            <div style={{
              width: "100%", marginTop: "8px",
              border: "1px solid #d1fae5", borderRadius: "12px",
              padding: "16px", background: "#f0fdf4"
            }}>
              <h3 style={{
                margin: "0 0 12px", color: "#166534",
                fontSize: "15px", fontWeight: 600
              }}>
                🕒 Recent Chats
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {sessions.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => navigate("/chat", {
                      state: { sessionId: s.session_id }
                    })}
                    style={{
                      background: "white", borderRadius: "8px",
                      padding: "10px 14px", cursor: "pointer",
                      border: "1px solid #bbf7d0",
                      display: "flex", justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <span style={{ fontSize: "13px", color: "#166534", flex: 1 }}>
                      💬 {s.preview}
                    </span>
                    <span style={{ fontSize: "11px", color: "#9ca3af", marginLeft: "12px" }}>
                      {s.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Processing spinner */}
          {isProcessing && (
            <div className="mt-6">
              <ProcessingSpinner />
            </div>
          )}

        </main>

        {/* Prediction History Sidebar */}
        <aside className="hidden w-80 shrink-0 border-l p-4 lg:block">
          <HistorySidebar
            history={history}
            loading={historyLoading}
            onSelect={(record) => {
              navigate("/result", {
                state: {
                  status: "success",
                  crop: record.crop_name,
                  disease: record.disease_name.replace(/_/g, " "),
                  confidence: record.confidence,
                  crop_info: "View full details by re-analyzing.",
                  disease_info: null,
                  cure: null,
                  image_url: record.image_url,
                  gradcam_image: null,
                },
              });
            }}
            onClear={clearHistory}
          />
        </aside>
      </div>
    </div>
  );
};

export default Index;
import { useState, useCallback } from "react";
import { Leaf } from "lucide-react";
import Header from "@/components/Header";
import UploadArea from "@/components/UploadArea";
import ProcessingSpinner from "@/components/ProcessingSpinner";
import HistorySidebar from "@/components/HistorySidebar";
import { useNavigate } from "react-router-dom";
import { predictCrop } from "@/lib/api";
import { usePredictionHistory } from "@/hooks/use-prediction-history";


const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { history, loading: historyLoading, refetch, clearHistory } = usePredictionHistory();
  const [lang, setLang] = useState("en");

  const handleAnalyze = useCallback(async (file: File) => {
    setIsProcessing(true);

    try {
      const data = await predictCrop(file, lang);

      // Refetch prediction history after successful prediction
      // (the backend logs it to Supabase)
      if (data.status === "success") {
        setTimeout(() => refetch(), 1000); // small delay for Supabase write propagation
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
  }, [navigate, refetch]);


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
                <h1 className="text-xl font-bold md:text-2xl">
                  Smart Agro Crop Disease Detection
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Upload a photo of your crop leaf and get instant AI-based disease analysis
                  with treatment recommendations.
                </p>

                {/*Language Selector*/}
                <div className="mt-3 flex gap-2">
                  {[
                    { code: "en", label: "English" },
                    { code: "hi", label: "हिंदी" },
                    { code: "ta", label: "தமிழ்" },
                    { code: "pa", label: "ਪੰਜਾਬੀ" },
                  ].map((l) => (
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
                  ))} </div>
              </div>
            </div>
          )}

          {/* Upload section */}
          <UploadArea onAnalyze={handleAnalyze} isProcessing={isProcessing} />

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

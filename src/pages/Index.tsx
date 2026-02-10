import { useState, useCallback } from "react";
import { Leaf } from "lucide-react";
import Header from "@/components/Header";
import UploadArea from "@/components/UploadArea";
import ProcessingSpinner from "@/components/ProcessingSpinner";
import { useNavigate } from "react-router-dom";
import { predictCrop } from "@/lib/api";


const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = useCallback(async (file: File) => {
  setIsProcessing(true);

  try {
    const data = await predictCrop(file);

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
}, [navigate]);


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
      </div>
    </div>
  );
};

export default Index;

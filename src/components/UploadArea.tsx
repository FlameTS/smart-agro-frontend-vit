import { useState, useRef, useCallback } from "react";
import { Upload, ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface UploadAreaProps {
  onAnalyze: (file: File) => void;
  isProcessing: boolean;
}


const UploadArea = ({ onAnalyze, isProcessing }: UploadAreaProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file?.type.startsWith("image/")) handleFile(file);
    },
    [handleFile]
  );

  const clearFile = () => {
    setSelectedFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-5">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !selectedFile && inputRef.current?.click()}
        className={cn(
          "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-colors",
          dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50",
          selectedFile && "cursor-default"
        )}
      >
        {preview ? (
          <div className="relative">
            <img src={preview} alt="Preview" className="max-h-52 rounded-lg object-contain" />
            <button onClick={(e) => { e.stopPropagation(); clearFile(); }} className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow">
              <X className="h-4 w-4" />
            </button>
            <p className="mt-2 text-center text-sm text-muted-foreground">{selectedFile?.name}</p>
          </div>
        ) : (
          <>
            <div className="mb-3 rounded-full bg-primary/10 p-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <p className="font-semibold text-foreground">Drag & drop your crop image here</p>
            <p className="text-sm text-muted-foreground">or click to browse · PNG, JPG up to 10MB</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
      </div>

      {/* Model select + Analyze */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1 rounded-lg bg-primary/5 px-4 py-3 text-sm">
          <span className="font-medium">Model in use:</span>{" "}
          <span className="text-primary">Custom CNN (SmartAgro v1)</span>
        </div>


        <Button
          onClick={() => selectedFile && onAnalyze(selectedFile)}
          disabled={!selectedFile || isProcessing}
          className="gap-2"
          size="lg"
        >
          <ImageIcon className="h-4 w-4" />
          {isProcessing ? "Analyzing…" : "Analyze"}
        </Button>
      </div>
    </div>
  );
};

export default UploadArea;

import { useState } from "react";
import { History, ChevronRight, Trash2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { PredictionRecord } from "@/hooks/use-prediction-history";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface ChatSession {
  session_id: string;
  preview: string;
  date: string;
}

interface HistorySidebarProps {
  history: PredictionRecord[];
  loading?: boolean;
  onSelect: (record: PredictionRecord) => void;
  onClear: () => void;
  className?: string;
  chatSessions?: ChatSession[];
  chatLoading?: boolean;
}

const HistorySidebar = ({
  history,
  loading,
  onSelect,
  onClear,
  className,
  chatSessions = [],
  chatLoading,
}: HistorySidebarProps) => {
  const [activeTab, setActiveTab] = useState<"predictions" | "chats">("predictions");
  const navigate = useNavigate();

  return (
    <div className={cn("flex flex-col rounded-xl border bg-card", className)}>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("predictions")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium transition-colors",
            activeTab === "predictions"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <History className="h-4 w-4" />
          Predictions
        </button>

        <button
          onClick={() => setActiveTab("chats")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium transition-colors",
            activeTab === "chats"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <MessageSquare className="h-4 w-4" />
          Chats
        </button>
      </div>

      {/* Clear button for predictions tab */}
      {activeTab === "predictions" && history.length > 0 && (
        <div className="flex justify-end border-b px-4 py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-7 gap-1 text-xs text-muted-foreground"
          >
            <Trash2 className="h-3 w-3" /> Clear
          </Button>
        </div>
      )}

      <ScrollArea className="flex-1">

        {/* Predictions Tab */}
        {activeTab === "predictions" && (
          <>
            {loading ? (
              <p className="p-4 text-center text-sm text-muted-foreground">Loading history…</p>
            ) : history.length === 0 ? (
              <p className="p-4 text-center text-sm text-muted-foreground">
                No predictions yet. Upload an image to begin.
              </p>
            ) : (
              <div className="space-y-1 p-2">
                {history.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => onSelect(r)}
                    className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-muted"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                      {(r.confidence * 100).toFixed(0)}%
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {r.crop_name} — {r.disease_name.replace(/_/g, " ")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(r.created_at).toLocaleString()}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* Chats Tab */}
        {activeTab === "chats" && (
          <>
            {chatLoading ? (
              <p className="p-4 text-center text-sm text-muted-foreground">Loading chats…</p>
            ) : chatSessions.length === 0 ? (
              <p className="p-4 text-center text-sm text-muted-foreground">
                No chats yet. Ask the Farm Assistant something!
              </p>
            ) : (
              <div className="space-y-1 p-2">
                {chatSessions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => navigate("/chat", { state: { sessionId: s.session_id } })}
                    className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-muted"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{s.preview}</p>
                      <p className="text-xs text-muted-foreground">{s.date}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </button>
                ))}
              </div>
            )}
          </>
        )}

      </ScrollArea>
    </div>
  );
};

export default HistorySidebar;
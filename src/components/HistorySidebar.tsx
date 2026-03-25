import { History, ChevronRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { PredictionRecord } from "@/hooks/use-prediction-history";
import { cn } from "@/lib/utils";

interface HistorySidebarProps {
  history: PredictionRecord[];
  loading?: boolean;
  onSelect: (record: PredictionRecord) => void;
  onClear: () => void;
  className?: string;
}

const HistorySidebar = ({ history, loading, onSelect, onClear, className }: HistorySidebarProps) => {
  return (
    <div className={cn("flex flex-col rounded-xl border bg-card", className)}>
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <History className="h-4 w-4" />
          Prediction History
        </h3>
        {history.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear} className="h-7 gap-1 text-xs text-muted-foreground">
            <Trash2 className="h-3 w-3" /> Clear
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1">
        {loading ? (
          <p className="p-4 text-center text-sm text-muted-foreground">Loading history…</p>
        ) : history.length === 0 ? (
          <p className="p-4 text-center text-sm text-muted-foreground">No predictions yet. Upload an image to begin.</p>
        ) : (
          <div className="space-y-1 p-2">
            {history.map((r) => (
              <button
                key={r.id}
                onClick={() => onSelect(r)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-muted"
                )}
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
      </ScrollArea>
    </div>
  );
};

export default HistorySidebar;

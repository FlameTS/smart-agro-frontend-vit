import { History, ChevronRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { AnalysisResult } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface HistorySidebarProps {
  history: AnalysisResult[];
  activeId: string | null;
  onSelect: (result: AnalysisResult) => void;
  onClear: () => void;
  className?: string;
}

const HistorySidebar = ({ history, activeId, onSelect, onClear, className }: HistorySidebarProps) => {
  return (
    <div className={cn("flex flex-col rounded-xl border bg-card", className)}>
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <History className="h-4 w-4" />
          History
        </h3>
        {history.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear} className="h-7 gap-1 text-xs text-muted-foreground">
            <Trash2 className="h-3 w-3" /> Clear
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1">
        {history.length === 0 ? (
          <p className="p-4 text-center text-sm text-muted-foreground">No analyses yet. Upload an image to begin.</p>
        ) : (
          <div className="space-y-1 p-2">
            {history.map((r) => (
              <button
                key={r.id}
                onClick={() => onSelect(r)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-muted",
                  activeId === r.id && "bg-muted"
                )}
              >
                <img src={r.imageUrl} alt="" className="h-10 w-10 shrink-0 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{r.disease}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
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

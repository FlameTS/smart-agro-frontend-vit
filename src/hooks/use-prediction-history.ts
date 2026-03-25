import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export interface PredictionRecord {
  id: number;
  crop_name: string;
  disease_name: string;
  confidence    : number;
  image_url: string | null;
  created_at: string;
}

export function usePredictionHistory(limit = 20) {
  const [history, setHistory] = useState<PredictionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("prediction_history")
      .select("id, crop_name, disease_name, confidence, image_url, created_at")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (!error && data) {
      setHistory(data as PredictionRecord[]);
    }
    setLoading(false);
  }, [limit]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const clearHistory = useCallback(() => {
    // Only clears the local state — doesn't delete from Supabase
    setHistory([]);
  }, []);

  return { history, loading, refetch: fetchHistory, clearHistory };
}

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

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
  const { user } = useAuth();

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("prediction_history")
      .select("id, crop_name, disease_name, confidence, image_url, created_at")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (user) {
      query = query.eq("user_id", user.id);
    } else {
      query = query.is("user_id", null);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching prediction history (likely missing user_id column in Supabase):", error.message);
      setHistory([]);
    } else if (data) {
      setHistory(data as PredictionRecord[]);
    }
    setLoading(false);
  }, [limit, user]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const clearHistory = useCallback(async () => {
    setHistory([]);
    // Delete from Supabase based on user partitioning
    if (user) {
      await supabase.from("prediction_history").delete().eq("user_id", user.id);
    } else {
      await supabase.from("prediction_history").delete().is("user_id", null);
    }
  }, [user]);

  return { history, loading, refetch: fetchHistory, clearHistory };
}

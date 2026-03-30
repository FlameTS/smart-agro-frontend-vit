import { useState, useEffect } from "react";
import { getAuthHeaders } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface ChatSession {
    session_id: string;
    preview: string;
    date: string;
}

export function useChatHistory() {
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchSessions = async () => {
        // Only fetch sessions if user is authenticated
        if (!user) {
            setSessions([]);
            setLoading(false);
            return;
        }
        
        try {
            const headers = await getAuthHeaders();
            const res = await fetch(`${import.meta.env.VITE_API_URL}/chat/sessions`, { headers });
            const data = await res.json();
            setSessions(data.sessions?.slice(0, 5) || []); // only last 5
        } catch {
            setSessions([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSessions();
    }, [user]);

    return { sessions, loading, refetch: fetchSessions };
}
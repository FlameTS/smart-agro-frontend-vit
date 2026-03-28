import { useState, useEffect } from "react";

interface ChatSession {
    session_id: string;
    preview: string;
    date: string;
}

export function useChatHistory() {
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSessions = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/chat/sessions`);
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
    }, []);

    return { sessions, loading, refetch: fetchSessions };
}
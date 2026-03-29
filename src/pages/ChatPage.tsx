import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLang } from "@/context/LangContext";
import ReactMarkdown from "react-markdown";
import { getAuthHeaders } from "@/lib/api";

const LANGUAGES = {
    en: { placeholder: "Ask me anything about your crops...", send: "Send", clear: "Clear Chat", back: "← Back", history: "Past Chats", newChat: "New Chat" },
    hi: { placeholder: "अपनी फसल के बारे में पूछें...", send: "भेजें", clear: "चैट साफ़ करें", back: "← वापस", history: "पुरानी चैट", newChat: "नई चैट" },
    pa: { placeholder: "ਆਪਣੀ ਫਸਲ ਬਾਰੇ ਪੁੱਛੋ...", send: "ਭੇਜੋ", clear: "ਚੈਟ ਸਾਫ਼ ਕਰੋ", back: "← ਵਾਪਸ", history: "ਪੁਰਾਣੀ ਚੈਟ", newChat: "ਨਵੀਂ ਚੈਟ" },
    ta: { placeholder: "உங்கள் பயிர் பற்றி கேளுங்கள்...", send: "அனுப்பு", clear: "அரட்டையை அழி", back: "← திரும்பு", history: "பழைய அரட்டை", newChat: "புதிய அரட்டை" },
};

// Stable session ID per browser tab - persists across refresh
const getSessionId = () => {
    let id = localStorage.getItem("chat_session_id");
    if (!id) {
        id = `session_${Date.now()}`;
        localStorage.setItem("chat_session_id", id);
    }
    return id;
};


export default function ChatPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { lang } = useLang();
    const t = LANGUAGES[lang] || LANGUAGES.en;

    const initialMessage = location.state?.initialMessage || "";
    const diseaseContext = location.state?.diseaseContext || null;
    const sessionIdFromHistory = location.state?.sessionId || null;

    const SESSION_ID = getSessionId();

    const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [pastSessions, setPastSessions] = useState<{ session_id: string; preview: string; date: string }[]>([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const hasSentInitial = useRef(false);

    // Load session if coming from history click on home page
    useEffect(() => {
        if (sessionIdFromHistory) {
            loadSession(sessionIdFromHistory);
        }
    }, []);

    // Load messages from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(`chat_messages_${SESSION_ID}`);
        if (saved) {
            setMessages(JSON.parse(saved));
        }
    }, []);

    // Send initial message once
    useEffect(() => {
        if (initialMessage && !hasSentInitial.current) {
            hasSentInitial.current = true;
            sendMessage(initialMessage);
        }
    }, []);

    // Auto scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    // Load past sessions from Supabase
    const loadPastSessions = async () => {
        try {
            const headers = await getAuthHeaders();
            const res = await fetch(`${import.meta.env.VITE_API_URL}/chat/sessions`, { headers });
            const data = await res.json();
            setPastSessions(data.sessions || []);
        } catch {
            console.error("Failed to load sessions");
        }
    };

    // Load a past session's messages
    const loadSession = async (sessionId: string) => {
        try {
            const headers = await getAuthHeaders();
            const res = await fetch(`${import.meta.env.VITE_API_URL}/chat/sessions/${sessionId}`, { headers });
            const data = await res.json();
            const loaded = (data.messages || []).map((m: any) => ({
                role: m.role === "bot" ? "bot" : "user",
                text: m.message,
            }));
            setMessages(loaded);
            localStorage.setItem("chat_session_id", sessionId);
            setShowSidebar(false);
        } catch {
            console.error("Failed to load session");
        }
    };

    const sendMessage = async (overrideMessage?: string) => {
        const text = overrideMessage || input.trim();
        if (!text) return;

        setMessages((prev) => [...prev, { role: "user", text }]);
        setInput("");
        setLoading(true);

        try {
            const authHeaders = await getAuthHeaders();
            const res = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json", ...authHeaders },
                body: JSON.stringify({
                    message: text,
                    language: lang,
                    disease_context: diseaseContext,
                    session_id: SESSION_ID,
                }),
            });
            const data = await res.json();
            setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
        } catch {
            setMessages((prev) => [...prev, { role: "bot", text: "Something went wrong. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    const clearChat = async () => {
        setMessages([]);
        localStorage.removeItem(`chat_messages_${SESSION_ID}`);
        try {
            const headers = await getAuthHeaders();
            await fetch(`${import.meta.env.VITE_API_URL}/chat/history/${SESSION_ID}`, { method: "DELETE", headers });
        } catch { }
    };

    const startNewChat = () => {
        const newId = `session_${Date.now()}`;
        localStorage.setItem("chat_session_id", newId);
        localStorage.removeItem(`chat_messages_${newId}`);
        setMessages([]);
        setShowSidebar(false);
        window.location.reload();
    };

    return (
        <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", flexDirection: "column", fontFamily: "sans-serif" }}>

            {/* Header */}
            <div style={{
                background: "#1e293b", padding: "16px 24px",
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #334155"
            }}>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => navigate(-1)} style={{
                        background: "none", border: "1px solid #475569",
                        color: "#94a3b8", borderRadius: "8px",
                        padding: "6px 14px", cursor: "pointer", fontSize: "14px"
                    }}>{t.back}</button>

                    <button onClick={() => { setShowSidebar(!showSidebar); loadPastSessions(); }} style={{
                        background: "none", border: "1px solid #475569",
                        color: "#94a3b8", borderRadius: "8px",
                        padding: "6px 14px", cursor: "pointer", fontSize: "14px"
                    }}>📋 {t.history}</button>
                </div>

                <h1 style={{ color: "#f1f5f9", fontSize: "18px", margin: 0 }}>🌾 Farm Assistant</h1>

                <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={startNewChat} style={{
                        background: "none", border: "1px solid #22c55e",
                        color: "#22c55e", borderRadius: "8px",
                        padding: "6px 14px", cursor: "pointer", fontSize: "14px"
                    }}>+ {t.newChat}</button>

                    <button onClick={clearChat} style={{
                        background: "none", border: "1px solid #ef4444",
                        color: "#ef4444", borderRadius: "8px",
                        padding: "6px 14px", cursor: "pointer", fontSize: "14px"
                    }}>{t.clear}</button>
                </div>
            </div>

            {/* Past sessions sidebar */}
            {showSidebar && (
                <div style={{
                    position: "fixed", top: 0, left: 0,
                    width: "300px", height: "100vh",
                    background: "#1e293b", borderRight: "1px solid #334155",
                    zIndex: 100, padding: "20px", overflowY: "auto"
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                        <h3 style={{ color: "#f1f5f9", margin: 0 }}>📋 {t.history}</h3>
                        <button onClick={() => setShowSidebar(false)} style={{
                            background: "none", border: "none",
                            color: "#94a3b8", cursor: "pointer", fontSize: "18px"
                        }}>✕</button>
                    </div>

                    {pastSessions.length === 0 ? (
                        <p style={{ color: "#64748b", fontSize: "14px" }}>No past chats found.</p>
                    ) : (
                        pastSessions.map((s, i) => (
                            <div key={i} onClick={() => loadSession(s.session_id)} style={{
                                background: "#0f172a", borderRadius: "8px",
                                padding: "12px", marginBottom: "8px",
                                cursor: "pointer", border: "1px solid #334155"
                            }}>
                                <p style={{ color: "#e2e8f0", fontSize: "13px", margin: "0 0 4px" }}>{s.preview}</p>
                                <p style={{ color: "#64748b", fontSize: "11px", margin: 0 }}>{s.date}</p>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Disease context badge */}
            {diseaseContext && (
                <div style={{
                    background: "#166534", color: "#dcfce7",
                    padding: "10px 24px", fontSize: "13px",
                    borderBottom: "1px solid #15803d"
                }}>
                    🔍 Context: <strong>{diseaseContext.disease}</strong> detected in <strong>{diseaseContext.crop}</strong> ({diseaseContext.confidence}% confidence)
                </div>
            )}

            {/* Messages */}
            <div style={{
                flex: 1, overflowY: "auto", padding: "24px",
                display: "flex", flexDirection: "column", gap: "16px"
            }}>
                {messages.length === 0 && !loading && (
                    <div style={{ color: "#64748b", textAlign: "center", marginTop: "60px", fontSize: "15px" }}>
                        Ask anything about your crops, diseases, or treatments...
                    </div>
                )}

                {messages.map((msg, i) => (
                    <div key={i} style={{
                        display: "flex",
                        justifyContent: msg.role === "user" ? "flex-end" : "flex-start"
                    }}>
                        <div style={{
                            maxWidth: "70%", padding: "12px 16px",
                            borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                            background: msg.role === "user" ? "#16a34a" : "#1e293b",
                            color: msg.role === "user" ? "white" : "#e2e8f0",
                            fontSize: "14px", lineHeight: "1.6",
                            border: msg.role === "bot" ? "1px solid #334155" : "none"
                        }}>
                            {msg.role === "bot" ? (
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                            ) : (
                                msg.text
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div style={{ display: "flex", justifyContent: "flex-start" }}>
                        <div style={{
                            background: "#1e293b", border: "1px solid #334155",
                            borderRadius: "16px 16px 16px 4px",
                            padding: "12px 16px", color: "#64748b", fontSize: "14px"
                        }}>Thinking...</div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{
                background: "#1e293b", padding: "16px 24px",
                borderTop: "1px solid #334155",
                display: "flex", gap: "12px", alignItems: "flex-end"
            }}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                    placeholder={t.placeholder}
                    rows={2}
                    style={{
                        flex: 1, padding: "12px 16px", borderRadius: "12px",
                        fontSize: "14px", background: "#0f172a", color: "#f1f5f9",
                        border: "1px solid #334155", outline: "none",
                        resize: "none", fontFamily: "sans-serif"
                    }}
                />
                <button
                    onClick={() => sendMessage()}
                    disabled={loading}
                    style={{
                        background: "#16a34a", color: "white",
                        border: "none", borderRadius: "12px",
                        padding: "12px 24px", cursor: "pointer",
                        fontWeight: "bold", fontSize: "14px",
                        opacity: loading ? 0.6 : 1
                    }}
                >{t.send}</button>
            </div>
        </div>
    );
}
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLang } from "@/context/LangContext";
import ReactMarkdown from "react-markdown";

const LANGUAGES = {
    en: { placeholder: "Ask me anything about your crops...", send: "Send", clear: "Clear Chat", back: "← Back" },
    hi: { placeholder: "अपनी फसल के बारे में पूछें...", send: "भेजें", clear: "चैट साफ़ करें", back: "← वापस" },
    pa: { placeholder: "ਆਪਣੀ ਫਸਲ ਬਾਰੇ ਪੁੱਛੋ...", send: "ਭੇਜੋ", clear: "ਚੈਟ ਸਾਫ਼ ਕਰੋ", back: "← ਵਾਪਸ" },
    ta: { placeholder: "உங்கள் பயிர் பற்றி கேளுங்கள்...", send: "அனுப்பு", clear: "அரட்டையை அழி", back: "← திரும்பு" },
};

const SESSION_ID = `session_${Date.now()}`;

export default function ChatPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { lang } = useLang();
    const t = LANGUAGES[lang] || LANGUAGES.en;

    const initialMessage = location.state?.initialMessage || "";
    const diseaseContext = location.state?.diseaseContext || null;

    const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Auto-send the first message that came from home/result page
    useEffect(() => {
        if (initialMessage) {
            sendMessage(initialMessage);
        }
    }, []);

    // Auto scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const sendMessage = async (overrideMessage?: string) => {
        const text = overrideMessage || input.trim();
        if (!text) return;

        setMessages((prev) => [...prev, { role: "user", text }]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/chat/history/${SESSION_ID}`, {
                method: "DELETE",
            });
        } catch { }
    };

    return (
        <div style={{
            minHeight: "100vh", background: "#0f172a",
            display: "flex", flexDirection: "column",
            fontFamily: "sans-serif"
        }}>

            {/* Header */}
            <div style={{
                background: "#1e293b", padding: "16px 24px",
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #334155"
            }}>
                <button onClick={() => navigate(-1)} style={{
                    background: "none", border: "1px solid #475569",
                    color: "#94a3b8", borderRadius: "8px",
                    padding: "6px 14px", cursor: "pointer", fontSize: "14px"
                }}>{t.back}</button>

                <h1 style={{ color: "#f1f5f9", fontSize: "18px", margin: 0 }}>
                    🌾 Farm Assistant
                </h1>

                <button onClick={clearChat} style={{
                    background: "none", border: "1px solid #ef4444",
                    color: "#ef4444", borderRadius: "8px",
                    padding: "6px 14px", cursor: "pointer", fontSize: "14px"
                }}>{t.clear}</button>
            </div>

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
                flex: 1, overflowY: "auto",
                padding: "24px", display: "flex",
                flexDirection: "column", gap: "16px"
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
                        }}>
                            Thinking...
                        </div>
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
                        flex: 1, padding: "12px 16px",
                        borderRadius: "12px", fontSize: "14px",
                        background: "#0f172a", color: "#f1f5f9",
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
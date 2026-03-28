import { useState } from "react";

const LANGUAGES = {
    en: { placeholder: "Ask me anything about your crops...", send: "Send", title: "🌾 Farm Assistant" },
    hi: { placeholder: "अपनी फसल के बारे में पूछें...", send: "भेजें", title: "🌾 कृषि सहायक" },
    pa: { placeholder: "ਆਪਣੀ ਫਸਲ ਬਾਰੇ ਪੁੱਛੋ...", send: "ਭੇਜੋ", title: "🌾 ਖੇਤੀ ਸਹਾਇਕ" },
    ta: { placeholder: "உங்கள் பயிர் பற்றி கேளுங்கள்...", send: "அனுப்பு", title: "🌾 விவசாய உதவியாளர்" },
};

interface DiseaseContext {
    disease: string;
    crop: string;
    confidence: string | number;
}

interface ChatBotProps {
    language?: string;
    diseaseContext?: DiseaseContext | null;
}

export default function ChatBot({ language = "en", diseaseContext = null }: ChatBotProps) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const lang = LANGUAGES[language] || LANGUAGES.en;

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = { role: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: input,
                    language,
                    disease_context: diseaseContext, // null on home, filled on result page
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

    return (
        <div style={{
            border: "1px solid #d1fae5", borderRadius: "12px",
            padding: "16px", maxWidth: "100%", margin: "24px auto",
            background: "#f0fdf4", fontFamily: "sans-serif"
        }}>
            <h3 style={{ margin: "0 0 12px", color: "#166534" }}>{lang.title}</h3>

            {/* Disease context badge (result page only) */}
            {diseaseContext && (
                <div style={{
                    background: "#dcfce7", borderRadius: "8px",
                    padding: "8px 12px", marginBottom: "12px",
                    fontSize: "13px", color: "#166534"
                }}>
                    🔍 Context: <strong>{diseaseContext.disease}</strong> detected in <strong>{diseaseContext.crop}</strong>
                </div>
            )}

            {/* Chat messages */}
            {(messages.length > 0 || loading) && (
                <div style={{
                    maxHeight: "500px", overflowY: "auto",
                    background: "white", borderRadius: "8px",
                    padding: "12px", marginBottom: "12px",
                    border: "1px solid #bbf7d0"
                }}>
                    {messages.map((msg, i) => (
                        <div key={i} style={{
                            textAlign: msg.role === "user" ? "right" : "left",
                            marginBottom: "8px"
                        }}>
                            <span style={{
                                display: "inline-block", padding: "8px 12px",
                                borderRadius: "8px", fontSize: "14px", maxWidth: "80%",
                                background: msg.role === "user" ? "#16a34a" : "#f3f4f6",
                                color: msg.role === "user" ? "white" : "#111"
                            }}>
                                {msg.text}
                            </span>
                        </div>
                    ))}
                    {loading && (
                        <div style={{ color: "#6b7280", fontSize: "13px" }}>Thinking...</div>
                    )}
                </div>
            )}

            {/* Input */}
            <div style={{ display: "flex", gap: "8px" }}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                    placeholder={lang.placeholder}
                    rows={3}
                    style={{
                        flex: 1, padding: "10px 14px", borderRadius: "8px",
                        border: "1px solid #bbf7d0", fontSize: "14px", outline: "none",
                        resize: "none", fontFamily: "sans-serif"
                    }}
                />
                <button
                    onClick={sendMessage}
                    disabled={loading}
                    style={{
                        background: "#16a34a", color: "white",
                        border: "none", borderRadius: "8px",
                        padding: "10px 18px", cursor: "pointer", fontWeight: "bold"
                    }}
                >
                    {lang.send}
                </button>
            </div>
        </div>
    );
}
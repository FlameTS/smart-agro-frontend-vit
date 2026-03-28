import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const lang = LANGUAGES[language] || LANGUAGES.en;

    const sendMessage = () => {
        if (!input.trim()) return;
        navigate("/chat", {
            state: {
                initialMessage: input,
                diseaseContext: diseaseContext,
            },
        });
    };

    return (
        <div style={{
            border: "1px solid #d1fae5", borderRadius: "12px",
            padding: "16px", width: "100%", margin: "24px 0",
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
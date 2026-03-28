import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLang } from "@/context/LangContext";
import ChatBot from "@/components/ChatBot";

const CONFIDENCE_THRESHOLD = 0.6;

const LABELS = {
  en: {
    title: "SmartAgro Diagnosis Result",
    cropDetected: "🌱 Crop Detected",
    gradcam: "🔥 AI Focus Area (Grad-CAM)",
    gradcamNote: "Highlighted regions indicate areas the AI focused on while making its diagnosis.",
    uploadedImage: "📸 Uploaded Leaf Image",
    diseaseStatus: "🦠 Disease Status",
    healthy: "✅ The crop appears healthy.",
    cure: "💊 Recommended Cure",
    confidence: "Confidence Score",
    analyzeAnother: "🔙 Analyze Another Image",
    noResult: "No result data found. Please upload an image again.",
    lowConfTitle: "⚠️ Nothing Detectable",
    lowConfDesc: "The uploaded image could not be confidently identified as a crop leaf. Please ensure that the image clearly shows a plant leaf.",
    uploadAnother: "🔄 Upload Another Image",
    agriHelp: "🌾 Agricultural Help",
  },
  hi: {
    title: "स्मार्टएग्रो निदान परिणाम",
    cropDetected: "🌱 पहचानी गई फसल",
    gradcam: "🔥 AI फोकस क्षेत्र (Grad-CAM)",
    gradcamNote: "हाइलाइट किए गए क्षेत्र वे हैं जहाँ AI ने निदान करते समय ध्यान केंद्रित किया।",
    uploadedImage: "📸 अपलोड की गई पत्ती की छवि",
    diseaseStatus: "🦠 रोग की स्थिति",
    healthy: "✅ फसल स्वस्थ दिखती है।",
    cure: "💊 अनुशंसित उपचार",
    confidence: "विश्वास स्कोर",
    analyzeAnother: "🔙 दूसरी छवि विश्लेषण करें",
    noResult: "कोई परिणाम डेटा नहीं मिला। कृपया फिर से एक छवि अपलोड करें।",
    lowConfTitle: "⚠️ कुछ पहचाना नहीं गया",
    lowConfDesc: "अपलोड की गई छवि को फसल की पत्ती के रूप में आत्मविश्वास से पहचाना नहीं जा सका। कृपया सुनिश्चित करें कि छवि में पौधे की पत्ती स्पष्ट रूप से दिखे।",
    uploadAnother: "🔄 दूसरी छवि अपलोड करें",
    agriHelp: "🌾 कृषि सहायता",
  },
  ta: {
    title: "ஸ்மார்ட்அக்ரோ நோயறிதல் முடிவு",
    cropDetected: "🌱 கண்டறியப்பட்ட பயிர்",
    gradcam: "🔥 AI கவனம் செலுத்திய பகுதி (Grad-CAM)",
    gradcamNote: "முன்னிலைப்படுத்தப்பட்ட பகுதிகள் நோயறிதலின் போது AI கவனம் செலுத்திய இடங்களை காட்டுகின்றன.",
    uploadedImage: "📸 பதிவேற்றிய இலை படம்",
    diseaseStatus: "🦠 நோய் நிலை",
    healthy: "✅ பயிர் ஆரோக்கியமாக தெரிகிறது.",
    cure: "💊 பரிந்துரைக்கப்பட்ட தீர்வு",
    confidence: "நம்பகத்தன்மை மதிப்பெண்",
    analyzeAnother: "🔙 மற்றொரு படத்தை பகுப்பாய்வு செய்",
    noResult: "முடிவு தரவு எதுவும் இல்லை. மீண்டும் படம் பதிவேற்றவும்.",
    lowConfTitle: "⚠️ எதுவும் கண்டறியப்படவில்லை",
    lowConfDesc: "பதிவேற்றிய படம் பயிர் இலையாக உறுதியாக அடையாளம் காண முடியவில்லை. படத்தில் தாவர இலை தெளிவாக தெரிவதை உறுதிப்படுத்தவும்.",
    uploadAnother: "🔄 மற்றொரு படம் பதிவேற்று",
    agriHelp: "🌾 விவசாய உதவி",
  },
  pa: {
    title: "ਸਮਾਰਟਐਗਰੋ ਨਿਦਾਨ ਨਤੀਜਾ",
    cropDetected: "🌱 ਪਛਾਣੀ ਗਈ ਫਸਲ",
    gradcam: "🔥 AI ਫੋਕਸ ਖੇਤਰ (Grad-CAM)",
    gradcamNote: "ਉਜਾਗਰ ਕੀਤੇ ਖੇਤਰ ਉਹ ਹਨ ਜਿੱਥੇ AI ਨੇ ਨਿਦਾਨ ਕਰਦੇ ਸਮੇਂ ਧਿਆਨ ਦਿੱਤਾ।",
    uploadedImage: "📸 ਅਪਲੋਡ ਕੀਤੀ ਪੱਤੀ ਦੀ ਤਸਵੀਰ",
    diseaseStatus: "🦠 ਬਿਮਾਰੀ ਦੀ ਸਥਿਤੀ",
    healthy: "✅ ਫਸਲ ਸਿਹਤਮੰਦ ਦਿਖਦੀ ਹੈ।",
    cure: "💊 ਸਿਫ਼ਾਰਸ਼ੀ ਇਲਾਜ",
    confidence: "ਭਰੋਸੇ ਦਾ ਸਕੋਰ",
    analyzeAnother: "🔙 ਦੂਜੀ ਤਸਵੀਰ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
    noResult: "ਕੋਈ ਨਤੀਜਾ ਡੇਟਾ ਨਹੀਂ ਮਿਲਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ।",
    lowConfTitle: "⚠️ ਕੁਝ ਪਛਾਣਿਆ ਨਹੀਂ ਗਿਆ",
    lowConfDesc: "ਅਪਲੋਡ ਕੀਤੀ ਤਸਵੀਰ ਨੂੰ ਫਸਲ ਦੀ ਪੱਤੀ ਵਜੋਂ ਭਰੋਸੇ ਨਾਲ ਪਛਾਣਿਆ ਨਹੀਂ ਜਾ ਸਕਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਯਕੀਨੀ ਕਰੋ ਕਿ ਤਸਵੀਰ ਵਿੱਚ ਪੌਦੇ ਦੀ ਪੱਤੀ ਸਾਫ਼ ਦਿਖੇ।",
    uploadAnother: "🔄 ਦੂਜੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ",
    agriHelp: "🌾 ਖੇਤੀਬਾੜੀ ਸਹਾਇਤਾ",
  },
};

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const { lang } = useLang();
  const t = LABELS[lang] ?? LABELS["en"];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        {t.noResult}
      </div>
    );
  }



  const {
    crop,
    disease,
    confidence,
    crop_info,
    disease_info,
    cure,
    image_url,
    gradcam_image,
  } = data;

  /* 🔴 LOW CONFIDENCE CASE */
  if (confidence < CONFIDENCE_THRESHOLD) {
    return (
      <div className="min-h-screen bg-green-50 p-6 flex items-center justify-center">
        <div className="max-w-xl bg-white rounded-2xl shadow-lg p-8 text-center space-y-4">
          <h1 className="text-2xl font-bold text-red-600">{t.lowConfTitle}</h1>

          <p className="text-gray-700">{t.lowConfDesc}</p>

          <p className="text-sm text-gray-500">
            {t.confidence}: {(confidence * 100).toFixed(2)}%
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => navigate("/")}
              className="rounded-lg bg-green-600 px-6 py-2 text-white font-medium hover:bg-green-700 transition"
            >
              {t.uploadAnother}
            </button>

            <a
              href="https://icar.org.in"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-green-600 px-6 py-2 text-green-700 font-medium hover:bg-green-50 transition"
            >
              {t.agriHelp}
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* 🟢 NORMAL HIGH-CONFIDENCE CASE */
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-green-700 text-center">
          {t.title}
        </h1>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">{t.cropDetected}</h2>
          <p className="text-lg font-medium">{crop}</p>
          <p className="text-gray-700">{crop_info}</p>
        </section>

        {gradcam_image && (
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">{t.gradcam}</h2>
            <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src={`data:image/jpeg;base64,${gradcam_image}`}
                alt="Grad-CAM"
                className="object-contain h-full"
              />
            </div>
            <p className="text-sm text-gray-500">{t.gradcamNote}</p>
          </section>
        )}

        {image_url && (
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">{t.uploadedImage}</h2>
            <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              <img src={image_url} alt="Crop Leaf" className="object-contain h-full" />
            </div>
          </section>
        )}

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">{t.diseaseStatus}</h2>
          {disease === "Healthy" ? (
            <p className="text-green-600 font-medium">{t.healthy}</p>
          ) : (
            <>
              <p className="text-red-600 font-medium">{disease}</p>
              <p className="text-gray-700">{disease_info}</p>
            </>
          )}
        </section>

        {disease !== "Healthy" && (
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">{t.cure}</h2>
            <p className="text-gray-700">{cure}</p>
          </section>
        )}

        <div className="pt-4 text-sm text-gray-500 text-center">
          {t.confidence}: {(confidence * 100).toFixed(2)}%
        </div>

        <div className="pt-6 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-green-600 px-6 py-2 text-white font-medium hover:bg-green-700 transition"
          >
            {t.analyzeAnother}
          </button>
        </div>

        <ChatBot
          language={lang}
          diseaseContext={{
            disease,
            crop,
            confidence: (confidence * 100).toFixed(2)
          }}
        />
      </div>
    </div>
  );
}
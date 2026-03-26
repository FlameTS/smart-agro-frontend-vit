import { Zap, Layers, MonitorSmartphone, Leaf, ScanSearch, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { useLang } from "@/context/LangContext";

const LABELS = {
  en: {
    title: "About Smart Agro",
    subtitle: "Smart Agro Crop Disease Detection System leverages cutting-edge deep learning to help farmers and agronomists quickly identify plant diseases from leaf images, enabling timely intervention and healthier harvests.",
    howItWorks: "How It Works",
    features: [
      { title: "Instant Detection", desc: "Get results in seconds with our optimized deep learning models." },
      { title: "Multiple Models", desc: "Choose from various CNN architectures for the best accuracy." },
      { title: "Easy to Use", desc: "Simple drag-and-drop interface works on any device." },
      { title: "Detailed Analysis", desc: "Confidence scores and actionable recommendations." },
      { title: "Crop Support", desc: "Covers tomato, corn, rice, wheat, and more crops." },
      { title: "Reliable", desc: "Trained on thousands of field images for real-world accuracy." },
    ],
    steps: [
      { title: "Upload", desc: "Take a photo of the affected crop leaf and upload it to the system." },
      { title: "Analyze", desc: "Select an AI model and let the system process the image using deep learning." },
      { title: "Act", desc: "Receive disease identification, confidence score, and treatment recommendations." },
    ],
  },
  hi: {
    title: "स्मार्ट एग्रो के बारे में",
    subtitle: "स्मार्ट एग्रो फसल रोग पहचान प्रणाली अत्याधुनिक डीप लर्निंग का उपयोग करके किसानों और कृषिविदों को पत्ती की छवियों से पौधों की बीमारियों की त्वरित पहचान करने में मदद करती है।",
    howItWorks: "यह कैसे काम करता है",
    features: [
      { title: "तत्काल पहचान", desc: "हमारे अनुकूलित डीप लर्निंग मॉडल से सेकंडों में परिणाम प्राप्त करें।" },
      { title: "एकाधिक मॉडल", desc: "सर्वोत्तम सटीकता के लिए विभिन्न CNN आर्किटेक्चर में से चुनें।" },
      { title: "उपयोग में आसान", desc: "सरल ड्रैग-एंड-ड्रॉप इंटरफ़ेस किसी भी डिवाइस पर काम करता है।" },
      { title: "विस्तृत विश्लेषण", desc: "विश्वास स्कोर और कार्रवाई योग्य सिफारिशें।" },
      { title: "फसल समर्थन", desc: "टमाटर, मक्का, चावल, गेहूं और अन्य फसलों को कवर करता है।" },
      { title: "विश्वसनीय", desc: "वास्तविक दुनिया की सटीकता के लिए हजारों क्षेत्र छवियों पर प्रशिक्षित।" },
    ],
    steps: [
      { title: "अपलोड करें", desc: "प्रभावित फसल की पत्ती की फोटो लें और इसे सिस्टम में अपलोड करें।" },
      { title: "विश्लेषण करें", desc: "AI मॉडल चुनें और सिस्टम को डीप लर्निंग का उपयोग करके छवि प्रोसेस करने दें।" },
      { title: "कार्य करें", desc: "रोग की पहचान, विश्वास स्कोर और उपचार की सिफारिशें प्राप्त करें।" },
    ],
  },
  ta: {
    title: "ஸ்மார்ட் அக்ரோ பற்றி",
    subtitle: "ஸ்மார்ட் அக்ரோ பயிர் நோய் கண்டறிதல் அமைப்பு நவீன டீப் லேர்னிங் தொழில்நுட்பத்தைப் பயன்படுத்தி விவசாயிகளுக்கு இலை படங்களிலிருந்து தாவர நோய்களை விரைவாக கண்டறிய உதவுகிறது.",
    howItWorks: "இது எப்படி வேலை செய்கிறது",
    features: [
      { title: "உடனடி கண்டறிதல்", desc: "எங்கள் மேம்படுத்தப்பட்ட டீப் லேர்னிங் மாடல்களுடன் நொடிகளில் முடிவுகளைப் பெறுங்கள்." },
      { title: "பல மாடல்கள்", desc: "சிறந்த துல்லியத்திற்காக பல்வேறு CNN கட்டமைப்புகளில் இருந்து தேர்ந்தெடுங்கள்." },
      { title: "பயன்படுத்த எளிதானது", desc: "எளிய இழுத்து விடும் இடைமுகம் எந்த சாதனத்திலும் வேலை செய்கிறது." },
      { title: "விரிவான பகுப்பாய்வு", desc: "நம்பகத்தன்மை மதிப்பெண்கள் மற்றும் செயல்படக்கூடிய பரிந்துரைகள்." },
      { title: "பயிர் ஆதரவு", desc: "தக்காளி, சோளம், அரிசி, கோதுமை மற்றும் பல பயிர்களை உள்ளடக்கியது." },
      { title: "நம்பகமான", desc: "உண்மையான உலக துல்லியத்திற்காக ஆயிரக்கணக்கான கள படங்களில் பயிற்சி பெற்றது." },
    ],
    steps: [
      { title: "பதிவேற்று", desc: "பாதிக்கப்பட்ட பயிர் இலையின் புகைப்படம் எடுத்து கணினியில் பதிவேற்றவும்." },
      { title: "பகுப்பாய்வு செய்", desc: "AI மாடலை தேர்ந்தெடுத்து டீப் லேர்னிங் மூலம் படத்தை செயலாக்க விடுங்கள்." },
      { title: "நடவடிக்கை எடு", desc: "நோய் அடையாளம், நம்பகத்தன்மை மதிப்பெண் மற்றும் சிகிச்சை பரிந்துரைகளைப் பெறுங்கள்." },
    ],
  },
  pa: {
    title: "ਸਮਾਰਟ ਐਗਰੋ ਬਾਰੇ",
    subtitle: "ਸਮਾਰਟ ਐਗਰੋ ਫਸਲ ਰੋਗ ਖੋਜ ਪ੍ਰਣਾਲੀ ਅਤਿ-ਆਧੁਨਿਕ ਡੀਪ ਲਰਨਿੰਗ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕਿਸਾਨਾਂ ਨੂੰ ਪੱਤੀਆਂ ਦੀਆਂ ਤਸਵੀਰਾਂ ਤੋਂ ਪੌਦਿਆਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਦੀ ਛੇਤੀ ਪਛਾਣ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦੀ ਹੈ।",
    howItWorks: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    features: [
      { title: "ਤੁਰੰਤ ਪਛਾਣ", desc: "ਸਾਡੇ ਅਨੁਕੂਲਿਤ ਡੀਪ ਲਰਨਿੰਗ ਮਾਡਲਾਂ ਨਾਲ ਸਕਿੰਟਾਂ ਵਿੱਚ ਨਤੀਜੇ ਪ੍ਰਾਪਤ ਕਰੋ।" },
      { title: "ਕਈ ਮਾਡਲ", desc: "ਸਭ ਤੋਂ ਵਧੀਆ ਸ਼ੁੱਧਤਾ ਲਈ ਵੱਖ-ਵੱਖ CNN ਆਰਕੀਟੈਕਚਰ ਵਿੱਚੋਂ ਚੁਣੋ।" },
      { title: "ਵਰਤਣ ਵਿੱਚ ਆਸਾਨ", desc: "ਸਧਾਰਨ ਡਰੈਗ-ਐਂਡ-ਡਰਾਪ ਇੰਟਰਫੇਸ ਕਿਸੇ ਵੀ ਡਿਵਾਈਸ 'ਤੇ ਕੰਮ ਕਰਦਾ ਹੈ।" },
      { title: "ਵਿਸਤ੍ਰਿਤ ਵਿਸ਼ਲੇਸ਼ਣ", desc: "ਭਰੋਸੇ ਦੇ ਸਕੋਰ ਅਤੇ ਕਾਰਵਾਈਯੋਗ ਸਿਫ਼ਾਰਸ਼ਾਂ।" },
      { title: "ਫਸਲ ਸਹਾਇਤਾ", desc: "ਟਮਾਟਰ, ਮੱਕੀ, ਚੌਲ, ਕਣਕ ਅਤੇ ਹੋਰ ਫਸਲਾਂ ਨੂੰ ਕਵਰ ਕਰਦਾ ਹੈ।" },
      { title: "ਭਰੋਸੇਮੰਦ", desc: "ਅਸਲ ਦੁਨੀਆ ਦੀ ਸ਼ੁੱਧਤਾ ਲਈ ਹਜ਼ਾਰਾਂ ਖੇਤ ਤਸਵੀਰਾਂ 'ਤੇ ਸਿਖਲਾਈ ਦਿੱਤੀ।" },
    ],
    steps: [
      { title: "ਅਪਲੋਡ ਕਰੋ", desc: "ਪ੍ਰਭਾਵਿਤ ਫਸਲ ਦੀ ਪੱਤੀ ਦੀ ਫੋਟੋ ਲਓ ਅਤੇ ਸਿਸਟਮ ਵਿੱਚ ਅਪਲੋਡ ਕਰੋ।" },
      { title: "ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ", desc: "AI ਮਾਡਲ ਚੁਣੋ ਅਤੇ ਸਿਸਟਮ ਨੂੰ ਡੀਪ ਲਰਨਿੰਗ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਤਸਵੀਰ ਪ੍ਰੋਸੈਸ ਕਰਨ ਦਿਓ।" },
      { title: "ਕਦਮ ਚੁੱਕੋ", desc: "ਬਿਮਾਰੀ ਦੀ ਪਛਾਣ, ਭਰੋਸੇ ਦਾ ਸਕੋਰ ਅਤੇ ਇਲਾਜ ਦੀਆਂ ਸਿਫ਼ਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰੋ।" },
    ],
  },
};

const ICONS = [Zap, Layers, MonitorSmartphone, ScanSearch, Leaf, ShieldCheck];

const About = () => {
  const { lang } = useLang();
  const t = LABELS[lang] ?? LABELS["en"];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 py-12 md:py-16">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold md:text-4xl">{t.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Features grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.map((f, i) => {
            const Icon = ICONS[i];
            return (
              <Card key={f.title} className="border-primary/10 transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-1 font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* How it works */}
        <section className="mt-16">
          <h2 className="mb-8 text-center text-2xl font-bold">{t.howItWorks}</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {t.steps.map((s, i) => (
              <div key={s.title} className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <h3 className="mb-1 font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLang } from "@/context/LangContext";

const LABELS = {
  en: {
    title: "Our Team",
    subtitle: "A passionate group of researchers, engineers, and agricultural experts working together to bring AI-powered crop disease detection to farmers worldwide.",
  },
  hi: {
    title: "हमारी टीम",
    subtitle: "शोधकर्ताओं, इंजीनियरों और कृषि विशेषज्ञों का एक जुनूनी समूह जो दुनिया भर के किसानों के लिए AI-संचालित फसल रोग पहचान लाने के लिए मिलकर काम कर रहा है।",
  },
  ta: {
    title: "எங்கள் குழு",
    subtitle: "உலகெங்கிலும் உள்ள விவசாயிகளுக்கு AI-இயக்கப்படும் பயிர் நோய் கண்டறிதலை கொண்டு வர ஒன்றாக பணியாற்றும் ஆர்வமிக்க ஆராய்ச்சியாளர்கள், பொறியாளர்கள் மற்றும் வேளாண் வல்லுநர்கள் குழு.",
  },
  pa: {
    title: "ਸਾਡੀ ਟੀਮ",
    subtitle: "ਖੋਜਕਰਤਾਵਾਂ, ਇੰਜੀਨੀਅਰਾਂ ਅਤੇ ਖੇਤੀਬਾੜੀ ਮਾਹਰਾਂ ਦਾ ਇੱਕ ਜੋਸ਼ੀਲਾ ਸਮੂਹ ਜੋ ਦੁਨੀਆ ਭਰ ਦੇ ਕਿਸਾਨਾਂ ਲਈ AI-ਸੰਚਾਲਿਤ ਫਸਲ ਰੋਗ ਖੋਜ ਲਿਆਉਣ ਲਈ ਮਿਲ ਕੇ ਕੰਮ ਕਰ ਰਿਹਾ ਹੈ।",
  },
};

const members = [
  { name: "Tarman Singh Sohal", role: "Project Lead, DL Model developer, React Helper, Backend Support, DB Support", bio: "From Btech CSE with Specialization in cyber security and digital forensics, SCAI", initials: "23BCY10328" },
  { name: "Hemanth", role: "FrontEnd Developer", bio: "From Btech CSE specialization Ecommerce Technology, SCAI", initials: "23BEY10028" },
  { name: "Arjun Vaishishtha", role: "Database Developer", bio: "from Btech Computer Science and Enginering, SCOPE", initials: "23BCE11644" },
  { name: "Gursheel Kaur Rakhra", role: "Team Lead, Database Developer, DataSet Support, Team Motivator", bio: "from Btech Computer Science and Enginering, SCOPE", initials: "23BCE11489" },
  { name: "Prishvi", role: "ML and DL Developer and Support", bio: "from Btech Computer Science and Enginering, SCOPE", initials: "23BAI11295" },
  { name: "Arshan Khan", role: "Backend Developer, Report and PPT Lead", bio: "from Btech Computer Science and Enginering, SCOPE.", initials: "23BCE10800" },
];

const Team = () => {
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <Card key={m.name} className="border-primary/10 transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Avatar className="mb-4 h-20 w-20 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-lg font-bold text-primary">
                    {m.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{m.name}</h3>
                <p className="text-sm font-medium text-primary">{m.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{m.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Team;
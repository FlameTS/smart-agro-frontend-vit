import { Zap, Layers, MonitorSmartphone, Leaf, ScanSearch, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  { icon: Zap, title: "Instant Detection", desc: "Get results in seconds with our optimized deep learning models." },
  { icon: Layers, title: "Multiple Models", desc: "Choose from various CNN architectures for the best accuracy." },
  { icon: MonitorSmartphone, title: "Easy to Use", desc: "Simple drag-and-drop interface works on any device." },
  { icon: ScanSearch, title: "Detailed Analysis", desc: "Confidence scores and actionable recommendations." },
  { icon: Leaf, title: "Crop Support", desc: "Covers tomato, corn, rice, wheat, and more crops." },
  { icon: ShieldCheck, title: "Reliable", desc: "Trained on thousands of field images for real-world accuracy." },
];

const About = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <Header />
    <main className="mx-auto w-full max-w-5xl px-4 py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">About Smart Agro</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Smart Agro Crop Disease Detection System leverages cutting-edge deep learning to help farmers and agronomists quickly identify plant diseases from leaf images, enabling timely intervention and healthier harvests.
        </p>
      </div>

      {/* Features grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title} className="border-primary/10 transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-1 font-semibold" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* How it works */}
      <section className="mt-16">
        <h2 className="mb-8 text-center text-2xl font-bold">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { step: "1", title: "Upload", desc: "Take a photo of the affected crop leaf and upload it to the system." },
            { step: "2", title: "Analyze", desc: "Select an AI model and let the system process the image using deep learning." },
            { step: "3", title: "Act", desc: "Receive disease identification, confidence score, and treatment recommendations." },
          ].map((s) => (
            <div key={s.step} className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                {s.step}
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

export default About;

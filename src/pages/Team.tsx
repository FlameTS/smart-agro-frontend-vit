import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const members = [
  { name: "Tarman Singh Sohal", role: "Project Lead, DL Model developer, React Helper, Backend Support, DB Support", bio: "From Btech CSE with Specialization in cyber security and digital forensics, SCAI", initials: "23BCY10328" },
  { name: "Hemanth", role: "FrontEnd Developer", bio: "From Btech CSE specialization Ecommerce Technology, SCAI", initials: "23BEY10028" },
  { name: "Arjun Vaishishtha", role: "Database Developer ", bio: "from Btech Computer Science and Enginering, SCOPE", initials: "23BCE11644" },
  { name: "Gursheel Kaur Rakhra", role: "Team Lead, Database Developer, DataSet Support, Team Motivator", bio: "from Btech Computer Science and Enginering, SCOPE", initials: "23BCE11489" },
  { name: "Prishvi", role: "ML and DL Developer and Support", bio: "from Btech Computer Science and Enginering, SCOPE", initials: "23BAI11295" },
  { name: "Arshan Khan", role: "Backend Developer, Report and PPT Lead", bio: "from Btech Computer Science and Enginering, SCOPE.", initials: "23BCE10800" },
];

const Team = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <Header />
    <main className="mx-auto w-full max-w-5xl px-4 py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">Our Team</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          A passionate group of researchers, engineers, and agricultural experts working together to bring AI-powered crop disease detection to farmers worldwide.
        </p>
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
              <h3 className="font-semibold" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{m.name}</h3>
              <p className="text-sm font-medium text-primary">{m.role}</p>
              <p className="mt-2 text-sm text-muted-foreground">{m.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  </div>
);

export default Team;

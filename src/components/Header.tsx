import { Link, useLocation } from "react-router-dom";
import { Leaf, Menu, X, LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLang } from "@/context/LangContext";
import { useAuth } from "@/context/AuthContext";

const LABELS = {
  en: { home: "Home", about: "About", team: "Team", marketplace: "Marketplace", login: "Login with Google", logout: "Logout" },
  hi: { home: "होम", about: "के बारे में", team: "टीम", marketplace: "बाजार", login: "Google से लॉगिन करें", logout: "लॉगआउट" },
  ta: { home: "முகப்பு", about: "பற்றி", team: "அணி", marketplace: "சந்தை", login: "Google உடன் உள்நுழைக", logout: "வெளியேறு" },
  pa: { home: "ਹੋਮ", about: "ਬਾਰੇ", team: "ਟੀਮ", marketplace: "ਮਾਰਕੀਟਪਲੇਸ", login: "Google ਨਾਲ ਲੌਗਇਨ ਕਰੋ", logout: "ਲਾਗਆਉਟ" },
};

const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { lang } = useLang();
  const t = LABELS[lang] ?? LABELS["en"];
  const { user, signInWithGoogle, signOut } = useAuth();

  const links = [
    { to: "/", label: t.home },
    { to: "/marketplace", label: t.marketplace },
    { to: "/about", label: t.about },
    { to: "/team", label: t.team },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-primary text-primary-foreground">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="h-7 w-7" />
          <span className="text-lg font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Smart Agro
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-primary-foreground/10",
                location.pathname === l.to && "bg-primary-foreground/15"
              )}
            >
              {l.label}
            </Link>
          ))}

          <div className="ml-4 flex items-center gap-3 border-l pl-4 border-primary-foreground/20">
            {user ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity" title="View Profile">
                  {user.user_metadata?.avatar_url && (
                    <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-8 h-8 rounded-full" />
                  )}
                  <span className="text-sm font-medium max-w-[150px] truncate">{user.user_metadata?.full_name || user.email}</span>
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center gap-2 rounded-md bg-red-600/90 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  {t.logout}
                </button>
              </>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="flex items-center gap-2 rounded-md bg-white text-primary px-4 py-1.5 text-sm font-bold transition-colors hover:bg-gray-100"
              >
                <LogIn className="h-4 w-4" />
                {t.login}
              </button>
            )}
          </div>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-primary-foreground/20 bg-primary px-4 py-3 md:hidden flex flex-col gap-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-primary-foreground/10",
                location.pathname === l.to && "bg-primary-foreground/15"
              )}
            >
              {l.label}
            </Link>
          ))}

          <div className="mt-2 border-t border-primary-foreground/20 pt-2 flex items-center justify-between px-2">
            {user ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity" onClick={() => setMobileOpen(false)}>
                  {user.user_metadata?.avatar_url && (
                    <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-8 h-8 rounded-full" />
                  )}
                  <span className="text-sm font-medium max-w-[150px] truncate">{user.user_metadata?.full_name || user.email}</span>
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-md bg-red-600/90 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  {t.logout}
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  signInWithGoogle();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 rounded-md bg-white text-primary w-full justify-center px-4 py-2 text-sm font-bold transition-colors hover:bg-gray-100"
              >
                <LogIn className="h-4 w-4" />
                {t.login}
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;

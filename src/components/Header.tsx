import { Play, Languages } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSmartNavigation } from "@/hooks/useSmartNavigation";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { languages, useTranslations } from "@/lib/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();
  const { navigateHome } = useSmartNavigation();
  const { language, setLanguage } = useLanguage();
  const t = useTranslations(language);
  const handleScrollTo = (id: string) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-[5.2px]">
      <div className="w-full px-4 md:px-6 lg:px-12 xl:px-24">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-[97px]">
          <Link to="/" onClick={navigateHome} className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-12 md:h-12 lg:w-[53px] lg:h-[53px] flex items-center justify-center">
              <img
                src="https://i.imgur.com/RMNA5bO.png"
                alt="Logo Artemia"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-lg md:text-xl lg:text-2xl font-black text-foreground">
              Artemia
            </span>
          </Link>

          <nav className="flex items-center gap-3 md:gap-6 lg:gap-8">
            <button
              onClick={navigateHome}
              className="text-xs md:text-base lg:text-lg text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              {t.home}
            </button>
            <button
              onClick={() => handleScrollTo("about")}
              className="text-xs md:text-base lg:text-lg text-foreground hover:text-primary transition-colors"
            >
              {t.about}
            </button>
            <button
              onClick={() => handleScrollTo("roadmap")}
              className="text-xs md:text-base lg:text-lg text-foreground hover:text-primary transition-colors"
            >
              {t.roadmap}
            </button>
            <Link to="/tool">
              <button className="text-xs md:text-base lg:text-lg text-foreground hover:text-primary transition-colors">
                {t.tool}
              </button>
            </Link>
          {/* Language Selector & Play Button 
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
                  <Languages className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md z-50">
                {Object.entries(languages).map(([code, { name, flag }]) => (
                  <DropdownMenuItem
                    key={code}
                    onClick={() => setLanguage(code as Language)}
                    className={language === code ? 'bg-accent' : ''}
                  >
                    <span className="mr-2">{flag}</span>
                    {name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            */}
            <Link to="/play">
              <Button className="h-8 md:h-10 lg:h-12 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-[#00B6DA] to-[#5045BF] hover:opacity-90 rounded-full text-xs md:text-sm lg:text-base font-bold">
                <Play className="w-3 h-3 md:w-4 md:h-4 fill-current mr-1 md:mr-2" />
                {t.play}
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

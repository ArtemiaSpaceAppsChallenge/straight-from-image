import { Shield } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-[5.2px]">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-[97px]">
          <div className="flex items-center gap-3">
            <div className="w-[53px] h-[53px] flex items-center justify-center">
              <Shield className="w-[53px] h-[53px] text-foreground" />
            </div>
            <span className="text-2xl font-black text-foreground">Artemia</span>
          </div>
          
          <nav className="flex items-center gap-[65px]">
            <a href="#recursos" className="text-2xl text-foreground hover:text-primary transition-colors">
              Recursos
            </a>
            <a href="#proposta" className="text-2xl text-foreground hover:text-primary transition-colors">
              Proposta
            </a>
            <a href="#time" className="text-2xl text-foreground hover:text-primary transition-colors">
              Time
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

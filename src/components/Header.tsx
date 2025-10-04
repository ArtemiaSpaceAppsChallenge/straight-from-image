import { Shield } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-[5.2px]">
      <div className="w-full px-4 md:px-6 lg:px-12 xl:px-24">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-[97px]">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-12 md:h-12 lg:w-[53px] lg:h-[53px] flex items-center justify-center">
              <Shield className="w-full h-full text-foreground" />
            </div>
            <span className="text-lg md:text-xl lg:text-2xl font-black text-foreground">Artemia</span>
          </div>
          
          <nav className="flex items-center gap-4 md:gap-8 lg:gap-[65px]">
            <a href="#recursos" className="text-sm md:text-lg lg:text-2xl text-foreground hover:text-primary transition-colors">
              Recursos
            </a>
            <a href="#proposta" className="text-sm md:text-lg lg:text-2xl text-foreground hover:text-primary transition-colors">
              Proposta
            </a>
            <a href="#time" className="text-sm md:text-lg lg:text-2xl text-foreground hover:text-primary transition-colors">
              Time
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

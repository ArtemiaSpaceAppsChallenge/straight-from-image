import { Shield } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-foreground" />
            <span className="text-xl font-bold text-foreground">Artemis</span>
          </div>
          
          <nav className="flex items-center gap-8">
            <a href="#recursos" className="text-sm text-foreground hover:text-primary transition-colors">
              Recursos
            </a>
            <a href="#proposta" className="text-sm text-foreground hover:text-primary transition-colors">
              Proposta
            </a>
            <a href="#time" className="text-sm text-foreground hover:text-primary transition-colors">
              Time
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

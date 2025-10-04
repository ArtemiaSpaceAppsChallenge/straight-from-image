import { Shield, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-[5.2px]">
      <div className="w-full px-4 md:px-6 lg:px-12 xl:px-24">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-[97px]">
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-12 md:h-12 lg:w-[53px] lg:h-[53px] flex items-center justify-center">
              <Shield className="w-full h-full text-foreground" />
            </div>
            <span className="text-lg md:text-xl lg:text-2xl font-black text-foreground">Artemis</span>
          </Link>
          
          <nav className="flex items-center gap-3 md:gap-6 lg:gap-8">
            <a href="/" className="text-xs md:text-base lg:text-lg text-foreground hover:text-primary transition-colors">
              HOME
            </a>
            <a href="#about" className="text-xs md:text-base lg:text-lg text-foreground hover:text-primary transition-colors">
              ABOUT
            </a>
            <a href="#roadmap" className="text-xs md:text-base lg:text-lg text-foreground hover:text-primary transition-colors">
              ROADMAP
            </a>
            <Link to="/play">
              <Button className="h-8 md:h-10 lg:h-12 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-[#00B6DA] to-[#5045BF] hover:opacity-90 rounded-full text-xs md:text-sm lg:text-base font-bold">
                <Play className="w-3 h-3 md:w-4 md:h-4 fill-current mr-1 md:mr-2" />
                PLAY
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

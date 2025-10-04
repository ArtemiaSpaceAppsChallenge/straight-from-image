import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 md:py-16 px-4 md:px-6 lg:px-12 border-t border-white/15 backdrop-blur-[2px] relative z-10 mt-auto">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 items-start">
          <div className="flex items-center justify-center md:justify-start">
            <div className="w-32 h-32 md:w-40 md:h-40 lg:w-[239px] lg:h-[239px] flex items-center justify-center">
              <Shield className="w-24 h-24 md:w-32 md:h-32 text-foreground" />
            </div>
          </div>
          
          <div className="space-y-6 md:space-y-8 lg:space-y-[67px] text-center md:text-left">
            <h4 className="text-foreground text-lg md:text-xl leading-6">
              Link do vídeo
            </h4>
            <a href="#" className="block text-foreground hover:text-primary transition-colors text-lg md:text-xl leading-6">
              Gitub
            </a>
          </div>
          
          <div className="space-y-4 md:space-y-6 lg:space-y-[57px] text-center md:text-left">
            <h4 className="text-foreground text-lg md:text-xl leading-6">
              Seção 1
            </h4>
            <a href="#" className="block text-foreground hover:text-primary transition-colors text-lg md:text-xl leading-6">
              Seção 1
            </a>
            <a href="#" className="block text-foreground hover:text-primary transition-colors text-lg md:text-xl leading-6">
              Seção 1
            </a>
          </div>
          
          <div className="space-y-4 md:space-y-6 lg:space-y-[57px] text-center md:text-left">
            <h4 className="text-foreground text-lg md:text-xl leading-6">
              Seção 1
            </h4>
            <a href="#" className="block text-foreground hover:text-primary transition-colors text-lg md:text-xl leading-6">
              Seção 1
            </a>
            <a href="#" className="block text-foreground hover:text-primary transition-colors text-lg md:text-xl leading-6">
              Seção 1
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

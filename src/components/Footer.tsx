import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-white/15 backdrop-blur-[2px] relative z-10 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-12 items-start">
          <div className="flex items-center justify-center">
            <div className="w-[239px] h-[239px] flex items-center justify-center">
              <Shield className="w-32 h-32 text-foreground" />
            </div>
          </div>
          
          <div className="space-y-[67px]">
            <h4 className="text-foreground text-xl leading-6">
              Link do vídeo
            </h4>
            <a href="#" className="block text-foreground hover:text-primary transition-colors text-xl leading-6">
              Gitub
            </a>
          </div>
          
          <div className="space-y-[57px]">
            <h4 className="text-foreground text-xl leading-6">
              Seção 1
            </h4>
            <a href="#" className="block text-foreground hover:text-primary transition-colors text-xl leading-6">
              Seção 1
            </a>
            <a href="#" className="block text-foreground hover:text-primary transition-colors text-xl leading-6">
              Seção 1
            </a>
          </div>
          
          <div className="space-y-[57px]">
            <h4 className="text-foreground text-xl leading-6">
              Seção 1
            </h4>
            <a href="#" className="block text-foreground hover:text-primary transition-colors text-xl leading-6">
              Seção 1
            </a>
            <a href="#" className="block text-foreground hover:text-primary transition-colors text-xl leading-6">
              Seção 1
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

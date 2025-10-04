import { Shield, Github, Video, Mail, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
            <h4 className="text-foreground text-lg md:text-xl leading-6 font-bold">
              Resources
            </h4>
            <a href="#" className="flex items-center justify-center md:justify-start gap-2 text-foreground hover:text-primary transition-colors text-lg md:text-xl leading-6">
              <Video className="w-5 h-5" />
              Demo Video
            </a>
            <a href="#" className="flex items-center justify-center md:justify-start gap-2 text-foreground hover:text-primary transition-colors text-lg md:text-xl leading-6">
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
          
          <div className="space-y-4 md:space-y-6 lg:space-y-[57px] text-center md:text-left">
            <h4 className="text-foreground text-lg md:text-xl leading-6 font-bold">
              Navigation
            </h4>
            <a href="#about" className="block text-foreground hover:text-primary transition-colors text-lg md:text-xl leading-6">
              About
            </a>
            <a href="#roadmap" className="block text-foreground hover:text-primary transition-colors text-lg md:text-xl leading-6">
              Roadmap
            </a>
            <a href="/play" className="block text-foreground hover:text-primary transition-colors text-lg md:text-xl leading-6">
              Play
            </a>
          </div>
          
          <div className="space-y-4 md:space-y-6 lg:space-y-[57px] text-center md:text-left">
            <h4 className="text-foreground text-lg md:text-xl leading-6 font-bold">
              Legal
            </h4>
            <a href="#" className="block text-foreground hover:text-primary transition-colors text-lg md:text-xl leading-6">
              Privacy Policy
            </a>
            <a href="#" className="block text-foreground hover:text-primary transition-colors text-lg md:text-xl leading-6">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

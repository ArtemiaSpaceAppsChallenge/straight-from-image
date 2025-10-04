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
        
        {/* {/* Partners & Compliance */}
        <div className="mt-12 pt-8 border-t border-white/15">
          <h4 className="text-foreground text-lg md:text-xl font-bold text-center mb-6">
            Partners & Compliance
          </h4>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
            <Badge variant="outline" className="border-primary/50 text-primary px-4 py-2">
              <Rocket className="w-4 h-4 mr-2" />
              NASA Standards
            </Badge>
            <Badge variant="outline" className="border-primary/50 text-primary px-4 py-2">
              ESA Certified
            </Badge>
            <Badge variant="outline" className="border-primary/50 text-primary px-4 py-2">
              ISO 14644
            </Badge>
            <Badge variant="outline" className="border-primary/50 text-primary px-4 py-2">
              Artemis Program
            </Badge>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-8 pt-8 border-t border-white/15">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-foreground text-lg md:text-xl font-bold mb-2">
              Stay Updated on Artemis Missions
            </h4>
            <p className="text-muted-foreground text-sm mb-4">
              Get the latest updates on habitat design innovations
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/5 border-white/15 text-foreground placeholder:text-muted-foreground"
              />
              <Button className="bg-gradient-to-r from-[#00B6DA] to-[#5045BF] hover:opacity-90">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/15 text-center">
          <p className="text-muted-foreground text-sm md:text-base">
            © 2025 Artemis Habitat Designer. All rights reserved.
          </p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;

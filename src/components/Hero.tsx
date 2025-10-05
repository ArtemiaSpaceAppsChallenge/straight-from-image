import { Play, Rocket, Satellite, Users, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/translations";

const Hero = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  
  return (
    <section className="pt-20 md:pt-32 lg:pt-[247px] pb-12 md:pb-16 lg:pb-20 px-4 md:px-6 lg:px-12 relative z-10">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-[74px] items-start">
          <div className="space-y-6 md:space-y-8 max-w-[850px]">
            <h1 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-foreground leading-tight lg:leading-[49px] pt-0 lg:pt-16">
              {t.heroTitle}
            </h1>
            
            <p className="text-foreground text-base md:text-lg lg:text-xl leading-relaxed lg:leading-6">
              {t.heroDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-[22px]">
              <Link to="/play">
                <Button 
                  className="w-full sm:w-auto lg:w-[236px] h-12 lg:h-[63px] bg-gradient-to-r from-[#00B6DA] to-[#5045BF] hover:opacity-90 rounded-3xl text-lg lg:text-2xl font-bold"
                >
                  <Play className="w-4 h-4 fill-current mr-2" />
                  {t.play}
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto lg:w-[436px] h-12 lg:h-[63px] bg-[#171B24] border-[#393D46] hover:bg-[#171B24]/80 rounded-3xl text-lg lg:text-2xl font-bold text-foreground"
              >
                {t.viewZoningRules}
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mt-6 lg:mt-8">
              <div className="bg-white/5 border border-white/15 rounded-xl p-3 lg:p-4 backdrop-blur-[2px]">
                <Rocket className="w-5 h-5 lg:w-6 lg:h-6 text-primary mb-2" />
                <div className="text-xl lg:text-2xl font-bold text-foreground">50+</div>
                <div className="text-xs lg:text-sm text-muted-foreground">Configurations</div>
              </div>
              <div className="bg-white/5 border border-white/15 rounded-xl p-3 lg:p-4 backdrop-blur-[2px]">
                <Satellite className="w-5 h-5 lg:w-6 lg:h-6 text-primary mb-2" />
                <div className="text-xl lg:text-2xl font-bold text-foreground">NASA</div>
                <div className="text-xs lg:text-sm text-muted-foreground">ECLSS Standard</div>
              </div>
              <div className="bg-white/5 border border-white/15 rounded-xl p-3 lg:p-4 backdrop-blur-[2px]">
                <Users className="w-5 h-5 lg:w-6 lg:h-6 text-primary mb-2" />
                <div className="text-xl lg:text-2xl font-bold text-foreground">6</div>
                <div className="text-xs lg:text-sm text-muted-foreground">Mission Scenarios</div>
              </div>
              <div className="bg-white/5 border border-white/15 rounded-xl p-3 lg:p-4 backdrop-blur-[2px]">
                <Gauge className="w-5 h-5 lg:w-6 lg:h-6 text-primary mb-2" />
                <div className="text-xl lg:text-2xl font-bold text-foreground">Real-time</div>
                <div className="text-xs lg:text-sm text-muted-foreground">Telemetry</div>
              </div>
            </div>
          </div>
          
          <div className="relative w-full lg:w-auto flex justify-center lg:justify-start">
            <div 
              className="bg-white/5 border border-white/15 rounded-2xl lg:rounded-[21px] overflow-hidden backdrop-blur-[2px] w-full max-w-[699px] aspect-[699/470] flex items-center justify-center p-4 md:p-6"
            >
              <div className="w-full h-full border border-white/15 rounded-lg lg:rounded-[9px] bg-muted/20 flex items-center justify-center text-muted-foreground text-sm md:text-base">
                Habitat Layout Interface
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

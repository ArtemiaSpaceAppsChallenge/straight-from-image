import { Play, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/translations";

const Hero = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const previewImage = "https://i.imgur.com/llKLfAx.png";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0B0F17] via-[#1a1f2e] to-[#0B0F17]">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 182, 218, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 182, 218, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse [animation-delay:1s]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Badge */}
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">NASA ECLSS Standard</span>
            </div> */}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase leading-none animate-fade-in [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
              <span className="block text-foreground mb-2">Design Your</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,182,218,0.6)]">
                Space Habitat
              </span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-xl animate-fade-in [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
              Build, test, and optimize Mars habitats with real NASA constraints. 50+ configurations, real-time validation.
            </p>

            {/* Stats Bar */}
            <div className="flex flex-wrap gap-4 md:gap-6 animate-fade-in [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
              <div className="flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-transparent rounded-full" />
                <div>
                  <div className="text-2xl font-bold text-foreground">50+</div>
                  <div className="text-xs text-gray-500 uppercase">Configs</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-transparent rounded-full" />
                <div>
                  <div className="text-2xl font-bold text-foreground">4</div>
                  <div className="text-xs text-gray-500 uppercase">Missions</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-transparent rounded-full" />
                <div>
                  <div className="text-2xl font-bold text-foreground">Real-time</div>
                  <div className="text-xs text-gray-500 uppercase">Telemetry</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-scale-in [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
              <Link to="/play" className="w-full sm:w-auto">
                <Button className="w-full group relative overflow-hidden px-8 py-6 text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(0,182,218,0.4)] hover:shadow-[0_0_40px_rgba(0,182,218,0.6)] hover:scale-105">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Play className="w-5 h-5 fill-current" />
                    START MISSION
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full sm:w-auto px-8 py-6 text-lg font-bold bg-white/5 border-2 border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-500/50 rounded-xl transition-all duration-300 text-foreground hover:scale-105 backdrop-blur-sm"
              >
                VIEW RULES
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Right - Image Preview */}
          <div className="relative animate-fade-in [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
            {/* Cyber Frame */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl" />
            <div className="relative">
              {/* Corner Accents */}
              <div className="absolute -top-2 -left-2 w-12 h-12 border-t-4 border-l-4 border-cyan-400 rounded-tl-lg" />
              <div className="absolute -top-2 -right-2 w-12 h-12 border-t-4 border-r-4 border-purple-400 rounded-tr-lg" />
              <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-4 border-l-4 border-purple-400 rounded-bl-lg" />
              <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-4 border-r-4 border-cyan-400 rounded-br-lg" />
              
              {/* Image Container */}
              <div className="relative border-2 border-cyan-500/30 rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm shadow-[0_0_50px_rgba(0,182,218,0.3)]">
                <img
                  src={previewImage}
                  alt="Habitat Layout Preview"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-pulse pointer-events-none" />
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-gradient-to-r from-green-500/90 to-emerald-500/90 rounded-full border border-green-400/50 shadow-[0_0_20px_rgba(34,197,94,0.5)] backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-sm font-bold text-white uppercase">System Ready</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;



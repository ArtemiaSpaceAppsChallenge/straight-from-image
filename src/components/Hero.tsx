import { Play, Rocket, Satellite, Users, Gauge, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/translations";

const Hero = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const previewImage = "https://i.imgur.com/llKLfAx.png";

  const handleScrollToNext = () => {
    const nextSection = document.querySelector('#statistics');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const stats = [
    { icon: Rocket, value: "50+", label: "Configurations", delay: "600ms" },
    { icon: Satellite, value: "NASA", label: "ECLSS Standard", delay: "700ms" },
    { icon: Users, value: "6", label: "Mission Scenarios", delay: "800ms" },
    { icon: Gauge, value: "Real-time", label: "Telemetry", delay: "900ms" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${previewImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/98 via-background/85 to-background/98" />
      </div>

      {/* Floating Stats - Desktop Only */}
      <div className="hidden lg:block">
        <div className="absolute top-32 left-8 xl:left-16 z-20 animate-fade-in opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
          <div className="bg-white/5 border border-white/20 rounded-2xl p-5 backdrop-blur-md hover:scale-105 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,182,218,0.4)] hover:bg-white/10">
            <Rocket className="w-7 h-7 text-primary mb-3 animate-float" />
            <div className="text-3xl font-bold text-foreground mb-1">50+</div>
            <div className="text-sm text-muted-foreground">Configurations</div>
          </div>
        </div>

        <div className="absolute top-32 right-8 xl:right-16 z-20 animate-fade-in opacity-0 [animation-delay:700ms] [animation-fill-mode:forwards]">
          <div className="bg-white/5 border border-white/20 rounded-2xl p-5 backdrop-blur-md hover:scale-105 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,182,218,0.4)] hover:bg-white/10">
            <Satellite className="w-7 h-7 text-primary mb-3 animate-float [animation-delay:500ms]" />
            <div className="text-3xl font-bold text-foreground mb-1">NASA</div>
            <div className="text-sm text-muted-foreground">ECLSS Standard</div>
          </div>
        </div>

        <div className="absolute bottom-32 left-8 xl:left-16 z-20 animate-fade-in opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards]">
          <div className="bg-white/5 border border-white/20 rounded-2xl p-5 backdrop-blur-md hover:scale-105 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,182,218,0.4)] hover:bg-white/10">
            <Users className="w-7 h-7 text-primary mb-3 animate-float [animation-delay:1000ms]" />
            <div className="text-3xl font-bold text-foreground mb-1">6</div>
            <div className="text-sm text-muted-foreground">Mission Scenarios</div>
          </div>
        </div>

        <div className="absolute bottom-32 right-8 xl:right-16 z-20 animate-fade-in opacity-0 [animation-delay:900ms] [animation-fill-mode:forwards]">
          <div className="bg-white/5 border border-white/20 rounded-2xl p-5 backdrop-blur-md hover:scale-105 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,182,218,0.4)] hover:bg-white/10">
            <Gauge className="w-7 h-7 text-primary mb-3 animate-float [animation-delay:1500ms]" />
            <div className="text-3xl font-bold text-foreground mb-1">Real-time</div>
            <div className="text-sm text-muted-foreground">Telemetry</div>
          </div>
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="relative z-10 text-center px-4 md:px-8 lg:px-12 max-w-7xl mx-auto w-full">
        {/* Title with Animated Gradient */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 md:mb-6 animate-fade-in opacity-0 [animation-fill-mode:forwards] leading-tight">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto] drop-shadow-[0_0_20px_rgba(0,182,218,0.4)]">
            {t.heroTitle}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl lg:max-w-3xl mx-auto mb-6 md:mb-10 animate-fade-in opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards] leading-relaxed px-2">
          {t.heroDescription}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-8 md:mb-12 animate-scale-in opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
          <Link to="/play" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto px-6 md:px-10 py-5 md:py-7 text-base md:text-xl font-bold bg-gradient-to-r from-[#00B6DA] to-[#5045BF] hover:opacity-90 hover:scale-105 transition-all duration-300 rounded-3xl shadow-[0_0_25px_rgba(0,182,218,0.4)] hover:shadow-[0_0_35px_rgba(0,182,218,0.6)]">
              <Play className="w-4 h-4 md:w-5 md:h-5 fill-current mr-2" />
              {t.play}
            </Button>
          </Link>
          <Button
            variant="outline"
            className="w-full sm:w-auto px-6 md:px-10 py-5 md:py-7 text-base md:text-xl font-bold bg-white/5 border-2 border-white/30 hover:bg-white/10 hover:border-white/50 hover:scale-105 transition-all duration-300 rounded-3xl backdrop-blur-sm text-foreground"
          >
            {t.viewZoningRules}
          </Button>
        </div>

        {/* Stats Grid - Mobile/Tablet Only */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto lg:hidden animate-fade-in opacity-0 [animation-delay:500ms] [animation-fill-mode:forwards]">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="bg-white/5 border border-white/20 rounded-xl p-4 backdrop-blur-md"
              >
                <Icon className="w-5 h-5 text-primary mb-2 mx-auto" />
                <div className="text-xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={handleScrollToNext}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer group"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="w-7 h-7 md:w-8 md:h-8 text-primary group-hover:text-cyan-300 transition-colors" />
      </button>
    </section>
  );
};

export default Hero;


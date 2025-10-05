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

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${previewImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95" />
      </div>

      {/* Floating Stats - Top Corners */}
      <div className="absolute top-24 left-4 md:left-8 lg:left-12 z-20 animate-fade-in opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
        <div className="bg-white/5 border border-white/20 rounded-xl p-4 backdrop-blur-md hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(0,182,218,0.3)]">
          <Rocket className="w-6 h-6 text-primary mb-2 animate-float" />
          <div className="text-2xl font-bold text-foreground">50+</div>
          <div className="text-sm text-muted-foreground">Configurations</div>
        </div>
      </div>

      <div className="absolute top-24 right-4 md:right-8 lg:right-12 z-20 animate-fade-in opacity-0 [animation-delay:700ms] [animation-fill-mode:forwards]">
        <div className="bg-white/5 border border-white/20 rounded-xl p-4 backdrop-blur-md hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(0,182,218,0.3)]">
          <Satellite className="w-6 h-6 text-primary mb-2 animate-float [animation-delay:500ms]" />
          <div className="text-2xl font-bold text-foreground">NASA</div>
          <div className="text-sm text-muted-foreground">ECLSS Standard</div>
        </div>
      </div>

      {/* Floating Stats - Bottom Corners */}
      <div className="absolute bottom-24 left-4 md:left-8 lg:left-12 z-20 animate-fade-in opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards] hidden md:block">
        <div className="bg-white/5 border border-white/20 rounded-xl p-4 backdrop-blur-md hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(0,182,218,0.3)]">
          <Users className="w-6 h-6 text-primary mb-2 animate-float [animation-delay:1000ms]" />
          <div className="text-2xl font-bold text-foreground">6</div>
          <div className="text-sm text-muted-foreground">Mission Scenarios</div>
        </div>
      </div>

      <div className="absolute bottom-24 right-4 md:right-8 lg:right-12 z-20 animate-fade-in opacity-0 [animation-delay:900ms] [animation-fill-mode:forwards] hidden md:block">
        <div className="bg-white/5 border border-white/20 rounded-xl p-4 backdrop-blur-md hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(0,182,218,0.3)]">
          <Gauge className="w-6 h-6 text-primary mb-2 animate-float [animation-delay:1500ms]" />
          <div className="text-2xl font-bold text-foreground">Real-time</div>
          <div className="text-sm text-muted-foreground">Telemetry</div>
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="relative z-10 text-center px-4 md:px-6 lg:px-12 max-w-6xl mx-auto">
        {/* Title with Animated Gradient */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-extrabold mb-6 animate-fade-in opacity-0 [animation-fill-mode:forwards]">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto] drop-shadow-[0_0_30px_rgba(0,182,218,0.5)]">
            {t.heroTitle}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 animate-fade-in opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
          {t.heroDescription}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-scale-in opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
          <Link to="/play">
            <Button className="w-full sm:w-auto px-8 py-6 text-xl font-bold bg-gradient-to-r from-[#00B6DA] to-[#5045BF] hover:opacity-90 hover:scale-110 transition-all duration-300 rounded-3xl shadow-[0_0_30px_rgba(0,182,218,0.5)] hover:shadow-[0_0_40px_rgba(0,182,218,0.7)]">
              <Play className="w-5 h-5 fill-current mr-2" />
              {t.play}
            </Button>
          </Link>
          <Button
            variant="outline"
            className="w-full sm:w-auto px-8 py-6 text-xl font-bold bg-transparent border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 rounded-3xl backdrop-blur-sm"
          >
            {t.viewZoningRules}
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={handleScrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer group"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="w-8 h-8 text-primary group-hover:text-cyan-300 transition-colors" />
      </button>
    </section>
  );
};

export default Hero;

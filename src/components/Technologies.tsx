import { Badge } from "@/components/ui/badge";
import { Rocket, Shield, Layers, Zap, Database, Cpu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/translations";

const technologies = [
  {
    icon: Rocket,
    name: "NASA ECLSS Standards",
    description: "Environmental Control",
  },
  {
    icon: Shield,
    name: "ISO 14644 Compliant",
    description: "Clean Room Standards",
  },
  {
    icon: Layers,
    name: "SpaceX Compatible",
    description: "Starship Integration",
  },
  {
    icon: Zap,
    name: "Artemis Aligned",
    description: "Program Standards",
  },
  {
    icon: Database,
    name: "CAD Integration",
    description: "STEP/IGES Export",
  },
  {
    icon: Cpu,
    name: "Real-time Simulation",
    description: "Digital Twin Tech",
  },
];

const Technologies = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  
  return (
    <section className="py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-12 relative z-10">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            {t.technologiesStandards}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
            Built on industry-leading standards and cutting-edge space technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="bg-white/5 border border-white/15 rounded-xl backdrop-blur-[2px] p-6 hover:bg-white/10 hover:border-primary/50 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00B6DA] to-[#5045BF] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <tech.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base md:text-lg font-bold text-foreground">
                      {tech.name}
                    </h3>
                    <Badge variant="outline" className="text-xs border-primary/50 text-primary">
                      Certified
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {tech.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;

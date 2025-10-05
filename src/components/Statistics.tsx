import { Gauge, Shield, Clock, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/translations";

const stats = [
  {
    icon: Gauge,
    value: "99.7%",
    label: "Oxygen Efficiency",
    description: "ECLSS Performance",
  },
  {
    icon: Shield,
    value: "< 0.001%",
    label: "System Failure Rate",
    description: "Mission Critical",
  },
  {
    icon: Clock,
    value: "10,000+",
    label: "Simulation Hours",
    description: "Validated Scenarios",
  },
  {
    icon: Users,
    value: "15+",
    label: "Partner Organizations",
    description: "Global Collaboration",
  },
];

const Statistics = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  
  return (
    <section className="py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-12 relative z-10">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            {t.byTheNumbers}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
            Performance metrics that matter for mission-critical space habitat design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 border border-white/15 rounded-2xl backdrop-blur-[2px] p-6 hover:bg-white/10 transition-colors group"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00B6DA] to-[#5045BF] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-base md:text-lg font-semibold text-primary mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;

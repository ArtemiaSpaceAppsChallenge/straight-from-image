import { Building2, Shield, Activity, UtensilsCrossed, Gauge } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Building2,
    number: 1,
    text: "Habitat type selection and crew capacity modeling",
  },
  {
    icon: Shield,
    number: 2,
    text: "Intelligent zoning with ECLSS compliance validation",
  },
  {
    icon: Activity,
    number: 3,
    text: "Exercise area allocation for muscular degradation mitigation",
  },
  {
    icon: UtensilsCrossed,
    number: 4,
    text: "Food preparation and consumption zone optimization",
  },
  {
    icon: Gauge,
    number: 5,
    text: "Real-time crew-to-resource consumption analytics (O₂, kW, m³)",
  },
];

const FeaturesMVP = () => {
  return (
    <section className="py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-12 relative z-10">
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-white/5 border border-white/15 rounded-2xl lg:rounded-[21px] backdrop-blur-[2px] p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight lg:leading-[29px]">
              Core Features
            </h2>
            <Badge variant="outline" className="border-primary/50 text-primary">
              NASA Compliant
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-y-6 lg:gap-x-[100px]">
            {features.map((feature) => (
              <div key={feature.number} className="flex gap-3 md:gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00B6DA] to-[#5045BF] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-primary text-sm font-bold">{feature.number}.</span>
                  </div>
                  <p className="text-foreground text-base md:text-lg lg:text-xl leading-relaxed lg:leading-6">
                    {feature.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesMVP;

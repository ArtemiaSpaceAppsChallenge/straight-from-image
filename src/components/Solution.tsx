import { Lightbulb, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Solution = () => {
  return (
    <section className="py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-12 relative z-10">
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-white/5 border border-white/15 rounded-2xl lg:rounded-[21px] backdrop-blur-[2px] p-6 md:p-8">
          <div className="flex items-start gap-4 mb-4 md:mb-6">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-[#00B6DA] to-[#5045BF] flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-foreground leading-tight lg:leading-[39px]">
                Our Solution
              </h3>
              <Badge variant="outline" className="mt-2 border-primary/50 text-primary">
                <Zap className="w-3 h-3 mr-1" />
                NASA-STD-3001 Compliant
              </Badge>
            </div>
          </div>
          
          <p className="text-foreground text-base md:text-lg lg:text-xl leading-relaxed lg:leading-6">
            An intelligent layout engine powered by NASA ECLSS standards, featuring automated zoning validation, volumetric analysis, and predictive modeling for oxygen consumption, power distribution, and crew workflow optimization across all mission phases.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Solution;

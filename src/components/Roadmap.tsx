import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Rocket, Sparkles, Layers, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const milestones = [
  {
    quarter: "Q4 2025",
    title: "MVP Launch",
    icon: Rocket,
    status: "In Progress",
    items: [
      "Basic habitat layout editor",
      "NASA ECLSS zoning validation",
      "Crew capacity modeling (2-6 astronauts)",
      "Resource consumption baseline metrics",
    ],
  },
  {
    quarter: "Q1 2026",
    title: "Advanced Simulation",
    icon: Sparkles,
    status: "Planning",
    items: [
      "Real-time 3D visualization",
      "Extended mission duration scenarios (30-365 days)",
      "Advanced HVAC and thermal modeling",
      "Integration with NASA Artemis baseline requirements",
    ],
  },
  {
    quarter: "Q2 2026",
    title: "Multi-Habitat Analysis",
    icon: Layers,
    status: "Future",
    items: [
      "Comparative analysis dashboard",
      "Export to CAD formats (STEP, IGES)",
      "Collaborative design workspace",
      "API for third-party integrations",
    ],
  },
  {
    quarter: "Q3 2026",
    title: "Extended Reality & AI",
    icon: Zap,
    status: "Future",
    items: [
      "VR walkthrough integration",
      "AI-powered layout optimization",
      "Predictive maintenance scheduling",
      "Commercial space station applications",
    ],
  },
];

const Roadmap = () => {
  return (
    <section id="roadmap" className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-12 relative z-10">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Development Roadmap
          </h2>
          <p className="text-foreground text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
            Our strategic plan to deliver a comprehensive habitat design platform, scaling from initial prototype to enterprise-grade simulation infrastructure.
          </p>
        </div>

        <div className="relative">
          {/* Timeline connector for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00B6DA] via-[#5045BF] to-transparent" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {milestones.map((milestone, index) => (
              <Card key={milestone.quarter} className="bg-white/5 border-white/15 backdrop-blur-[2px] relative overflow-hidden hover:border-primary/50 transition-all group">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00B6DA] to-[#5045BF]" />
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00B6DA] to-[#5045BF] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <milestone.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-primary text-sm md:text-base font-bold">
                          {milestone.quarter}
                        </span>
                        <Badge 
                          variant={milestone.status === "In Progress" ? "default" : "outline"}
                          className={milestone.status === "In Progress" ? "" : "border-primary/50 text-primary"}
                        >
                          {milestone.status}
                        </Badge>
                      </div>
                      <span className="text-muted-foreground text-xs md:text-sm">
                        Phase {index + 1}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-foreground text-xl md:text-2xl lg:text-3xl pl-0">
                    {milestone.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {milestone.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground text-sm md:text-base leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;

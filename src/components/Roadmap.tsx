import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Rocket, Sparkles, Layers, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/translations";

// ✅ Updated to reflect current in‑app functionality (Rooms/Objects, zoning rules, noise, min per crew, resources, crew, validation)
// and upcoming phases (inventory/equipment with mass/volume/power, pathfinding, HVAC/thermal loops, etc.).

const milestones = [
  {
    quarter: "Q4 2025",
    title: "MVP Launch",
    icon: Rocket,
    status: "In Progress",
    items: [
      "Build & Design with catalogs: Rooms and Objects",
      "ECLSS zoning rules with Near/Avoid hints",
      "Functional area sizing: min m² per crew and noise index",
      "Real‑time resource telemetry (O₂, H₂O, Power, Food) with remaining days and efficiency",
      "Crew simulation (Health, Energy, Hunger, Hygiene) and Crew Happiness",
      "Validation and Compliance % engine",
    ],
  },
  {
    quarter: "Q1 2026",
    title: "Advanced Simulation",
    icon: Sparkles,
    status: "Planning",
    items: [
      "Extended mission duration scenarios (30–365 days)",
      "Temporal consumption modeling with events (leaks/contamination)",
      "HVAC and thermal modeling: heat sources/sinks and loops",
      "Access and circulation analysis (pathfinding, corridor width)",
      "Inventory/Equipment system with mass, volume, power, and heat",
      "3D camera with presets and save/load scenes",
    ],
  },
  {
    quarter: "Q2 2026",
    title: "Multi‑Habitat Analysis",
    icon: Layers,
    status: "Future",
    items: [
      "Multi‑module layouts and inter‑module interfaces",
      "Comparative scenario dashboard",
      "STEP/IGES export and BOM/manifest (CSV)",
      "Collaborative workspace with comments and versioning",
      "Public gallery and shareable links",
      "External API and webhooks",
    ],
  },
  {
    quarter: "Q3 2026",
    title: "Extended Reality & AI",
    icon: Zap,
    status: "Future",
    items: [
      "VR walkthrough integration",
      "AI‑based layout optimization following rules/noise/adjacency",
      "Predictive maintenance based on usage",
      "Templates for commercial space stations",
      "Optional MR deployment",
    ],
  },
];

const Roadmap = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  
  return (
    <section id="roadmap" className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-12 relative z-10">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.developmentRoadmap}
          </h2>
          <p className="text-foreground text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
            Our strategic roadmap — from an ECLSS‑validated editor with room/object catalogs and real‑time crew/resource simulation to multi‑habitat analytics, XR and AI‑driven optimization.
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

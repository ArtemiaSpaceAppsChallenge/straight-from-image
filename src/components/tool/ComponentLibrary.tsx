import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dumbbell, 
  Users, 
  Trash2, 
  Droplet, 
  UtensilsCrossed, 
  Target, 
  Moon,
  PackageX
} from "lucide-react";

type FunctionalArea = {
  id: string;
  name: string;
  minVolume: number;
  category: "clean" | "dirty";
  allocatedVolume: number;
};

interface ComponentLibraryProps {
  functionalAreas: FunctionalArea[];
}

const getIcon = (id: string) => {
  const icons: Record<string, any> = {
    "exercise-aerobic": Dumbbell,
    "exercise-resistance": Dumbbell,
    "socialization": Users,
    "waste-management": Trash2,
    "hygiene": Droplet,
    "dining": UtensilsCrossed,
    "mission-planning": Target,
    "sleeping": Moon,
    "trash-storage": PackageX,
  };
  return icons[id] || Target;
};

export const ComponentLibrary = ({ functionalAreas }: ComponentLibraryProps) => {
  const cleanAreas = functionalAreas.filter((a) => a.category === "clean");
  const dirtyAreas = functionalAreas.filter((a) => a.category === "dirty");

  const AreaCard = ({ area }: { area: FunctionalArea }) => {
    const Icon = getIcon(area.id);
    const isClean = area.category === "clean";

    return (
      <div
        className={`p-3 rounded-lg border-2 cursor-move transition-all hover:scale-105 ${
          isClean
            ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 hover:border-green-400"
            : "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800 hover:border-orange-400"
        }`}
      >
        <div className="flex items-start gap-2 mb-2">
          <Icon className={`h-4 w-4 mt-0.5 ${isClean ? "text-green-600" : "text-orange-600"}`} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate">{area.name}</p>
            <p className="text-[10px] text-muted-foreground">Min: {area.minVolume.toFixed(1)} m³</p>
          </div>
        </div>
        <Badge
          variant="secondary"
          className={`text-[10px] w-full justify-center ${
            isClean ? "bg-green-100 dark:bg-green-900" : "bg-orange-100 dark:bg-orange-900"
          }`}
        >
          {area.allocatedVolume.toFixed(1)} m³
        </Badge>
      </div>
    );
  };

  return (
    <Card className="p-4 space-y-4 h-full">
      <div>
        <h3 className="text-sm font-bold mb-2">Biblioteca de Componentes</h3>
        <p className="text-xs text-muted-foreground">
          Áreas funcionais do habitat baseadas em diretrizes NASA
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="text-xs font-semibold text-green-600 mb-2 flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Zonas Limpas
          </h4>
          <div className="space-y-2">
            {cleanAreas.map((area) => (
              <AreaCard key={area.id} area={area} />
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-orange-600 mb-2 flex items-center gap-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            Zonas Sujas
          </h4>
          <div className="space-y-2">
            {dirtyAreas.map((area) => (
              <AreaCard key={area.id} area={area} />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

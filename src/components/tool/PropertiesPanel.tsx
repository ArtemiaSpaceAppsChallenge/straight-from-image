import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle2 } from "lucide-react";

type FunctionalArea = {
  id: string;
  name: string;
  minVolume: number;
  category: "clean" | "dirty";
  allocatedVolume: number;
};

interface PropertiesPanelProps {
  totalVolume: number;
  totalAllocated: number;
  functionalAreas: FunctionalArea[];
}

export const PropertiesPanel = ({
  totalVolume,
  totalAllocated,
  functionalAreas,
}: PropertiesPanelProps) => {
  const remainingVolume = totalVolume - totalAllocated;
  const utilizationPercentage = (totalAllocated / totalVolume) * 100;
  const isOverCapacity = remainingVolume < 0;

  return (
    <Card className="p-4 space-y-4 h-full">
      <div>
        <h3 className="text-sm font-bold mb-1">Propriedades do Habitat</h3>
        <p className="text-xs text-muted-foreground">
          Resumo de volumes e utilização
        </p>
      </div>

      <Separator />

      {/* Volume Summary */}
      <div className="space-y-3">
        <div>
          <Label className="text-xs text-muted-foreground">Volume Total</Label>
          <p className="text-xl font-bold">{totalVolume.toFixed(2)} m³</p>
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">Volume Alocado</Label>
          <p className="text-xl font-bold text-primary">{totalAllocated.toFixed(2)} m³</p>
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">Volume Restante</Label>
          <p
            className={`text-xl font-bold ${
              isOverCapacity ? "text-destructive" : "text-green-500"
            }`}
          >
            {remainingVolume.toFixed(2)} m³
          </p>
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">Utilização</Label>
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold">{utilizationPercentage.toFixed(1)}%</p>
            {utilizationPercentage > 100 ? (
              <AlertCircle className="h-4 w-4 text-destructive" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            )}
          </div>
          <div className="w-full bg-muted rounded-full h-2 mt-2 overflow-hidden">
            <div
              className={`h-full transition-all ${
                utilizationPercentage > 100 ? "bg-destructive" : "bg-primary"
              }`}
              style={{ width: `${Math.min(utilizationPercentage, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Status Checks */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold">Validações</h4>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {!isOverCapacity ? (
              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
            )}
            <span className="text-xs">
              {!isOverCapacity ? "Volume adequado" : "Excesso de alocação"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span className="text-xs">Zonas separadas</span>
          </div>

          <div className="flex items-center gap-2">
            {functionalAreas.every((a) => a.allocatedVolume >= a.minVolume) ? (
              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
            )}
            <span className="text-xs">
              {functionalAreas.every((a) => a.allocatedVolume >= a.minVolume)
                ? "Volumes mínimos atendidos"
                : "Algumas áreas abaixo do mínimo"}
            </span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Quick Stats */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold">Estatísticas Rápidas</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-muted/50 rounded p-2">
            <p className="text-[10px] text-muted-foreground">Áreas Totais</p>
            <p className="text-lg font-bold">{functionalAreas.length}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 rounded p-2">
            <p className="text-[10px] text-green-600">Zonas Limpas</p>
            <p className="text-lg font-bold text-green-600">
              {functionalAreas.filter((a) => a.category === "clean").length}
            </p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-950/20 rounded p-2">
            <p className="text-[10px] text-orange-600">Zonas Sujas</p>
            <p className="text-lg font-bold text-orange-600">
              {functionalAreas.filter((a) => a.category === "dirty").length}
            </p>
          </div>
          <div className="bg-muted/50 rounded p-2">
            <p className="text-[10px] text-muted-foreground">Eficiência</p>
            <p className="text-lg font-bold">
              {utilizationPercentage > 80 && utilizationPercentage <= 100 ? "Alta" : 
               utilizationPercentage > 100 ? "Baixa" : "Média"}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

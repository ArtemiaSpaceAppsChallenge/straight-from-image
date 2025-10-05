import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Rect, Circle as FabricCircle, Text, FabricObject } from "fabric";
import { toast } from "sonner";

type FunctionalArea = {
  id: string;
  name: string;
  minVolume: number;
  category: "clean" | "dirty";
  allocatedVolume: number;
};

interface HabitatCanvasProps {
  radius: number;
  length: number;
  functionalAreas: FunctionalArea[];
  onAreaUpdate: (areas: FunctionalArea[]) => void;
}

export const HabitatCanvas = ({ radius, length, functionalAreas, onAreaUpdate }: HabitatCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  // Escala: 1 metro = 30 pixels
  const SCALE = 30;
  const canvasWidth = 1000;
  const canvasHeight = 600;

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "#0a0f1a",
    });

    setFabricCanvas(canvas);

    // Desenhar o habitat (cilindro visto de cima)
    const habitatCircle = new FabricCircle({
      left: canvasWidth / 2,
      top: canvasHeight / 2,
      radius: radius * SCALE,
      fill: "transparent",
      stroke: "#22d3ee",
      strokeWidth: 3,
      selectable: false,
      originX: "center",
      originY: "center",
    });

    canvas.add(habitatCircle);

    // Adicionar label do habitat
    const habitatLabel = new Text(`Habitat: ${(radius * 2).toFixed(1)}m ⌀`, {
      left: canvasWidth / 2,
      top: canvasHeight / 2 - radius * SCALE - 30,
      fontSize: 16,
      fill: "#22d3ee",
      fontFamily: "Montserrat, sans-serif",
      selectable: false,
      originX: "center",
    });

    canvas.add(habitatLabel);

    return () => {
      canvas.dispose();
    };
  }, [radius, length]);

  // Adicionar áreas ao canvas
  useEffect(() => {
    if (!fabricCanvas) return;

    // Limpar apenas os objetos de áreas funcionais
    const objects = fabricCanvas.getObjects();
    objects.forEach((obj) => {
      if ((obj as any).data?.type === "functional-area") {
        fabricCanvas.remove(obj);
      }
    });

    // Calcular dimensões das áreas baseadas no volume
    // Volume = largura * altura * comprimento (simplificado para 2D)
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const maxRadius = radius * SCALE;

    // Distribuir áreas em círculo
    functionalAreas.forEach((area, index) => {
      const angle = (index / functionalAreas.length) * 2 * Math.PI;
      const distance = maxRadius * 0.6;
      
      // Calcular tamanho baseado no volume (escala reduzida)
      const areaSize = Math.sqrt(area.allocatedVolume) * SCALE * 0.8;
      
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;

      const color = area.category === "clean" ? "#22c55e" : "#f97316";
      const colorDark = area.category === "clean" ? "#16a34a" : "#ea580c";

      const rect = new Rect({
        left: x,
        top: y,
        width: areaSize,
        height: areaSize,
        fill: color,
        opacity: 0.7,
        stroke: colorDark,
        strokeWidth: 2,
        cornerStyle: "circle",
        cornerSize: 8,
        originX: "center",
        originY: "center",
        data: {
          type: "functional-area",
          areaId: area.id,
          minVolume: area.minVolume,
        },
      });

      // Adicionar label
      const label = new Text(area.name, {
        left: x,
        top: y - areaSize / 2 - 15,
        fontSize: 11,
        fill: "#ffffff",
        fontFamily: "Montserrat, sans-serif",
        selectable: false,
        originX: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
        padding: 4,
      });

      const volumeLabel = new Text(`${area.allocatedVolume.toFixed(1)} m³`, {
        left: x,
        top: y,
        fontSize: 10,
        fill: "#ffffff",
        fontFamily: "Montserrat, sans-serif",
        selectable: false,
        originX: "center",
        originY: "center",
        fontWeight: "bold",
      });

      fabricCanvas.add(rect);
      fabricCanvas.add(label);
      fabricCanvas.add(volumeLabel);

      // Event handlers
      rect.on("selected", () => {
        setSelectedArea(area.id);
        toast.info(`Selecionado: ${area.name}`);
      });

      rect.on("modified", () => {
        const newWidth = rect.width! * rect.scaleX!;
        const newHeight = rect.height! * rect.scaleY!;
        
        // Calcular novo volume baseado nas dimensões
        const newVolume = (newWidth / SCALE) * (newHeight / SCALE) * (length / 2);
        
        if (newVolume < area.minVolume) {
          toast.error(`Volume mínimo: ${area.minVolume.toFixed(2)} m³`);
          return;
        }

        // Atualizar volume
        const updatedAreas = functionalAreas.map((a) =>
          a.id === area.id ? { ...a, allocatedVolume: newVolume } : a
        );
        onAreaUpdate(updatedAreas);
        toast.success(`${area.name}: ${newVolume.toFixed(2)} m³`);
      });
    });

    fabricCanvas.renderAll();
  }, [fabricCanvas, functionalAreas, radius, length, onAreaUpdate]);

  return (
    <div className="relative w-full">
      <div className="bg-card rounded-lg overflow-hidden border-2 border-primary/20 shadow-xl">
        <canvas ref={canvasRef} className="w-full" />
      </div>
      
      {selectedArea && (
        <div className="absolute top-4 right-4 bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-xs text-muted-foreground mb-1">Área Selecionada</p>
          <p className="font-semibold text-sm">
            {functionalAreas.find((a) => a.id === selectedArea)?.name}
          </p>
          <p className="text-xs text-primary mt-1">
            Arraste cantos para redimensionar
          </p>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Zonas Limpas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span>Zonas Sujas</span>
          </div>
        </div>
        <span>Escala: 1m = 30px</span>
      </div>
    </div>
  );
};

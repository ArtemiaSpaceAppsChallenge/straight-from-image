import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Grid3x3, 
  RotateCcw,
  Download,
  Info
} from "lucide-react";
import { toast } from "sonner";

interface CanvasToolbarProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onToggleGrid: () => void;
  onExport: () => void;
  gridEnabled: boolean;
}

export const CanvasToolbar = ({
  onZoomIn,
  onZoomOut,
  onResetView,
  onToggleGrid,
  onExport,
  gridEnabled,
}: CanvasToolbarProps) => {
  return (
    <Card className="p-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onZoomIn}
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onZoomOut}
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetView}
            title="Reset View"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="h-6 w-px bg-border"></div>

        <Button
          variant={gridEnabled ? "default" : "ghost"}
          size="sm"
          onClick={onToggleGrid}
          title="Toggle Grid"
        >
          <Grid3x3 className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onResetView}
          title="Reset Layout"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <div className="h-6 w-px bg-border"></div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onExport}
          title="Export Design"
        >
          <Download className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            toast.info(
              "Arraste os cantos das áreas para redimensionar. Mova arrastando o centro.",
              { duration: 4000 }
            );
          }}
          title="Help"
        >
          <Info className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

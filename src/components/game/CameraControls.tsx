import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RotateCcw, ZoomIn, ZoomOut, Move3D } from 'lucide-react';

interface CameraControlsProps {
  zoom: number;
  rotation: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetCamera: () => void;
  onResetRotation: () => void;
}

export const CameraControls: React.FC<CameraControlsProps> = ({
  zoom,
  rotation,
  onZoomIn,
  onZoomOut,
  onResetCamera,
  onResetRotation
}) => {
  return (
    <Card className="bg-black/20 backdrop-blur-sm border-gray-700 p-3">
      <div className="flex items-center gap-2">
        <div className="text-xs text-white/60 mr-2">Camera</div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomIn}
          className="text-white hover:text-cyan-400 hover:bg-white/10"
          title="Zoom In"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomOut}
          className="text-white hover:text-cyan-400 hover:bg-white/10"
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetRotation}
          className="text-white hover:text-cyan-400 hover:bg-white/10"
          title="Reset Rotation"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetCamera}
          className="text-white hover:text-cyan-400 hover:bg-white/10"
          title="Reset Camera"
        >
          <Move3D className="h-4 w-4" />
        </Button>
        
        <div className="text-xs text-gray-400 ml-2">
          {Math.round(zoom * 100)}% | {Math.round(rotation)}°
        </div>
      </div>
    </Card>
  );
};
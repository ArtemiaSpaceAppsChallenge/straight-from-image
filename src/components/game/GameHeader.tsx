import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Settings, Info, Zap } from 'lucide-react';
import { AudioControls } from './AudioControls';

interface GameHeaderProps {
  isPlaying: boolean;
  isPaused: boolean;
  daysPassed: number;
  score: number;
  complianceScore: number;
  crewHappiness: number;
  simulationSpeed: 1 | 2 | 3 | 4;
  onPlayPause: () => void;
  onReset: () => void;
  onSettings: () => void;
  onInfo: () => void;
  onSpeedChange: (speed: 1 | 2 | 3 | 4) => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  isPlaying,
  isPaused,
  daysPassed,
  score,
  complianceScore,
  crewHappiness,
  simulationSpeed,
  onPlayPause,
  onReset,
  onSettings,
  onInfo,
  onSpeedChange
}) => {
  const cycleSpeed = () => {
    const speeds: Array<1 | 2 | 3 | 4> = [1, 2, 3, 4];
    const currentIndex = speeds.indexOf(simulationSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    onSpeedChange(speeds[nextIndex]);
  };

  return (
    <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left: Controls */}
        <div className="flex items-center gap-2">
          <Button
            onClick={onPlayPause}
            variant="default"
            size="sm"
            className="bg-primary hover:bg-primary/90"
          >
            {isPaused || !isPlaying ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </Button>
          <Button 
            onClick={cycleSpeed} 
            variant="outline" 
            size="sm"
            className="min-w-[70px] relative"
            title="Simulation Speed"
          >
            <Zap className="w-4 h-4 mr-1" />
            <span className="font-bold">{simulationSpeed}x</span>
            {simulationSpeed > 1 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            )}
          </Button>
          <Button onClick={onReset} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button onClick={onSettings} variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          <Button onClick={onInfo} variant="ghost" size="sm">
            <Info className="w-4 h-4" />
          </Button>
        </div>

        {/* Center: Stats */}
        <div className="flex items-center gap-6 flex-wrap">
          <div className="text-center">
            <div className="text-xs text-white/60">Day</div>
            <div className="text-xl font-bold text-white">{daysPassed}</div>
          </div>
          
          <div className="text-center">
            <div className="text-xs text-white/60">Score</div>
            <div className="text-xl font-bold text-white">{score}</div>
          </div>

          <div className="min-w-[150px]">
            <div className="text-xs text-white/60 mb-1">Compliance</div>
            <div className="flex items-center gap-2">
              <Progress value={complianceScore} className="h-2" />
              <span className="text-sm font-bold text-white w-8">{complianceScore}%</span>
            </div>
          </div>

          <div className="min-w-[150px]">
            <div className="text-xs text-white/60 mb-1">Crew Happiness</div>
            <div className="flex items-center gap-2">
              <Progress 
                value={crewHappiness} 
                className="h-2"
              />
              <span className="text-sm font-bold text-white w-8">{Math.round(crewHappiness)}%</span>
            </div>
          </div>
        </div>

        {/* Right: Audio Controls & Status */}
        <div className="flex items-center gap-3">
          <AudioControls />
          <Badge variant={isPlaying && !isPaused ? "default" : "secondary"}>
            {isPlaying && !isPaused ? "Running" : "Paused"}
          </Badge>
        </div>
      </div>
    </Card>
  );
};

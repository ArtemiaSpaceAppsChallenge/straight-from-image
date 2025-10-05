import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { useAudio } from '@/contexts/AudioContext';

interface AudioControlsProps {
  className?: string;
}

export function AudioControls({ className = '' }: AudioControlsProps) {
  const { isPlaying, volume, isMuted, togglePlay, setVolume, toggleMute } = useAudio();

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  return (
    <Card className={`p-3 bg-black/20 backdrop-blur-sm border-gray-700 ${className}`}>
      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={togglePlay}
          className="text-white hover:text-cyan-400 hover:bg-white/10"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>

        {/* Mute Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMute}
          className="text-white hover:text-cyan-400 hover:bg-white/10"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>

        {/* Volume Slider */}
        <div className="flex items-center gap-2 min-w-[100px]">
          <Slider
            value={[isMuted ? 0 : volume]}
            onValueChange={handleVolumeChange}
            max={1}
            step={0.1}
            className="flex-1"
          />
          <span className="text-xs text-gray-400 min-w-[30px]">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>
      </div>
    </Card>
  );
}
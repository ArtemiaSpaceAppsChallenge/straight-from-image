import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MissionScenario } from '@/types/game';
import { MISSION_SCENARIOS } from '@/lib/gameData';
import { Rocket, Users, Calendar, Target } from 'lucide-react';

interface MissionSelectorProps {
  onSelectMission: (mission: MissionScenario) => void;
  onCancel: () => void;
}

export const MissionSelector: React.FC<MissionSelectorProps> = ({
  onSelectMission,
  onCancel
}) => {
  const [selectedMission, setSelectedMission] = useState<MissionScenario | null>(null);

  const getHabitatIcon = (type: string) => {
    const icons = {
      'lunar': '🌙',
      'mars': '🔴',
      'orbital': '🛰️'
    };
    return icons[type as keyof typeof icons] || '🚀';
  };

  const getDifficultyColor = (duration: number) => {
    if (duration < 60) return 'bg-green-500';
    if (duration < 180) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-[#0B0F17] border-white/20 p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">
            🚀 Select Your Mission
          </h2>
          <p className="text-white/70">
            Choose a mission scenario to begin designing your space habitat
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {MISSION_SCENARIOS.map(mission => (
            <Card
              key={mission.id}
              className={`p-4 cursor-pointer transition-all ${
                selectedMission?.id === mission.id
                  ? 'bg-primary/20 border-primary'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
              onClick={() => setSelectedMission(mission)}
            >
              <div className="text-center mb-3">
                <span className="text-4xl mb-2 block">
                  {getHabitatIcon(mission.habitatType)}
                </span>
                <h3 className="text-lg font-bold text-white mb-1">
                  {mission.name}
                </h3>
                <Badge className={getDifficultyColor(mission.missionDuration)}>
                  {mission.missionDuration < 60 ? 'Easy' : mission.missionDuration < 180 ? 'Medium' : 'Hard'}
                </Badge>
              </div>

              <p className="text-xs text-white/70 mb-3 min-h-[40px]">
                {mission.description}
              </p>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-white/80">
                  <Users className="w-3 h-3" />
                  <span>{mission.crewSize} crew members</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Calendar className="w-3 h-3" />
                  <span>{mission.missionDuration} days</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Rocket className="w-3 h-3" />
                  <span>{mission.constraints.maxVolume}m³ max volume</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {selectedMission && (
          <Card className="bg-white/10 border-white/20 p-4 mb-6">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Mission Objectives
            </h4>
            <ul className="space-y-2">
              {selectedMission.objectives.map((obj, index) => (
                <li key={index} className="text-sm text-white/80 flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-4 border-t border-white/10">
              <h4 className="text-sm font-bold text-white mb-2">Required Rooms</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMission.constraints.requiredRooms.map(room => (
                  <Badge key={room} variant="outline" className="text-xs">
                    {room}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        )}

        <div className="flex gap-3">
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={() => selectedMission && onSelectMission(selectedMission)}
            disabled={!selectedMission}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Start Mission
          </Button>
        </div>
      </Card>
    </div>
  );
};

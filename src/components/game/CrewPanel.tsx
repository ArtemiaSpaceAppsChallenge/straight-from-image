import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CrewMember } from '@/types/game';
import { Heart, Zap, UtensilsCrossed, Droplets, Wrench, Stethoscope, FlaskConical } from 'lucide-react';

interface CrewPanelProps {
  crew: CrewMember[];
}

export const CrewPanel: React.FC<CrewPanelProps> = ({ crew }) => {
  const getMoodEmoji = (mood: string) => {
    const emojis = {
      'happy': '😊',
      'neutral': '😐',
      'stressed': '😰',
      'exhausted': '😵'
    };
    return emojis[mood as keyof typeof emojis] || '😐';
  };

  const getMoodColor = (mood: string) => {
    const colors = {
      'happy': 'bg-green-500',
      'neutral': 'bg-yellow-500',
      'stressed': 'bg-orange-500',
      'exhausted': 'bg-red-500'
    };
    return colors[mood as keyof typeof colors] || 'bg-gray-500';
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Card className="bg-white/5 border-white/10 p-4">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        👨‍🚀 Crew Members ({crew.length})
      </h3>
      
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {crew.map(member => (
          <Card key={member.id} className="bg-white/10 border-white/20 p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getMoodEmoji(member.mood)}</span>
                <div>
                  <div className="text-sm font-bold text-white">{member.name}</div>
                  <Badge variant="outline" className="text-xs mt-1">
                    {getStatusLabel(member.status)}
                  </Badge>
                </div>
              </div>
              <div className={`w-2 h-2 rounded-full ${getMoodColor(member.mood)}`} />
            </div>

            {/* Needs */}
            <div className="space-y-2 mb-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white/70 flex items-center gap-1">
                    <Heart className="w-3 h-3" /> Health
                  </span>
                  <span className="text-xs text-white">{Math.round(member.health)}%</span>
                </div>
                <Progress value={member.health} className="h-1.5" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white/70 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Energy
                  </span>
                  <span className="text-xs text-white">{Math.round(member.energy)}%</span>
                </div>
                <Progress value={member.energy} className="h-1.5" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white/70 flex items-center gap-1">
                    <UtensilsCrossed className="w-3 h-3" /> Hunger
                  </span>
                  <span className="text-xs text-white">{Math.round(member.hunger)}%</span>
                </div>
                <Progress value={member.hunger} className="h-1.5" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white/70 flex items-center gap-1">
                    <Droplets className="w-3 h-3" /> Hygiene
                  </span>
                  <span className="text-xs text-white">{Math.round(member.hygiene)}%</span>
                </div>
                <Progress value={member.hygiene} className="h-1.5" />
              </div>
            </div>

            {/* Skills */}
            <div className="pt-2 border-t border-white/10">
              <div className="text-xs text-white/60 mb-1">Skills</div>
              <div className="flex gap-2">
                <div className="text-center">
                  <Wrench className="w-3 h-3 mx-auto text-white/70" />
                  <div className="text-xs text-white mt-0.5">{member.skills.engineering}</div>
                </div>
                <div className="text-center">
                  <Stethoscope className="w-3 h-3 mx-auto text-white/70" />
                  <div className="text-xs text-white mt-0.5">{member.skills.medical}</div>
                </div>
                <div className="text-center">
                  <FlaskConical className="w-3 h-3 mx-auto text-white/70" />
                  <div className="text-xs text-white mt-0.5">{member.skills.science}</div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {crew.length === 0 && (
          <div className="text-center text-white/50 py-8">
            No crew members assigned
          </div>
        )}
      </div>
    </Card>
  );
};

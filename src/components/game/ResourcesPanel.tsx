import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Resources } from '@/types/game';
import { Wind, Droplets, Zap, Apple } from 'lucide-react';

interface ResourcesPanelProps {
  resources: Resources;
  maxResources: Resources;
  consumptionRate: Resources;
}

export const ResourcesPanel: React.FC<ResourcesPanelProps> = ({
  resources,
  maxResources,
  consumptionRate
}) => {
  const getPercentage = (current: number, max: number) => {
    return (current / max) * 100;
  };

  const getStatusColor = (percentage: number) => {
    if (percentage > 50) return 'text-green-500';
    if (percentage > 25) return 'text-yellow-500';
    return 'text-red-500';
  };

  const resourceConfig = [
    {
      key: 'oxygen' as keyof Resources,
      icon: Wind,
      label: 'Oxygen',
      unit: 'kg',
      color: 'text-cyan-400'
    },
    {
      key: 'water' as keyof Resources,
      icon: Droplets,
      label: 'Water',
      unit: 'L',
      color: 'text-blue-400'
    },
    {
      key: 'power' as keyof Resources,
      icon: Zap,
      label: 'Power',
      unit: 'kWh',
      color: 'text-yellow-400'
    },
    {
      key: 'food' as keyof Resources,
      icon: Apple,
      label: 'Food',
      unit: 'kg',
      color: 'text-green-400'
    }
  ];

  return (
    <Card className="bg-white/5 border-white/10 p-4">
      <h3 className="text-lg font-bold text-white mb-4">📊 Resources</h3>
      
      <div className="space-y-4">
        {resourceConfig.map(({ key, icon: Icon, label, unit, color }) => {
          const current = resources[key];
          const max = maxResources[key];
          const rate = consumptionRate[key];
          const percentage = getPercentage(current, max);
          const daysRemaining = rate > 0 ? Math.floor(current / rate) : Infinity;

          return (
            <div key={key}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span className="text-sm font-medium text-white">{label}</span>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getStatusColor(percentage)}`}
                >
                  {daysRemaining === Infinity ? '∞' : `${daysRemaining}d`}
                </Badge>
              </div>
              
              <Progress value={percentage} className="h-2 mb-1" />
              
              <div className="flex justify-between text-xs text-white/60">
                <span>
                  {current.toFixed(1)} / {max.toFixed(1)} {unit}
                </span>
                <span>
                  -{rate.toFixed(2)} {unit}/day
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-xs text-white/60 mb-2">Resource Efficiency</div>
        <div className="space-y-1">
          {resourceConfig.map(({ key, label }) => {
            const efficiency = getPercentage(resources[key], maxResources[key]);
            return (
              <div key={key} className="flex justify-between text-xs">
                <span className="text-white/70">{label}:</span>
                <span className={getStatusColor(efficiency)}>
                  {efficiency.toFixed(0)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

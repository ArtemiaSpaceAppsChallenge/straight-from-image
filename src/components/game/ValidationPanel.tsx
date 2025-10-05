import React from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';

interface ValidationPanelProps {
  errors: string[];
  warnings: string[];
  complianceScore: number;
}

export const ValidationPanel: React.FC<ValidationPanelProps> = ({
  errors,
  warnings,
  complianceScore
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <Card className="bg-white/5 border-white/10 p-4">
      <h3 className="text-lg font-bold text-white mb-4">✓ Validation</h3>

      {/* Compliance Score */}
      <div className="mb-4 p-4 bg-white/10 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white/70">Compliance Score</span>
          <Badge variant="outline" className={getScoreColor(complianceScore)}>
            {getScoreLabel(complianceScore)}
          </Badge>
        </div>
        <div className="text-3xl font-bold text-white mb-1">
          {complianceScore}%
        </div>
        <div className="text-xs text-white/60">
          Based on NASA ECLSS standards
        </div>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm font-bold text-white">
              Errors ({errors.length})
            </span>
          </div>
          <div className="space-y-2">
            {errors.map((error, index) => (
              <Alert key={index} variant="destructive" className="bg-red-500/10 border-red-500/20">
                <AlertDescription className="text-xs">{error}</AlertDescription>
              </Alert>
            ))}
          </div>
        </div>
      )}

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-bold text-white">
              Warnings ({warnings.length})
            </span>
          </div>
          <div className="space-y-2">
            {warnings.map((warning, index) => (
              <Alert key={index} className="bg-yellow-500/10 border-yellow-500/20">
                <AlertDescription className="text-xs text-white/80">
                  {warning}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </div>
      )}

      {/* Success Message */}
      {errors.length === 0 && warnings.length === 0 && (
        <Alert className="bg-green-500/10 border-green-500/20">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <AlertDescription className="text-sm text-white/90">
            All validation checks passed! Your habitat design meets all requirements.
          </AlertDescription>
        </Alert>
      )}

      {/* NASA Standards Info */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold text-white">NASA Standards</span>
        </div>
        <ul className="text-xs text-white/70 space-y-1">
          <li>• Minimum 4.5m² per crew for sleep areas</li>
          <li>• Life support systems are mandatory</li>
          <li>• Noise levels must be managed</li>
          <li>• Room adjacency rules must be followed</li>
          <li>• Total volume must not exceed limits</li>
        </ul>
      </div>
    </Card>
  );
};

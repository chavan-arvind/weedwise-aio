
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeedDetection } from "@/types/weed-types";
import { Leaf, AlertCircle, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface WeedCardProps {
  detection: WeedDetection;
}

const WeedCard = ({ detection }: WeedCardProps) => {
  // Map growth stages to colors
  const getStageColor = (stage: string) => {
    const stageMap: Record<string, string> = {
      'Seedling': 'bg-green-100 text-green-800',
      'Early Vegetative': 'bg-green-200 text-green-800',
      'Late Vegetative': 'bg-green-300 text-green-800',
      'Early Budding': 'bg-yellow-100 text-yellow-800',
      'Late Budding': 'bg-yellow-200 text-yellow-800',
      'Early Flowering': 'bg-amber-100 text-amber-800',
      'Late Flowering': 'bg-amber-200 text-amber-800',
      'Early Maturity': 'bg-orange-100 text-orange-800',
      'Late Maturity': 'bg-orange-200 text-orange-800',
    };
    return stageMap[stage] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="card-hover overflow-hidden">
      <div className="h-2 weedwise-gradient" />
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <Leaf className="h-5 w-5 mr-2 text-weedwise-primary" />
          {detection.species}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="h-4 w-4 mr-1 text-gray-500" />
            <span className="text-sm text-gray-500">Confidence:</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">{Math.round(detection.confidence * 100)}%</span>
          </div>
        </div>
        
        <Progress
          value={detection.confidence * 100}
          className="h-2"
        />
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-gray-500">Growth Stage:</span>
          <Badge variant="outline" className={cn(getStageColor(detection.growthStage))}>
            {detection.growthStage}
          </Badge>
        </div>
        
        <div className="pt-2">
          <div className="flex items-start">
            <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-amber-500" />
            <p className="text-xs text-gray-600">
              {detection.species} at {detection.growthStage} stage 
              {detection.growthStage.includes('Early') 
                ? ' is easier to control. Early treatment recommended.' 
                : ' is more difficult to control. Aggressive treatment required.'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeedCard;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Recommendation } from "@/types/weed-types";
import { Sparkles, DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface RecommendationListProps {
  recommendations: Recommendation[];
}

const RecommendationList = ({ recommendations }: RecommendationListProps) => {
  const getCostBadge = (costLevel: 'Low' | 'Medium' | 'High') => {
    const costMap: Record<string, string> = {
      'Low': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'High': 'bg-red-100 text-red-800',
    };
    return costMap[costLevel] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Treatment Recommendations</h3>
      
      <div className="grid grid-cols-1 gap-6">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center text-lg">
                  <Sparkles className="h-5 w-5 mr-2 text-weedwise-primary" />
                  {rec.method}
                </CardTitle>
                <Badge variant="outline" className={getCostBadge(rec.costLevel)}>
                  <DollarSign className="h-3 w-3 mr-1" />
                  {rec.costLevel} Cost
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm text-gray-500">Target: <span className="font-medium text-foreground">{rec.weedSpecies}</span></span>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-500">Effectiveness:</span>
                  <span className="font-medium">{rec.effectiveness}%</span>
                </div>
                <Progress value={rec.effectiveness} className="h-2" />
              </div>
              
              <div className="pt-1">
                <p className="text-sm">{rec.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendationList;

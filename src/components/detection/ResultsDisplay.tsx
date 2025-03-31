
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeedAnalysisResult, WeedDetection } from "@/types/weed-types";
import { AlertCircle, CheckCircle, DollarSign, Activity, Clock } from "lucide-react";
import WeedCard from "./WeedCard";
import RecommendationList from "./RecommendationList";

interface ResultsDisplayProps {
  result: WeedAnalysisResult;
}

const ResultsDisplay = ({ result }: ResultsDisplayProps) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-weedwise-primary" />
              Annotated Image
            </CardTitle>
            <CardDescription>
              AI-detected weed species with bounding boxes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <img 
                src={result.annotatedImage} 
                alt="Annotated field image" 
                className="w-full h-auto object-contain" 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-weedwise-primary" />
              Detection Summary
            </CardTitle>
            <CardDescription>
              {result.detections.length} weed species detected
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="mb-4 grid gap-4">
                {result.detections.map((detection) => (
                  <div key={detection.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                      <span>{detection.species}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Confidence:</span>
                      <span className="font-medium">{Math.round(detection.confidence * 100)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="weed-species">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
          <TabsTrigger value="weed-species">Weed Species</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="roi-impact">ROI Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="weed-species" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.detections.map((detection) => (
              <WeedCard key={detection.id} detection={detection} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="animate-fade-in">
          <RecommendationList recommendations={result.recommendations} />
        </TabsContent>

        <TabsContent value="roi-impact" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-weedwise-primary" />
                ROI Impact Analysis
              </CardTitle>
              <CardDescription>
                Cost estimation and benefit analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Estimated Treatment Cost</span>
                      <span className="font-bold text-weedwise-accent">${result.roiImpact.estimatedCost.toFixed(2)}</span>
                    </div>
                    <Progress value={result.roiImpact.estimatedCost / 10} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Required Labor Hours</span>
                      <span className="font-bold text-weedwise-accent">{result.roiImpact.laborHours}</span>
                    </div>
                    <Progress value={result.roiImpact.laborHours * 10} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Market Value</span>
                      <span className="font-bold text-weedwise-accent">${result.roiImpact.marketValue.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Yield Impact</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Without Treatment</span>
                        <span className="font-medium text-destructive">{result.roiImpact.yieldImpact.withoutTreatment}%</span>
                      </div>
                      <Progress value={Math.abs(result.roiImpact.yieldImpact.withoutTreatment)} className="h-2 bg-red-100" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">With Treatment</span>
                        <span className="font-medium text-weedwise-primary">+{result.roiImpact.yieldImpact.withTreatment}%</span>
                      </div>
                      <Progress value={result.roiImpact.yieldImpact.withTreatment} className="h-2" />
                    </div>
                    
                    <div className="p-3 bg-weedwise-light rounded-md border border-weedwise-secondary mt-4">
                      <div className="flex items-start">
                        <Clock className="h-4 w-4 mt-0.5 mr-2 text-weedwise-dark" />
                        <p className="text-sm text-weedwise-dark">
                          Early treatment provides the best ROI. Treating now could save 
                          <span className="font-bold"> ${(result.roiImpact.marketValue * (Math.abs(result.roiImpact.yieldImpact.withoutTreatment) / 100)).toFixed(2)}</span> in 
                          potential losses.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsDisplay;

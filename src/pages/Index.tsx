
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ImageUploader from '@/components/detection/ImageUploader';
import ResultsDisplay from '@/components/detection/ResultsDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Sprout, Database, Info } from 'lucide-react';
import { WeedAnalysisResult, getMockResult } from '@/types/weed-types';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<WeedAnalysisResult | null>(null);
  const { toast } = useToast();

  const handleImageSelected = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setAnalysisResult(null); // Reset any previous results
  };

  const handleAnalyzeImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image to analyze.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real application, this would be an API call to the backend
      const result = getMockResult(selectedImage);
      setAnalysisResult(result);
      setIsProcessing(false);
      
      toast({
        title: "Analysis complete",
        description: `Detected ${result.detections.length} weed species in your image.`,
        variant: "default",
      });
    }, 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-weedwise-dark">Weed</span>
            <span className="text-weedwise-primary">Wise</span>
            <span className="text-weedwise-dark"> AI Detection</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload field images to identify weed species, growth stages, and get personalized management recommendations.
          </p>
        </div>

        {!analysisResult && (
          <>
            <div className="max-w-3xl mx-auto mb-8">
              <ImageUploader 
                onImageSelected={handleImageSelected} 
                isProcessing={isProcessing}
              />
            </div>
            
            <div className="flex justify-center mb-12">
              <Button 
                size="lg" 
                disabled={!selectedImage || isProcessing} 
                onClick={handleAnalyzeImage}
                className="relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  <Leaf className="mr-2 h-5 w-5" />
                  Analyze Image
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-weedwise-primary to-weedwise-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="text-center card-hover">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-weedwise-light p-3 inline-flex mb-4">
                    <Leaf className="h-6 w-6 text-weedwise-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Weed Detection</h3>
                  <p className="text-gray-600 text-sm">
                    Identify 12 common weed species with high accuracy using our YOLO-based model.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center card-hover">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-weedwise-light p-3 inline-flex mb-4">
                    <Sprout className="h-6 w-6 text-weedwise-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Growth Analysis</h3>
                  <p className="text-gray-600 text-sm">
                    Classify weed growth stages to determine optimal treatment timing.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center card-hover">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-weedwise-light p-3 inline-flex mb-4">
                    <Database className="h-6 w-6 text-weedwise-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Smart Recommendations</h3>
                  <p className="text-gray-600 text-sm">
                    Get tailored weed management strategies based on detected species.
                  </p>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {analysisResult && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center">
                <Info className="mr-2 h-5 w-5 text-weedwise-primary" />
                Analysis Results
              </h2>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedImage(null);
                  setAnalysisResult(null);
                }}
              >
                New Analysis
              </Button>
            </div>
            <ResultsDisplay result={analysisResult} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;

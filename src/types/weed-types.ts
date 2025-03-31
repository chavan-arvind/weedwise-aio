
export interface WeedDetection {
  id: string;
  species: WeedSpecies;
  confidence: number;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  growthStage: GrowthStage;
}

export type WeedSpecies = 
  | 'Carpetweed'
  | 'Cutleaf Groundcherry'
  | 'Eclipta'
  | 'Goosegrass'
  | 'Morning Glory'
  | 'Palmer Amaranth'
  | 'Prickly Sida'
  | 'Purslane'
  | 'Ragweed'
  | 'Sicklepod'
  | 'Spotted Spurge'
  | 'Waterhemp';

export type GrowthStage = 
  | 'Seedling'
  | 'Early Vegetative'
  | 'Late Vegetative'
  | 'Early Budding'
  | 'Late Budding'
  | 'Early Flowering'
  | 'Late Flowering'
  | 'Early Maturity'
  | 'Late Maturity';

export interface WeedAnalysisResult {
  originalImage: string;
  annotatedImage: string;
  detections: WeedDetection[];
  recommendations: Recommendation[];
  roiImpact: RoiImpact;
}

export interface Recommendation {
  id: string;
  weedSpecies: WeedSpecies;
  method: string;
  description: string;
  effectiveness: number; // 0-100
  costLevel: 'Low' | 'Medium' | 'High';
}

export interface RoiImpact {
  estimatedCost: number;
  laborHours: number;
  yieldImpact: {
    withoutTreatment: number; // percentage loss
    withTreatment: number; // percentage gain
  };
  marketValue: number;
}

// Mock data function for demonstration purposes
export const getMockResult = (imageUrl: string): WeedAnalysisResult => {
  return {
    originalImage: imageUrl,
    annotatedImage: imageUrl, // In a real scenario, this would be different
    detections: [
      {
        id: '1',
        species: 'Palmer Amaranth',
        confidence: 0.92,
        boundingBox: { x: 120, y: 80, width: 100, height: 150 },
        growthStage: 'Early Vegetative'
      },
      {
        id: '2',
        species: 'Goosegrass',
        confidence: 0.87,
        boundingBox: { x: 320, y: 180, width: 80, height: 90 },
        growthStage: 'Seedling'
      },
      {
        id: '3',
        species: 'Ragweed',
        confidence: 0.79,
        boundingBox: { x: 220, y: 280, width: 110, height: 140 },
        growthStage: 'Early Budding'
      }
    ],
    recommendations: [
      {
        id: '1',
        weedSpecies: 'Palmer Amaranth',
        method: 'Glyphosate + Dicamba',
        description: 'Apply post-emergence when weeds are 2-4 inches tall.',
        effectiveness: 85,
        costLevel: 'Medium'
      },
      {
        id: '2',
        weedSpecies: 'Goosegrass',
        method: 'Pendimethalin',
        description: 'Apply as a pre-emergent herbicide before weed germination.',
        effectiveness: 92,
        costLevel: 'Medium'
      },
      {
        id: '3',
        weedSpecies: 'Ragweed',
        method: 'Atrazine',
        description: 'Apply early post-emergence when ragweed is small.',
        effectiveness: 80,
        costLevel: 'Low'
      }
    ],
    roiImpact: {
      estimatedCost: 42.50,
      laborHours: 2.5,
      yieldImpact: {
        withoutTreatment: -15, // 15% loss
        withTreatment: 7, // 7% gain
      },
      marketValue: 1250.00
    }
  };
};

export interface AnalysisResult {
  id: string;
  imageName: string;
  imageUrl: string;
  disease: string;
  confidence: number;
  model: string;
  date: string;
  recommendations: string[];
}

const diseases = [
  {
    disease: "Tomato Late Blight",
    confidence: 94.2,
    recommendations: [
      "Remove and destroy infected plant parts immediately",
      "Apply copper-based fungicide as a preventive measure",
      "Ensure proper spacing between plants for air circulation",
      "Avoid overhead irrigation to reduce humidity",
    ],
  },
  {
    disease: "Corn Northern Leaf Blight",
    confidence: 89.7,
    recommendations: [
      "Use resistant corn hybrids in future plantings",
      "Apply foliar fungicides at first sign of disease",
      "Practice crop rotation with non-host crops",
      "Remove crop debris after harvest",
    ],
  },
  {
    disease: "Rice Blast",
    confidence: 91.5,
    recommendations: [
      "Use blast-resistant rice varieties",
      "Apply systemic fungicides like tricyclazole",
      "Avoid excess nitrogen fertilization",
      "Maintain proper water management in paddies",
    ],
  },
  {
    disease: "Wheat Rust",
    confidence: 87.3,
    recommendations: [
      "Plant rust-resistant wheat varieties",
      "Apply fungicides at early infection stages",
      "Monitor fields regularly during warm, humid conditions",
      "Remove volunteer wheat plants",
    ],
  },
  {
    disease: "Healthy Leaf",
    confidence: 96.1,
    recommendations: [
      "Continue current crop management practices",
      "Maintain regular monitoring schedule",
      "Ensure balanced fertilization",
      "Keep irrigation consistent",
    ],
  },
];

export function getRandomResult(imageName: string, imageUrl: string, model: string): AnalysisResult {
  const pick = diseases[Math.floor(Math.random() * diseases.length)];
  return {
    id: crypto.randomUUID(),
    imageName,
    imageUrl,
    disease: pick.disease,
    confidence: pick.confidence + (Math.random() * 4 - 2),
    model,
    date: new Date().toLocaleString(),
    recommendations: pick.recommendations,
  };
}

export const placeholderModels = [
  "Model A (Placeholder)",
  "Model B (Placeholder)",
  "CNN-ResNet50",
  "EfficientNet-B4",
];

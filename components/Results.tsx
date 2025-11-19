import React, { useEffect, useState } from 'react';
import { UserMeasurements, AnalysisResult, ProductRecommendation, Gender } from '../types';
import { analyzeStyleWithGemini } from '../services/geminiService';
import { Button } from './Button';
import { ExternalLink, ArrowRight, Sparkles } from 'lucide-react';

interface ResultsProps {
  userData: UserMeasurements;
  onRetry: () => void;
}

export const Results: React.FC<ResultsProps> = ({ userData, onRetry }) => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      
      // Logic Prompt 11: Updated Rule-based classification with Gender
      let basicShape = "Other";

      if (userData.gender === Gender.FEMALE) {
        // Simple logic for females
        if (userData.hip > (userData.waist + 10) && userData.hip > userData.chest) {
          basicShape = "Pear Shape (Female)";
          console.log("Logic Check: Female Pear Advice");
        } else {
          console.log("Logic Check: Female Other Advice");
        }
      } else if (userData.gender === Gender.MALE) {
        // Simple placeholder logic for males
        basicShape = "Male Body Type";
        console.log("Logic Check: Male Advice");
      } else {
         console.log("Logic Check: General Advice");
      }

      console.log(`Rule-based result: ${basicShape} for ${userData.gender}`);

      // Call Gemini
      const aiResult = await analyzeStyleWithGemini(userData);
      setResult(aiResult);
      setLoading(false);
    };

    fetchAnalysis();
  }, [userData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-pulse">
        <div className="w-16 h-16 border-4 border-blue-950 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold text-slate-900">Analyzing your profile...</h2>
        <p className="text-slate-500 mt-2">Our AI stylist is curating your perfect look.</p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="w-full max-w-5xl mx-auto py-8 space-y-12">
      
      {/* Top Box - Personal Greetings & Analysis */}
      <div className="bg-blue-950 text-white p-8 md:p-12 rounded-2xl shadow-xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
            Hello, {userData.name}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm uppercase tracking-wider font-semibold opacity-90 mb-6">
            <span className="bg-white/20 px-3 py-1 rounded-full">Shape: {result.bodyShape}</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Skin: {userData.skinTone}</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Gender: {userData.gender}</span>
          </div>
          <p className="text-blue-100 leading-relaxed max-w-2xl">
            {result.advice}
          </p>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <Sparkles className="text-blue-950" />
          <h2 className="text-2xl font-bold text-slate-900">Ideal Outfit Suggestions</h2>
        </div>

        {/* Prompt 6: Product Simulation Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {result.recommendations.map((item, index) => (
            <ProductCard key={index} product={item} />
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <Button variant="outline" onClick={onRetry}>
          Update Measurements
        </Button>
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: ProductRecommendation }> = ({ product }) => {
  // Using placeholder images based on category keyword to look nice
  const imageUrl = `https://picsum.photos/seed/${product.category}${product.id}/400/500`;

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-950 rounded-sm shadow-sm">
          {product.category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-900 mb-2">{product.name}</h3>
        <p className="text-slate-600 text-sm mb-6 flex-grow line-clamp-3">
          {product.description}
        </p>
        
        {/* Buy Button */}
        <a 
          href={product.buyUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full px-4 py-3 bg-blue-950 text-white text-sm font-medium rounded-lg hover:bg-blue-900 transition-colors gap-2"
        >
          Buy Now <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};
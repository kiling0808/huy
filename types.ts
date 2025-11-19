export enum SkinTone {
  WARM = 'Warm',
  COOL = 'Cool',
  NEUTRAL = 'Neutral'
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}

export interface UserMeasurements {
  name: string;
  gender: Gender;
  height: number; // cm
  weight: number; // kg
  chest: number; // cm
  waist: number; // cm
  hip: number; // cm
  skinTone: SkinTone;
}

export interface User {
  username: string;
  email: string;
  gender: Gender;
  role: 'user' | 'admin';
}

export interface ProductRecommendation {
  id: string;
  name: string;
  description: string;
  category: 'Top' | 'Bottom' | 'Dress' | 'Shoes' | 'Accessory';
  buyUrl: string;
}

export interface AnalysisResult {
  bodyShape: string;
  advice: string;
  recommendations: ProductRecommendation[];
}
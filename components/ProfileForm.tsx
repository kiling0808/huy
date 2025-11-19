import React, { useState } from 'react';
import { UserMeasurements, SkinTone, Gender } from '../types';
import { Button } from './Button';
import { Ruler, Weight, Activity, Users } from 'lucide-react';

interface ProfileFormProps {
  initialData?: Partial<UserMeasurements>;
  onSubmit: (data: UserMeasurements) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<UserMeasurements>>({
    name: '',
    skinTone: SkinTone.NEUTRAL,
    gender: Gender.FEMALE,
    ...initialData
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
    setError(null); // Clear error on typing
  };

  const handleSkinToneChange = (tone: SkinTone) => {
    setFormData(prev => ({ ...prev, skinTone: tone }));
  };

  const handleGenderChange = (gender: Gender) => {
    setFormData(prev => ({ ...prev, gender: gender }));
  };

  // Logic Prompt 3: Validation Function
  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { name, height, weight, chest, waist, hip, skinTone, gender } = formData;

    if (!name || !height || !weight || !chest || !waist || !hip || !skinTone || !gender) {
      setError("Please fill in all fields to receive your consultation.");
      return;
    }

    // If valid, submit
    onSubmit(formData as UserMeasurements);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Your Profile</h2>
        <p className="text-slate-500">Accurate measurements ensure the best style advice.</p>
      </div>

      <form onSubmit={validateAndSubmit} className="space-y-8">
        
        {/* Name */}
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Full Name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Jane Doe"
              value={formData.name}
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent outline-none transition-all"
              onChange={handleInputChange}
            />
        </div>

        {/* Gender Selection */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Users size={16} /> Gender
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[Gender.FEMALE, Gender.MALE, Gender.OTHER].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => handleGenderChange(g)}
                className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                  formData.gender === g
                    ? 'border-blue-950 bg-blue-50 text-blue-950' 
                    : 'border-slate-100 text-slate-500 hover:border-slate-300'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Physical Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Ruler size={16} /> Height (cm)
            </label>
            <input 
              type="number" 
              name="height" 
              placeholder="165"
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent outline-none"
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Weight size={16} /> Weight (kg)
            </label>
            <input 
              type="number" 
              name="weight" 
              placeholder="55"
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent outline-none"
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Measurements */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-800 border-b pb-2">Measurements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Chest (cm)</label>
              <input 
                type="number" 
                name="chest" 
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-950 outline-none"
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Waist (cm)</label>
              <input 
                type="number" 
                name="waist" 
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-950 outline-none"
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Hips (cm)</label>
              <input 
                type="number" 
                name="hip" 
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-950 outline-none"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Skin Tone */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Activity size={16} /> Skin Tone
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[SkinTone.WARM, SkinTone.COOL, SkinTone.NEUTRAL].map((tone) => (
              <button
                key={tone}
                type="button"
                onClick={() => handleSkinToneChange(tone)}
                className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                  formData.skinTone === tone 
                    ? 'border-blue-950 bg-blue-50 text-blue-950' 
                    : 'border-slate-100 text-slate-500 hover:border-slate-300'
                }`}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm animate-pulse">
            {error}
          </div>
        )}

        {/* Submit */}
        <Button type="submit" fullWidth>
          View Consultation Results
        </Button>
      </form>
    </div>
  );
};
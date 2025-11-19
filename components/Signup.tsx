import React, { useState } from 'react';
import { Button } from './Button';
import { Gender } from '../types';

interface SignupProps {
  onSignup: (username: string, gender: Gender) => void;
  onSwitchToLogin: () => void;
}

export const Signup: React.FC<SignupProps> = ({ onSignup, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: Gender.FEMALE,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (gender: Gender) => {
    setFormData({ ...formData, gender });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (formData.username && formData.email && formData.password) {
      onSignup(formData.username, formData.gender);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
          <input
            name="username"
            type="text"
            required
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-950 outline-none"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
          <input
            name="email"
            type="email"
            required
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-950 outline-none"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-950 outline-none"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            required
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-950 outline-none"
            onChange={handleChange}
          />
        </div>

        {/* Gender Radio Buttons */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
          <div className="flex gap-4">
            {[Gender.MALE, Gender.FEMALE, Gender.OTHER].map((g) => (
              <label key={g} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  checked={formData.gender === g}
                  onChange={() => handleGenderChange(g)}
                  className="w-4 h-4 text-blue-950 focus:ring-blue-950"
                />
                <span className="text-sm text-slate-700">{g}</span>
              </label>
            ))}
          </div>
        </div>

        <Button type="submit" fullWidth>Register</Button>
        
        <div className="text-center text-sm text-slate-600 mt-4">
          Already have an account?{' '}
          <button type="button" onClick={onSwitchToLogin} className="text-blue-950 font-semibold hover:underline">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
import React, { useState } from 'react';
import { Button } from './Button';

interface LoginProps {
  onLogin: (username: string) => void;
  onSwitchToSignup: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock validation
    if (username && password) {
      onLogin(username);
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-950 outline-none"
            placeholder="Try 'admin' for dashboard"
          />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <a href="#" className="text-xs text-blue-950 hover:underline">Forgot password?</a>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-950 outline-none"
            placeholder="********"
          />
        </div>

        <Button type="submit" fullWidth>Login</Button>

        <div className="text-center text-sm text-slate-600 mt-4">
          Don't have an account?{' '}
          <button type="button" onClick={onSwitchToSignup} className="text-blue-950 font-semibold hover:underline">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export const FinalLevel: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    timeCompleted: new Date().toISOString()
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('leaderboard')
        .insert([formData]);
        
      if (error) throw error;
      
      navigate('/leaderboard');
    } catch (error) {
      console.error('Error saving to leaderboard:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 to-orange-900 flex flex-col items-center justify-center p-4">
      <Trophy className="w-16 h-16 text-yellow-400 mb-6" />
      <h1 className="text-3xl font-bold text-yellow-300 mb-4">Congratulations!</h1>
      
      <div className="max-w-md w-full bg-yellow-950/50 p-8 rounded-lg shadow-xl">
        <p className="text-yellow-200 mb-6 text-center">
          You've successfully completed all challenges! Enter your details to join the leaderboard.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-yellow-300 mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 rounded bg-yellow-900/50 text-yellow-100 placeholder-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-yellow-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2 rounded bg-yellow-900/50 text-yellow-100 placeholder-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-6 py-3 bg-yellow-600 hover:bg-yellow-500 rounded text-white font-bold transition-colors"
          >
            Join the Leaderboard
          </button>
        </form>
      </div>
    </div>
  );
};
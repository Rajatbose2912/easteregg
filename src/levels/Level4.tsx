import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';
import CryptoJS from 'crypto-js';

export const Level4: React.FC = () => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hash = CryptoJS.SHA3(answer.toLowerCase()).toString();
    
    if (hash.startsWith('a1b2c3')) {
      navigate('/victory');
    } else {
      setMessage('That\'s not quite right...');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-green-900 flex flex-col items-center justify-center p-4">
      <Brain className="w-16 h-16 text-emerald-400 mb-6" />
      <h1 className="text-3xl font-bold text-emerald-300 mb-4">The Final Riddle</h1>
      
      <div className="max-w-md text-center mb-8">
        <p className="text-emerald-200 mb-4">
          "I am not alive, but I grow;<br />
          I don't have lungs, but I need air;<br />
          I don't have a mouth, but I need water;<br />
          I don't have eyes, but I need light."
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="w-full px-4 py-2 rounded bg-emerald-800 text-emerald-100 placeholder-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded text-white transition-colors"
          >
            Submit Answer
          </button>
        </form>
        
        {message && (
          <p className="text-emerald-400 mt-4 animate-pulse">{message}</p>
        )}
      </div>
      
      <div className="absolute bottom-4 text-emerald-500 text-sm">
        Hint: Look around you, the answer is growing...
      </div>
    </div>
  );
};
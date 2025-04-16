import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Binary } from 'lucide-react';
import CryptoJS from 'crypto-js';

export const Level3: React.FC = () => {
  const navigate = useNavigate();
  const [pattern, setPattern] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  
  const symbols = ['∆', '○', '□', '◊'];
  
  useEffect(() => {
    if (pattern.length === 4) {
      const sequence = pattern.join('');
      const hash = CryptoJS.SHA256(sequence).toString();
      
      if (hash.startsWith('e7')) {
        navigate('/final-challenge');
      } else {
        setMessage('The sequence feels wrong...');
        setPattern([]);
        setTimeout(() => setMessage(''), 2000);
      }
    }
  }, [pattern, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-900 to-blue-900 flex flex-col items-center justify-center p-4">
      <Binary className="w-16 h-16 text-cyan-400 mb-6" />
      <h1 className="text-3xl font-bold text-cyan-300 mb-4">The Pattern Lock</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        {symbols.map((symbol, index) => (
          <button
            key={index}
            onClick={() => setPattern(prev => [...prev, symbol])}
            className="w-20 h-20 bg-cyan-800 hover:bg-cyan-700 rounded-lg flex items-center justify-center text-2xl text-cyan-300 transition-colors"
          >
            {symbol}
          </button>
        ))}
      </div>
      
      <div className="flex gap-2 mb-6">
        {Array(4).fill(0).map((_, index) => (
          <div 
            key={index}
            className={`w-8 h-8 rounded-full ${
              pattern[index] ? 'bg-cyan-500' : 'bg-cyan-800'
            }`}
          />
        ))}
      </div>
      
      {message && (
        <p className="text-cyan-400 mt-4 animate-pulse">{message}</p>
      )}
      
      <img 
        src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb"
        alt="Hidden Clue"
        className="absolute opacity-5 pointer-events-none"
        style={{ mixBlendMode: 'overlay' }}
      />
      
      <div className="absolute bottom-4 text-cyan-500 text-sm">
        Hint: The ancient image holds the key to the sacred sequence...
      </div>
    </div>
  );
};
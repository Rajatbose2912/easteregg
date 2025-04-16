import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ghost } from 'lucide-react';

export const Level404: React.FC = () => {
  const navigate = useNavigate();
  const [clicks, setClicks] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // up up down down left right left right b a
    if (clicks.length === konami.length && 
        clicks.every((value, index) => value === konami[index])) {
      navigate('/hidden-path');
    }
  }, [clicks, navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setClicks(prev => [...prev, e.keyCode]);
      if (clicks.length >= 10) {
        setClicks(prev => prev.slice(1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [clicks]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
      <Ghost className="w-24 h-24 mb-8 animate-bounce" />
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page Not Found</p>
      
      <div className="max-w-md text-center">
        <p className="text-gray-400 mb-4">
          "In the realm of lost pages, a secret lies hidden. Those who remember the ancient gaming code shall find their way."
        </p>
        
        <button 
          onClick={() => setShowHint(true)}
          className="text-gray-500 hover:text-gray-300 transition-colors"
        >
          Need a hint?
        </button>
        
        {showHint && (
          <p className="mt-4 text-gray-500 text-sm">
            "Up up down down left right left right B A"
            <br />
            Some old games started with this legendary combination...
          </p>
        )}
      </div>
    </div>
  );
};
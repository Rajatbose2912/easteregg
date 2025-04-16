import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Target } from 'lucide-react';
import CryptoJS from 'crypto-js';

export const Level2: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [lastClick, setLastClick] = useState({ x: 0, y: 0 });
  const [showTarget, setShowTarget] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  
  useEffect(() => {
    let startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const radius = 100; // Radius of circular motion
      const speed = 0.002; // Speed of motion
      
      // Calculate position on a circular path
      const x = window.innerWidth / 2 + radius * Math.cos(elapsed * speed);
      const y = window.innerHeight / 2 + radius * Math.sin(elapsed * speed);
      
      setTargetPosition({ x, y });
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  const handleClick = (e: React.MouseEvent) => {
    const clickX = e.clientX;
    const clickY = e.clientY;
    setLastClick({ x: clickX, y: clickY });
    
    // Calculate distance to moving target
    const distance = Math.sqrt(
      Math.pow(clickX - targetPosition.x, 2) + 
      Math.pow(clickY - targetPosition.y, 2)
    );
    
    if (distance < 30) { // Smaller target area
      navigate('/encrypted-gateway');
    } else {
      const hint = distance < 50 ? 'Almost there!' : 
                   distance < 100 ? 'Getting closer...' : 
                   'Follow the pattern...';
      setMessage(hint);
      setShowTarget(true);
      setTimeout(() => {
        setMessage('');
        setShowTarget(false);
      }, 1500);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-purple-900 to-black flex flex-col items-center justify-center p-4 relative cursor-crosshair"
      onClick={handleClick}
    >
      <Lock className="w-16 h-16 text-purple-400 mb-6" />
      <h1 className="text-3xl font-bold text-purple-300 mb-4">The Moving Gateway</h1>
      <p className="text-purple-200 max-w-md text-center mb-8">
        "Time and space dance in eternal motion. Catch the moment when paths align."
      </p>
      
      {/* Moving target */}
      <div 
        className="absolute transition-all duration-75 pointer-events-none"
        style={{ 
          left: `${targetPosition.x}px`, 
          top: `${targetPosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="relative">
          <Target className="w-8 h-8 text-purple-500/40" />
          <div className="absolute inset-0 w-8 h-8 border-2 border-purple-400/30 rounded-full animate-ping" />
        </div>
      </div>
      
      {showTarget && (
        <div 
          className="absolute transition-all duration-300"
          style={{ 
            left: `${lastClick.x}px`, 
            top: `${lastClick.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="w-2 h-2 bg-purple-500 rounded-full" />
        </div>
      )}
      
      {message && (
        <p className="text-purple-400 mt-4 animate-pulse text-xl">{message}</p>
      )}
      
      <div className="absolute bottom-4 text-purple-500 text-sm text-center">
        <p>Hint: The gateway never rests. Time your click carefully...</p>
        <p className="mt-2 text-purple-500/60">Watch the pattern, predict its path.</p>
      </div>
      
      {/* Subtle path indicator */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[200px] h-[200px] border border-purple-800/10 rounded-full" />
      </div>
    </div>
  );
};
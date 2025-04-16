import React from 'react';
import { Trophy } from 'lucide-react';

export const FinalLevel: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 to-orange-900 flex flex-col items-center justify-center p-4">
      <Trophy className="w-16 h-16 text-yellow-400 mb-6" />
      <h1 className="text-3xl font-bold text-yellow-300 mb-4">Congratulations!</h1>

      <div className="max-w-md w-full bg-yellow-950/50 p-8 rounded-lg shadow-xl text-center">
        <p className="text-yellow-200 text-lg mb-6">
          You've successfully completed all challenges!
        </p>
        <p className="text-yellow-100 text-base">
          Please contact an organizing committee member to claim your prize.
        </p>
        <p className="text-yellow-400 mt-4 font-semibold">
          📞 Call: +91-8639537069
        </p>
        <p className="text-yellow-600 text-sm mt-2 italic">
          (Or visit the help desk at the event venue)
        </p>
      </div>
    </div>
  );
};

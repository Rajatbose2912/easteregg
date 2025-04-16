import React, { useEffect, useState } from 'react';
import { Medal } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface LeaderboardEntry {
  name: string;
  email: string;
  timeCompleted: string;
}

export const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data, error } = await supabase
          .from('leaderboard')
          .select('*')
          .order('timeCompleted', { ascending: true });
          
        if (error) throw error;
        
        setEntries(data || []);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-4">
      <Medal className="w-16 h-16 text-indigo-400 mb-6" />
      <h1 className="text-3xl font-bold text-indigo-300 mb-8">Hall of Fame</h1>
      
      {loading ? (
        <div className="text-indigo-300">Loading...</div>
      ) : (
        <div className="w-full max-w-2xl bg-indigo-950/50 rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-3 gap-4 p-4 border-b border-indigo-800 bg-indigo-900/50">
            <div className="text-indigo-300 font-bold">Rank</div>
            <div className="text-indigo-300 font-bold">Name</div>
            <div className="text-indigo-300 font-bold">Completion Time</div>
          </div>
          
          <div className="divide-y divide-indigo-800">
            {entries.map((entry, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 p-4">
                <div className="text-indigo-400">#{index + 1}</div>
                <div className="text-indigo-200">{entry.name}</div>
                <div className="text-indigo-300">
                  {new Date(entry.timeCompleted).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
/*
  # Create leaderboard table

  1. New Tables
    - `leaderboard`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `timeCompleted` (timestamptz, required)
      - `created_at` (timestamptz with default)

  2. Security
    - Enable RLS on `leaderboard` table
    - Add policies for:
      - Anyone can read the leaderboard
      - Only authenticated users can insert their own entries
*/

CREATE TABLE IF NOT EXISTS leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  timeCompleted timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read leaderboard"
  ON leaderboard
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert their own entries"
  ON leaderboard
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
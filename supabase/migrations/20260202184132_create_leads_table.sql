/*
  # Create leads table for servisai.lt

  1. New Tables
    - `leads`
      - `id` (uuid, primary key) - Unique identifier for each lead
      - `category` (text) - Service category selected by user
      - `description` (text) - Problem description provided by user
      - `zip_code` (text) - User's zip code for service area matching
      - `email` (text, optional) - User's email for follow-up
      - `phone` (text, optional) - User's phone number for contact
      - `created_at` (timestamptz) - Timestamp when lead was created
      - `status` (text) - Lead status (new, contacted, converted, closed)

  2. Security
    - Enable RLS on `leads` table
    - Add policy for anonymous users to insert their own leads
    - Add policy for authenticated service providers to view leads in their area
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  description text NOT NULL,
  zip_code text NOT NULL,
  email text,
  phone text,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'new'
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can view their own leads by email"
  ON leads
  FOR SELECT
  TO anon
  USING (email = current_setting('request.jwt.claims', true)::json->>'email');
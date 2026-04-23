import { Client } from 'pg'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const setupProfiles = async () => {
  // Use DIRECT_URL for migrations/DDL
  const connectionString = process.env.DIRECT_URL?.split('?')[0]
  
  if (!connectionString) {
    console.error('Error: DIRECT_URL environment variable is not set.')
    process.exit(1)
  }

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  })

  try {
    await client.connect()
    console.log('Connected to database.')

    const sql = `
      -- 1. Create profiles table
      CREATE TABLE IF NOT EXISTS public.profiles (
        id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
        email TEXT NOT NULL,
        role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin'))
      );

      -- 2. Turn on Row Level Security
      ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

      -- 3. Allow users to read their own profile (avoid error if exists)
      DO $$
      BEGIN
          IF NOT EXISTS (
              SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view own profile'
          ) THEN
              CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
          END IF;
      END
      $$;

      -- 4. Function to handle new user registration
      CREATE OR REPLACE FUNCTION public.handle_new_user()
      RETURNS TRIGGER AS $$
      BEGIN
        INSERT INTO public.profiles (id, email, role)
        VALUES (NEW.id, NEW.email, 'user');
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;

      -- 5. Trigger to call the function after a new user is inserted into auth.users
      DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
      CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
    `

    console.log('Executing SQL to create profiles table and triggers...')
    await client.query(sql)
    console.log('✅ Profiles table, function, and trigger created successfully.')
    
  } catch (error) {
    console.error('❌ Error executing SQL:', error)
  } finally {
    await client.end()
  }
}

setupProfiles()

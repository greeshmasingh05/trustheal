-- Create profiles table for user medical data
CREATE TABLE public.profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT,
    age INTEGER,
    gender TEXT,
    height_cm DECIMAL,
    weight_kg DECIMAL,
    allergies TEXT[],
    past_diagnoses TEXT[],
    ongoing_medications TEXT,
    sleep_hours_avg DECIMAL,
    sleep_quality TEXT,
    smoking BOOLEAN DEFAULT FALSE,
    alcohol BOOLEAN DEFAULT FALSE,
    activity_level TEXT,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    decentralized_health_id TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create health_logs table for daily symptom tracking
CREATE TABLE public.health_logs (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    symptoms TEXT[] NOT NULL,
    severity INTEGER CHECK (severity >= 1 AND severity <= 10),
    notes TEXT,
    voice_transcript TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sleep_entries table for sleep tracking
CREATE TABLE public.sleep_entries (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    hours_slept DECIMAL NOT NULL,
    quality_rating TEXT NOT NULL,
    sleep_score INTEGER,
    logged_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id, logged_date)
);

-- Create doctor_access_keys table for blockchain-style access control
CREATE TABLE public.doctor_access_keys (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    access_key TEXT NOT NULL UNIQUE,
    key_hash TEXT NOT NULL,
    doctor_name TEXT,
    hospital_name TEXT,
    purpose TEXT,
    is_used BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    used_at TIMESTAMP WITH TIME ZONE
);

-- Create ai_health_reports table for storing AI analysis
CREATE TABLE public.ai_health_reports (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    health_risk_score INTEGER CHECK (health_risk_score >= 0 AND health_risk_score <= 100),
    urgency_level TEXT,
    recommended_doctor_type TEXT,
    reasoning TEXT,
    summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sleep_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctor_access_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_health_reports ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

-- Health logs RLS policies
CREATE POLICY "Users can view their own health logs" 
ON public.health_logs FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own health logs" 
ON public.health_logs FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own health logs" 
ON public.health_logs FOR DELETE 
USING (auth.uid() = user_id);

-- Sleep entries RLS policies
CREATE POLICY "Users can view their own sleep entries" 
ON public.sleep_entries FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sleep entries" 
ON public.sleep_entries FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sleep entries" 
ON public.sleep_entries FOR UPDATE 
USING (auth.uid() = user_id);

-- Doctor access keys RLS policies
CREATE POLICY "Users can view their own access keys" 
ON public.doctor_access_keys FOR SELECT 
USING (auth.uid() = patient_user_id);

CREATE POLICY "Users can create access keys for themselves" 
ON public.doctor_access_keys FOR INSERT 
WITH CHECK (auth.uid() = patient_user_id);

CREATE POLICY "Users can update their own access keys" 
ON public.doctor_access_keys FOR UPDATE 
USING (auth.uid() = patient_user_id);

-- AI health reports RLS policies
CREATE POLICY "Users can view their own AI reports" 
ON public.ai_health_reports FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own AI reports" 
ON public.ai_health_reports FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for profiles timestamp
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to generate decentralized health ID
CREATE OR REPLACE FUNCTION public.generate_health_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW.decentralized_health_id = 'DID-' || encode(gen_random_bytes(16), 'hex');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger to auto-generate health ID
CREATE TRIGGER generate_profile_health_id
BEFORE INSERT ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.generate_health_id();
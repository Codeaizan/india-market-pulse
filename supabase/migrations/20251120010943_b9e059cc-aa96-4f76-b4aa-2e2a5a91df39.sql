-- Create table to store Upstox access tokens
CREATE TABLE IF NOT EXISTS public.upstox_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.upstox_tokens ENABLE ROW LEVEL SECURITY;

-- Allow service role to manage tokens (used by edge functions)
CREATE POLICY "Service role can manage all tokens"
ON public.upstox_tokens
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_upstox_tokens_updated_at
BEFORE UPDATE ON public.upstox_tokens
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
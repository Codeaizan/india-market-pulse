import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MotionCard } from "@/components/MotionCard";
import { motionTheme } from "@/lib/motion-theme";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const UpstoxAuth = () => {
  const [authStatus, setAuthStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  // Client credentials - these should match what you configured in Upstox Developer Console
  const clientId = import.meta.env.VITE_UPSTOX_CLIENT_ID || 'YOUR_CLIENT_ID';
  const redirectUri = `${window.location.origin}/upstox-auth`;

  useEffect(() => {
    // Check if we have an authorization code in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
      setAuthStatus('error');
      setMessage(`Authorization failed: ${error}`);
      toast({
        title: "Authorization Failed",
        description: error,
        variant: "destructive",
      });
      return;
    }

    if (code) {
      handleAuthCallback(code);
    }
  }, []);

  const handleAuthCallback = async (code: string) => {
    setAuthStatus('processing');
    setMessage('Exchanging authorization code for access token...');

    try {
      const { data, error } = await supabase.functions.invoke('upstox-oauth', {
        body: { code },
      });

      if (error) throw error;

      if (data.success) {
        setAuthStatus('success');
        setMessage('Successfully authenticated with Upstox!');
        toast({
          title: "Authentication Successful",
          description: "You can now access real-time market data.",
        });

        // Redirect to home after 2 seconds
        setTimeout(() => navigate('/'), 2000);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Auth error:', err);
      setAuthStatus('error');
      setMessage(err instanceof Error ? err.message : 'Failed to authenticate');
      toast({
        title: "Authentication Error",
        description: "Please try again or check your credentials.",
        variant: "destructive",
      });
    }
  };

  const initiateAuth = () => {
    const authUrl = `https://api.upstox.com/v2/login/authorization/dialog?` +
      `response_type=code&` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}`;
    
    window.location.href = authUrl;
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={motionTheme.variants.stagger}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <motion.h1
        variants={motionTheme.variants.fadeIn}
        className="text-3xl font-bold"
      >
        Upstox Authentication
      </motion.h1>

      <motion.div variants={motionTheme.variants.fadeIn}>
        <MotionCard>
          <div className="p-6 space-y-6">
            {authStatus === 'idle' && (
              <>
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Connect to Upstox</h2>
                  <p className="text-muted-foreground">
                    To access real-time market data, you need to authenticate with Upstox.
                    Click the button below to start the OAuth flow.
                  </p>
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <h3 className="font-medium">What you'll need:</h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>An active Upstox account</li>
                      <li>API access enabled in your Upstox Developer Console</li>
                      <li>Your Client ID and Secret configured correctly</li>
                    </ul>
                  </div>
                </div>

                <Button onClick={initiateAuth} size="lg" className="w-full">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Authenticate with Upstox
                </Button>
              </>
            )}

            {authStatus === 'processing' && (
              <div className="text-center space-y-4 py-8">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                <p className="text-lg font-medium">{message}</p>
                <p className="text-sm text-muted-foreground">Please wait...</p>
              </div>
            )}

            {authStatus === 'success' && (
              <div className="text-center space-y-4 py-8">
                <CheckCircle className="h-12 w-12 mx-auto text-bull" />
                <p className="text-lg font-medium text-bull">{message}</p>
                <p className="text-sm text-muted-foreground">Redirecting to dashboard...</p>
              </div>
            )}

            {authStatus === 'error' && (
              <div className="space-y-4">
                <div className="text-center space-y-4 py-8">
                  <AlertCircle className="h-12 w-12 mx-auto text-bear" />
                  <p className="text-lg font-medium text-bear">Authentication Failed</p>
                  <p className="text-sm text-muted-foreground">{message}</p>
                </div>
                <Button onClick={initiateAuth} variant="outline" className="w-full">
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </MotionCard>
      </motion.div>

      <motion.div variants={motionTheme.variants.fadeIn}>
        <MotionCard>
          <div className="p-6 space-y-4">
            <h3 className="font-semibold">Setup Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Go to <a href="https://upstox.com/developer/apps" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Upstox Developer Console</a></li>
              <li>Create a new app or select an existing one</li>
              <li>Set the Redirect URI to: <code className="bg-muted px-2 py-1 rounded">{redirectUri}</code></li>
              <li>Copy your <strong>API Key</strong> (this is the Client ID) and <strong>API Secret</strong> (this is the Client Secret)</li>
              <li>Add them as secrets in Lovable Cloud:
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>UPSTOX_CLIENT_ID = Your API Key</li>
                  <li>UPSTOX_CLIENT_SECRET = Your API Secret</li>
                  <li>UPSTOX_REDIRECT_URI = {redirectUri}</li>
                </ul>
              </li>
            </ol>
          </div>
        </MotionCard>
      </motion.div>
    </motion.div>
  );
};

export default UpstoxAuth;

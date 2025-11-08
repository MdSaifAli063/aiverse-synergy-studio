import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: "Welcome back!",
          description: "Logged in successfully",
        });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: {
              full_name: fullName,
            },
          },
        });
        if (error) throw error;
        toast({
          title: "Account created!",
          description: "Welcome to AIverse Copilot",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-block p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm mb-4 animate-pulse-glow">
            <Sparkles className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-3 gradient-text">AIverse Copilot</h1>
          <p className="text-lg text-muted-foreground">Build with AI, Grow with AI</p>
        </div>

        {/* Auth Card */}
        <div className="glass-card p-8 md:p-10 rounded-3xl border-2 border-border/50 animate-fade-in shadow-2xl" style={{ animationDelay: '0.2s' }}>
          {/* Tab Switcher */}
          <div className="flex gap-3 mb-8 p-1 bg-muted/30 rounded-xl">
            <Button
              variant={isLogin ? "default" : "ghost"}
              onClick={() => setIsLogin(true)}
              className="flex-1 transition-all duration-300 rounded-lg"
            >
              Login
            </Button>
            <Button
              variant={!isLogin ? "default" : "ghost"}
              onClick={() => setIsLogin(false)}
              className="flex-1 transition-all duration-300 rounded-lg"
            >
              Sign Up
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="fullName" className="text-base font-medium">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={!isLogin}
                  className="h-12 rounded-xl border-2 focus:border-primary transition-colors duration-300"
                  placeholder="Enter your full name"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl border-2 focus:border-primary transition-colors duration-300"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 rounded-xl border-2 focus:border-primary transition-colors duration-300"
                minLength={6}
                placeholder="Enter your password"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300 glow-effect mt-8" 
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "Login to AIverse" : "Create Account"}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-muted-foreground text-sm mt-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          ✨ Join thousands of creators using AI
        </p>
      </div>
    </div>
  );
};

export default Auth;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Palette, Calendar, Code } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkAuth();
  }, [navigate]);

  const features = [
    { icon: Brain, text: "AI Learning Tutor" },
    { icon: Palette, text: "Creative Co-Creation" },
    { icon: Calendar, text: "Smart Productivity" },
    { icon: Code, text: "Code Review Assistant" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Hero Section */}
        <div className="mb-16 space-y-8 animate-fade-in">
          <div className="inline-block p-4 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm animate-float mb-6">
            <Sparkles className="w-24 h-24 mx-auto text-primary animate-pulse-glow" />
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text leading-tight">
            AIverse Copilot
          </h1>
          
          <div className="space-y-3">
            <p className="text-3xl md:text-4xl font-semibold text-foreground/90">
              Build with AI, Grow with AI
            </p>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Your universal Human + AI co-creation platform for the future
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass-card p-6 md:p-8 rounded-2xl hover:scale-105 transition-transform duration-300 border-2 border-border/30 hover:border-primary/50 animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 inline-block mb-4 group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors duration-300">
                  <Icon className="w-8 h-8 mx-auto text-primary" />
                </div>
                <p className="text-sm md:text-base font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="w-full md:w-auto px-16 py-7 text-xl font-semibold glow-effect animate-pulse-glow hover:scale-105 transition-transform duration-300 rounded-2xl"
          >
            Get Started Free
          </Button>
          
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/about")}
              className="gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-300"
            >
              About Team
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/impact")}
              className="gap-2 hover:bg-secondary/10 hover:text-secondary hover:border-secondary/50 transition-all duration-300"
            >
              Our Impact
            </Button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-muted-foreground animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <p className="text-lg">✨ Empowering humans through AI co-creation ✨</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

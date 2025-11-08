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
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 animate-float">
          <Sparkles className="w-20 h-20 mx-auto text-primary mb-4" />
          <h1 className="text-6xl font-bold mb-4 gradient-text">
            AIverse Copilot
          </h1>
          <p className="text-2xl text-muted-foreground mb-2">
            Build with AI, Grow with AI
          </p>
          <p className="text-lg text-muted-foreground">
            Your universal Human + AI co-creation platform
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass-card p-6 rounded-xl animate-in fade-in duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">{feature.text}</p>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="w-full md:w-auto px-12 text-lg glow-effect animate-pulse-glow"
          >
            Get Started
          </Button>
          
          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => navigate("/about")}
            >
              About Team
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/impact")}
            >
              Our Impact
            </Button>
          </div>
        </div>

        <footer className="mt-16 text-muted-foreground">
          <p>Empowering humans through AI co-creation</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Palette, Calendar, Code, ArrowRight, Zap, Star } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkAuth();
  }, [navigate]);

  const features = [
    { icon: Brain, text: "AI Learning Tutor", desc: "Personalized lessons that adapt to your pace", color: "from-blue-500 via-cyan-400 to-teal-400" },
    { icon: Palette, text: "Creative Co-Creation", desc: "Stories, poetry & art ideas powered by AI", color: "from-purple-500 via-pink-500 to-rose-400" },
    { icon: Calendar, text: "Smart Productivity", desc: "AI-driven task management & insights", color: "from-emerald-500 via-green-400 to-lime-400" },
    { icon: Code, text: "Code Review Assistant", desc: "Instant bug detection & refactoring", color: "from-orange-500 via-amber-400 to-yellow-400" },
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "50K+", label: "AI Sessions" },
    { value: "95%", label: "Satisfaction" },
    { value: "4.9★", label: "Rating" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[100px] animate-float-slow stagger-2" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-neon-pink/8 rounded-full blur-[80px] animate-float stagger-3" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center px-6 md:px-12 py-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary animate-pulse-glow">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold gradient-text">AIverse</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate("/about")} className="hidden md:inline-flex hover:text-primary transition-colors">
            About
          </Button>
          <Button variant="ghost" onClick={() => navigate("/impact")} className="hidden md:inline-flex hover:text-primary transition-colors">
            Impact
          </Button>
          <Button onClick={() => navigate("/auth")} className="rounded-full px-6 glow-effect hover:scale-105 transition-transform">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-slide-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card neon-border mb-8">
            <Zap className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-muted-foreground">Powered by Advanced AI</span>
            <Star className="w-3 h-3 text-accent" />
          </div>

          {/* Title */}
          <h1 className="animate-slide-up stagger-1 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] tracking-tight">
            <span className="gradient-text-warm">AIverse</span>{" "}
            <span className="text-foreground">Copilot</span>
          </h1>

          <p className="animate-slide-up stagger-2 text-xl md:text-2xl lg:text-3xl font-display font-semibold text-foreground/80 mb-4">
            Build with AI, Grow with AI
          </p>
          <p className="animate-slide-up stagger-3 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Your universal Human + AI co-creation platform. Enhance creativity, boost productivity, accelerate learning, and master coding — all in one place.
          </p>

          {/* CTA */}
          <div className="animate-slide-up stagger-4 flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="px-10 py-7 text-lg font-bold rounded-2xl glow-effect hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-secondary animate-gradient-shift"
            >
              Start Creating Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/impact")}
              className="px-8 py-7 text-lg rounded-2xl neon-border hover:bg-primary/10 transition-all duration-300"
            >
              See Our Impact
            </Button>
          </div>

          {/* Stats */}
          <div className="animate-slide-up stagger-5 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="glass-card rounded-2xl p-4 text-center">
                <p className="text-2xl md:text-3xl font-display font-bold gradient-text">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4 animate-slide-up">
            Four Modules, <span className="gradient-text">Infinite Possibilities</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 animate-slide-up stagger-1">
            Each module is designed for seamless human-AI collaboration
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group glass-card-hover p-7 rounded-3xl gradient-border cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                  onClick={() => navigate("/auth")}
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-5 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {feature.text}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 px-6 pb-12">
        <div className="max-w-3xl mx-auto glass-card rounded-3xl p-10 text-center neon-border animate-slide-up">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 gradient-text-warm">
            Ready to Co-Create with AI?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of creators, learners, and developers already using AIverse Copilot.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="px-10 py-6 text-lg font-bold rounded-2xl glow-effect hover:scale-105 transition-all"
          >
            Get Started — It's Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-10 text-center border-t border-border/30">
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <Button variant="link" onClick={() => navigate("/about")} className="text-muted-foreground hover:text-primary">About Team</Button>
          <Button variant="link" onClick={() => navigate("/impact")} className="text-muted-foreground hover:text-primary">Our Impact</Button>
        </div>
        <p className="text-muted-foreground text-sm">
          ✨ Empowering humans through AI co-creation ✨
        </p>
        <p className="text-muted-foreground/50 text-xs mt-2">© 2026 AIverse Copilot. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;

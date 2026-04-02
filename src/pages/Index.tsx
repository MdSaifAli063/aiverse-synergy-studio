import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Palette, Calendar, Code, ArrowRight, Zap, Star, Bot, Shield, Globe } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) navigate("/dashboard");
    };
    checkAuth();
  }, [navigate]);

  const features = [
    { icon: Brain, text: "Learning Companion", desc: "Personalized AI tutor that adapts to your learning style", color: "from-[hsl(25,100%,60%)] to-[hsl(45,100%,55%)]" },
    { icon: Palette, text: "Creative Studio", desc: "Co-create stories, poetry & art ideas with AI", color: "from-[hsl(340,85%,58%)] to-[hsl(310,80%,55%)]" },
    { icon: Calendar, text: "Productivity Hub", desc: "AI-driven task management & smart prioritization", color: "from-[hsl(165,80%,45%)] to-[hsl(145,70%,50%)]" },
    { icon: Code, text: "Coding Copilot", desc: "Instant code review, bug detection & refactoring", color: "from-[hsl(200,90%,50%)] to-[hsl(220,85%,55%)]" },
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "50K+", label: "AI Sessions" },
    { value: "95%", label: "Satisfaction" },
    { value: "4.9★", label: "Rating" },
  ];

  const highlights = [
    { icon: Bot, title: "Human-AI Synergy", desc: "AI that collaborates with you, not just for you" },
    { icon: Shield, title: "Private & Secure", desc: "Your data stays yours, always encrypted" },
    { icon: Globe, title: "Multi-Domain", desc: "Learn, create, organize, and code — all in one" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-neon-amber/8 rounded-full blur-[150px] animate-float-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-neon-mint/6 rounded-full blur-[120px] animate-float-slow stagger-2" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-neon-coral/5 rounded-full blur-[100px] animate-float stagger-3" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Nav */}
      <nav className="relative z-20 flex justify-between items-center px-6 md:px-12 py-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent animate-pulse-glow">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold gradient-text">AIverse</span>
        </div>
        <div className="flex items-center gap-3">
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
          <div className="animate-slide-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card neon-border mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Powered by Advanced AI</span>
            <Star className="w-3 h-3 text-accent" />
          </div>

          <h1 className="animate-slide-up stagger-1 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] tracking-tight">
            <span className="gradient-text">AIverse</span>{" "}
            <span className="text-foreground">Copilot</span>
          </h1>

          <p className="animate-slide-up stagger-2 text-xl md:text-2xl lg:text-3xl font-display font-semibold text-foreground/80 mb-4">
            Build with AI, Grow with AI
          </p>
          <p className="animate-slide-up stagger-3 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Your universal Human + AI co-creation platform. Enhance creativity, boost productivity, accelerate learning, and master coding.
          </p>

          <div className="animate-slide-up stagger-4 flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="px-10 py-7 text-lg font-bold rounded-2xl glow-effect hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-accent animate-gradient-shift"
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

          <div className="animate-slide-up stagger-5 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="glass-card rounded-2xl p-4 text-center">
                <p className="text-2xl md:text-3xl font-display font-bold gradient-text-warm">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <div key={i} className="glass-card p-6 rounded-2xl text-center animate-slide-up" style={{ animationDelay: `${0.1 * i}s` }}>
                <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-display text-base font-bold mb-1">{h.title}</h3>
                <p className="text-muted-foreground text-sm">{h.desc}</p>
              </div>
            );
          })}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group glass-card-hover p-7 rounded-2xl gradient-border cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                  onClick={() => navigate("/auth")}
                >
                  <div className={`inline-flex p-3.5 rounded-xl bg-gradient-to-br ${feature.color} mb-4 shadow-lg group-hover:scale-110 transition-all duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {feature.text}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
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
          <Button variant="link" onClick={() => navigate("/impact")} className="text-muted-foreground hover:text-primary">Our Impact</Button>
        </div>
        <p className="text-muted-foreground/50 text-xs">© 2026 AIverse Copilot. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;

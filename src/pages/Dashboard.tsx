import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Brain, Palette, Calendar, Code, LogOut, Sparkles, ArrowRight, Home, Send, Bot, User, Zap, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userName, setUserName] = useState("");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/auth"); return; }
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", session.user.id)
        .single();
      if (profile?.full_name) setUserName(profile.full_name);
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
    toast({ title: "Logged out", description: "See you soon!" });
  };

  const modules = [
    {
      title: "Learning",
      icon: Brain,
      description: "AI tutor adapts to your pace",
      path: "/learning",
      color: "bg-gradient-to-br from-[hsl(25,100%,60%)] to-[hsl(45,100%,55%)]",
      tag: "Tutor",
    },
    {
      title: "Creative",
      icon: Palette,
      description: "Co-create stories & poetry",
      path: "/creative",
      color: "bg-gradient-to-br from-[hsl(340,85%,58%)] to-[hsl(310,80%,55%)]",
      tag: "Studio",
    },
    {
      title: "Productivity",
      icon: Calendar,
      description: "Smart task & priority manager",
      path: "/productivity",
      color: "bg-gradient-to-br from-[hsl(165,80%,45%)] to-[hsl(145,70%,50%)]",
      tag: "Hub",
    },
    {
      title: "Coding",
      icon: Code,
      description: "Code review & bug detection",
      path: "/coding",
      color: "bg-gradient-to-br from-[hsl(200,90%,50%)] to-[hsl(220,85%,55%)]",
      tag: "Copilot",
    },
  ];

  const quickActions = [
    { text: "Explain quantum computing simply", icon: Brain, module: "/learning" },
    { text: "Write a poem about the ocean", icon: Palette, module: "/creative" },
    { text: "Plan my week efficiently", icon: Calendar, module: "/productivity" },
    { text: "Review my Python function", icon: Code, module: "/coding" },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[10%] w-[500px] h-[500px] bg-neon-amber/5 rounded-full blur-[150px] animate-float-slow" />
        <div className="absolute bottom-[-10%] right-[5%] w-[400px] h-[400px] bg-neon-mint/5 rounded-full blur-[120px] animate-float-slow stagger-3" />
        <div className="absolute top-[50%] left-[60%] w-[300px] h-[300px] bg-neon-coral/4 rounded-full blur-[100px] animate-float stagger-2" />
      </div>

      {/* Top Bar */}
      <header className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4 border-b border-border/40">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent animate-pulse-glow">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold gradient-text">AIverse Copilot</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1.5 text-muted-foreground hover:text-foreground">
            <Home className="w-4 h-4" />
            <span className="hidden md:inline">Home</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate("/impact")} className="gap-1.5 text-muted-foreground hover:text-foreground">
            <Zap className="w-4 h-4" />
            <span className="hidden md:inline">Impact</span>
          </Button>
          <Button onClick={handleLogout} variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-destructive">
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-16">
        <div className="w-full max-w-4xl mx-auto space-y-8">

          {/* Greeting */}
          <div className="text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 mb-4">
              <Bot className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold mb-3">
              Hello, <span className="gradient-text-warm">{userName || "Explorer"}</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              What would you like to create today?
            </p>
          </div>

          {/* Module Cards - ChatGPT style suggestion grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-slide-up stagger-1">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <button
                  key={module.path}
                  onClick={() => navigate(module.path)}
                  className="group glass-card-hover p-5 rounded-2xl text-left transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className={`inline-flex p-2.5 rounded-xl ${module.color} mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display text-sm font-bold mb-0.5 group-hover:text-primary transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {module.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Quick Action Prompts */}
          <div className="space-y-2 animate-slide-up stagger-2">
            <p className="text-xs text-muted-foreground text-center font-medium uppercase tracking-wider mb-3">
              Quick start prompts
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickActions.map((action, i) => {
                const Icon = action.icon;
                return (
                  <button
                    key={i}
                    onClick={() => navigate(action.module)}
                    className="group flex items-center gap-3 px-4 py-3.5 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-muted/30 transition-all duration-300 text-left"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {action.text}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 ml-auto text-muted-foreground/40 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat-like Input Bar */}
          <div className="animate-slide-up stagger-3">
            <div className="glass-card rounded-2xl p-1.5 neon-border flex items-center gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-3">
                <MessageSquare className="w-5 h-5 text-muted-foreground/50 shrink-0" />
                <span className="text-muted-foreground text-sm">Select a module above to start your AI session...</span>
              </div>
              <Button size="sm" className="rounded-xl px-4 py-5 glow-effect" disabled>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 border-t border-border/20">
        <p className="text-muted-foreground/40 text-xs">
          AIverse Copilot — Build with AI, Grow with AI
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;

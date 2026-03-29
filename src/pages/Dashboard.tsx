import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Brain, Palette, Calendar, Code, LogOut, Sparkles, ArrowRight, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userName, setUserName] = useState("");

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
      title: "Learning Companion",
      icon: Brain,
      description: "AI-powered personalized tutor that adapts to your pace and style",
      path: "/learning",
      gradient: "from-blue-500 via-cyan-400 to-teal-400",
      glow: "group-hover:shadow-[0_0_40px_hsla(190,100%,50%,0.2)]",
    },
    {
      title: "Creative Studio",
      icon: Palette,
      description: "Co-create stories, poetry & art ideas with intelligent AI",
      path: "/creative",
      gradient: "from-purple-500 via-pink-500 to-rose-400",
      glow: "group-hover:shadow-[0_0_40px_hsla(330,90%,60%,0.2)]",
    },
    {
      title: "Productivity Hub",
      icon: Calendar,
      description: "Smart task management with AI-driven priorities & motivation",
      path: "/productivity",
      gradient: "from-emerald-500 via-green-400 to-lime-400",
      glow: "group-hover:shadow-[0_0_40px_hsla(140,70%,50%,0.2)]",
    },
    {
      title: "Coding Copilot",
      icon: Code,
      description: "AI code review, bug detection & refactoring suggestions",
      path: "/coding",
      gradient: "from-orange-500 via-amber-400 to-yellow-400",
      glow: "group-hover:shadow-[0_0_40px_hsla(30,90%,50%,0.2)]",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[10%] w-[500px] h-[500px] bg-neon-purple/8 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[-10%] right-[5%] w-[400px] h-[400px] bg-neon-cyan/8 rounded-full blur-[100px] animate-float-slow stagger-3" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative z-10 p-4 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div className="flex items-center gap-3 animate-slide-up cursor-pointer" onClick={() => navigate("/")}>
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-secondary animate-pulse-glow">
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="font-display text-3xl font-bold gradient-text">AIverse Copilot</h1>
              </div>
              <div className="flex items-center gap-3 animate-slide-up stagger-1">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/")}
                  className="gap-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="gap-2 neon-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl neon-border animate-slide-up stagger-1">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Welcome back, <span className="gradient-text-warm">{userName || "Explorer"}</span>! 👋
              </h2>
              <p className="text-muted-foreground text-lg">
                Choose a module below to start your AI co-creation journey
              </p>
            </div>
          </header>

          {/* Module Cards */}
          <main className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <div
                    key={module.path}
                    className={`group glass-card-hover p-8 rounded-3xl cursor-pointer gradient-border animate-slide-up ${module.glow}`}
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                    onClick={() => navigate(module.path)}
                  >
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${module.gradient} mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {module.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {module.description}
                    </p>
                    <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                      Open Module <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Links */}
            <div className="flex flex-wrap gap-4 justify-center items-center animate-slide-up stagger-5 pt-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/about")}
                className="gap-2 neon-border hover:bg-primary/10 hover:text-primary transition-all duration-300 rounded-xl"
              >
                About Team
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/impact")}
                className="gap-2 neon-border hover:bg-secondary/10 hover:text-secondary transition-all duration-300 rounded-xl"
              >
                Our Impact
              </Button>
            </div>
          </main>

          <footer className="mt-16 text-center">
            <p className="text-muted-foreground/60 text-sm">
              ✨ Empowering humans through AI co-creation ✨
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

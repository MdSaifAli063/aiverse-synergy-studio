import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Brain, Palette, Calendar, Code, LogOut, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", session.user.id)
        .single();

      if (profile?.full_name) {
        setUserName(profile.full_name);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
    toast({
      title: "Logged out",
      description: "See you soon!",
    });
  };

  const modules = [
    {
      title: "Learning Companion",
      icon: Brain,
      description: "AI-powered personalized tutor",
      path: "/learning",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Creative Studio",
      icon: Palette,
      description: "Co-create stories and art with AI",
      path: "/creative",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Productivity Hub",
      icon: Calendar,
      description: "Smart planner with AI insights",
      path: "/productivity",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Coding Copilot",
      icon: Code,
      description: "AI code review and refactoring",
      path: "/coding",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary animate-pulse-glow">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold gradient-text">AIverse Copilot</h1>
            </div>
            <Button 
              onClick={handleLogout} 
              variant="outline"
              className="gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
          
          <div className="glass-card p-8 rounded-3xl animate-fade-in border-2 border-border/50">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Welcome back, {userName || "Explorer"}! 👋
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose a module to start your AI co-creation journey
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <div
                  key={module.path}
                  className="group glass-card p-8 rounded-3xl cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border-2 border-border/30 hover:border-primary/50 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(module.path)}
                >
                  <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${module.gradient} mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {module.title}
                  </h3>
                  <p className="text-base text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    {module.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Links */}
          <div className="flex flex-wrap gap-4 justify-center items-center animate-fade-in pt-6">
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
        </main>

        {/* Footer */}
        <footer className="mt-20 text-center">
          <p className="text-muted-foreground text-lg">
            ✨ Empowering humans through AI co-creation ✨
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
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
    <div className="min-h-screen p-6">
      <header className="max-w-7xl mx-auto mb-12">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold gradient-text">AIverse Copilot</h1>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
        
        <div className="glass-card p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">
            Welcome back, {userName || "Explorer"}! 👋
          </h2>
          <p className="text-muted-foreground">
            Choose a module to start your AI co-creation journey
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <div
                key={module.path}
                className="glass-card p-8 rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-float"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(module.path)}
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${module.gradient} mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{module.title}</h3>
                <p className="text-muted-foreground">{module.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center space-y-4">
          <Button
            variant="outline"
            onClick={() => navigate("/about")}
            className="mr-4"
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
      </main>

      <footer className="mt-16 text-center text-muted-foreground">
        <p>Empowering humans through AI co-creation</p>
      </footer>
    </div>
  );
};

export default Dashboard;
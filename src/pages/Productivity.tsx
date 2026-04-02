import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Calendar, Plus, Trash2, CheckCircle2, Sparkles, Circle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: string;
  title: string;
  priority: string;
  status: string;
  ai_suggestion: string | null;
}

const Productivity = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadTasks(); }, []);

  const loadTasks = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data, error } = await supabase.from("tasks").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      setTasks(data || []);
    } catch (error: any) {
      console.error("Error loading tasks:", error);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");
      const { data: aiData } = await supabase.functions.invoke("productivity-ai", { body: { task: newTask } });
      const { error } = await supabase.from("tasks").insert({
        user_id: session.user.id, title: newTask, priority: "medium", status: "pending",
        ai_suggestion: aiData?.suggestion || null,
      });
      if (error) throw error;
      setNewTask("");
      loadTasks();
      toast({ title: "Task added!", description: aiData?.suggestion ? "AI added a helpful tip!" : "Task created" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskStatus = async (taskId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "completed" ? "pending" : "completed";
      const { error } = await supabase.from("tasks").update({ status: newStatus }).eq("id", taskId);
      if (error) throw error;
      loadTasks();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", taskId);
      if (error) throw error;
      loadTasks();
      toast({ title: "Task deleted" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "default";
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[400px] h-[400px] bg-neon-mint/10 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute bottom-[-10%] right-[10%] w-[300px] h-[300px] bg-neon-coral/8 rounded-full blur-[80px] animate-float-slow stagger-2" />
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-6 gap-2 text-muted-foreground hover:text-foreground animate-slide-up">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Button>

          <div className="glass-card p-8 rounded-3xl neon-border mb-6 animate-slide-up stagger-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 via-green-400 to-lime-400 shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold">Productivity Hub</h1>
                <p className="text-muted-foreground">Smart planner with AI insights</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task..."
                className="h-12 rounded-xl bg-muted/20 border-border/50 focus:border-primary flex-1"
                onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
              />
              <Button onClick={handleAddTask} disabled={loading} className="h-12 px-5 rounded-xl glow-effect">
                {loading ? <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <Plus className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className="glass-card p-5 rounded-2xl neon-border animate-slide-up"
                style={{ animationDelay: `${0.05 * index}s` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <button onClick={() => toggleTaskStatus(task.id, task.status)} className="hover:scale-110 transition-transform">
                        {task.status === "completed" ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-400/20" />
                        ) : (
                          <Circle className="w-6 h-6 text-muted-foreground" />
                        )}
                      </button>
                      <span className={`text-base font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
                        {task.title}
                      </span>
                      <Badge variant={getPriorityColor(task.priority)} className="text-xs">{task.priority}</Badge>
                    </div>
                    {task.ai_suggestion && (
                      <div className="ml-9 p-3 rounded-xl bg-primary/5 border border-primary/15">
                        <div className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <p className="text-sm text-muted-foreground">{task.ai_suggestion}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)} className="text-muted-foreground hover:text-destructive shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {tasks.length === 0 && (
            <div className="text-center py-16 animate-slide-up stagger-2">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-muted-foreground text-lg">No tasks yet</p>
              <p className="text-muted-foreground/60 text-sm mt-1">Add your first task to get AI-powered suggestions!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Productivity;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Code, Sparkles, Terminal, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Coding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    if (!code.trim()) {
      toast({ title: "Error", description: "Please paste some code to review", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("coding-ai", { body: { code } });
      if (error) throw error;
      setFeedback(data.feedback);
      toast({ title: "Review Complete!", description: "AI has analyzed your code" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-amber-500/8 rounded-full blur-[80px] animate-float-slow stagger-2" />
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-6 gap-2 text-muted-foreground hover:text-foreground animate-slide-up">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Button>

          <div className="glass-card p-8 rounded-3xl neon-border mb-6 animate-slide-up stagger-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-400 shadow-lg">
                <Code className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold">Coding Copilot</h1>
                <p className="text-muted-foreground">AI code review and refactoring</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                  <Terminal className="w-4 h-4" /> Paste Your Code
                </label>
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="// Paste your Python or JavaScript code here..."
                  className="min-h-[400px] font-mono text-sm rounded-xl bg-muted/10 border-border/30 focus:border-primary"
                />
                <Button onClick={handleReview} disabled={loading} className="w-full mt-4 h-12 rounded-xl glow-effect hover:scale-[1.02] transition-all text-base font-semibold" size="lg">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Analyzing...
                    </span>
                  ) : (
                    <><Sparkles className="w-4 h-4 mr-2" /> Refactor with AI</>
                  )}
                </Button>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                  <Lightbulb className="w-4 h-4" /> AI Feedback
                </label>
                <div className="glass-card p-6 rounded-2xl min-h-[400px] border border-border/20">
                  {feedback ? (
                    <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed text-foreground/90 animate-fade-in">{feedback}</pre>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground/40 gap-3">
                      <Code className="w-12 h-12" />
                      <p className="text-sm">AI feedback will appear here...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl neon-border animate-slide-up stagger-2">
            <h3 className="font-display font-bold mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-primary" /> Tips for Best Results
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> Paste clean, formatted code</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" /> Include relevant context in comments</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" /> Focus on small functions or blocks</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-neon-cyan shrink-0" /> Works with Python, JS, and more!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coding;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Brain, Sparkles, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Learning = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [topic, setTopic] = useState("");
  const [explanation, setExplanation] = useState("");
  const [quiz, setQuiz] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLearn = async () => {
    if (!topic.trim()) {
      toast({ title: "Error", description: "Please enter a topic to learn", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("learning-ai", { body: { topic, type: "explain" } });
      if (error) throw error;
      setExplanation(data.explanation);
      setQuiz(data.quiz || []);
      toast({ title: "Success!", description: "AI has generated your lesson" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-neon-amber/10 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-neon-mint/8 rounded-full blur-[80px] animate-float-slow stagger-2" />
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-6 gap-2 text-muted-foreground hover:text-foreground animate-slide-up">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Button>

          <div className="glass-card p-8 rounded-3xl neon-border mb-6 animate-slide-up stagger-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-400 to-teal-400 shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold">Learning Companion</h1>
                <p className="text-muted-foreground">Your AI-powered personal tutor</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  <BookOpen className="w-4 h-4 inline mr-1" /> What would you like to learn?
                </label>
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Quantum Physics, Machine Learning, History of Rome..."
                  className="h-12 text-base rounded-xl bg-muted/20 border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/30"
                  onKeyDown={(e) => e.key === "Enter" && handleLearn()}
                />
              </div>

              <Button onClick={handleLearn} disabled={loading} className="w-full h-12 rounded-xl glow-effect hover:scale-[1.02] transition-all text-base font-semibold" size="lg">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Generating...
                  </span>
                ) : (
                  <><Sparkles className="w-4 h-4 mr-2" /> Learn with AI</>
                )}
              </Button>
            </div>
          </div>

          {explanation && (
            <div className="glass-card p-8 rounded-3xl neon-border mb-6 animate-scale-in">
              <h2 className="font-display text-2xl font-bold mb-4 gradient-text">AI Explanation</h2>
              <Textarea value={explanation} readOnly className="min-h-[200px] text-base leading-relaxed rounded-xl bg-muted/10 border-border/30" />
            </div>
          )}

          {quiz.length > 0 && (
            <div className="glass-card p-8 rounded-3xl neon-border animate-scale-in">
              <h2 className="font-display text-2xl font-bold mb-4 gradient-text">Quick Quiz</h2>
              <div className="space-y-4">
                {quiz.map((q, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-muted/10 border border-border/20">
                    <p className="font-semibold mb-3">{idx + 1}. {q.question}</p>
                    <div className="space-y-2 ml-4">
                      {q.options?.map((opt: string, optIdx: number) => (
                        <div key={optIdx} className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors py-1">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold mr-2">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Learning;

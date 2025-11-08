import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Brain, Sparkles } from "lucide-react";
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
      toast({
        title: "Error",
        description: "Please enter a topic to learn",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("learning-ai", {
        body: { topic, type: "explain" },
      });

      if (error) throw error;

      setExplanation(data.explanation);
      setQuiz(data.quiz || []);
      
      toast({
        title: "Success!",
        description: "AI has generated your lesson",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="glass-card p-8 rounded-2xl mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Learning Companion</h1>
              <p className="text-muted-foreground">Your AI-powered personal tutor</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                What would you like to learn today?
              </label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Quantum Physics, Machine Learning, History of Rome..."
                className="text-lg"
              />
            </div>

            <Button
              onClick={handleLearn}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>Processing...</>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Learn with AI
                </>
              )}
            </Button>
          </div>
        </div>

        {explanation && (
          <div className="glass-card p-8 rounded-2xl mb-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold mb-4">AI Explanation</h2>
            <Textarea
              value={explanation}
              readOnly
              className="min-h-[200px] text-base leading-relaxed"
            />
          </div>
        )}

        {quiz.length > 0 && (
          <div className="glass-card p-8 rounded-2xl animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold mb-4">Quick Quiz</h2>
            <div className="space-y-4">
              {quiz.map((q, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-muted/20">
                  <p className="font-semibold mb-2">
                    {idx + 1}. {q.question}
                  </p>
                  <div className="space-y-2 ml-4">
                    {q.options?.map((opt: string, optIdx: number) => (
                      <div key={optIdx} className="text-muted-foreground">
                        {String.fromCharCode(65 + optIdx)}. {opt}
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
  );
};

export default Learning;
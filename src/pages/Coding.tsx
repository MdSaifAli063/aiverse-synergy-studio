import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Code, Sparkles } from "lucide-react";
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
      toast({
        title: "Error",
        description: "Please paste some code to review",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("coding-ai", {
        body: { code },
      });

      if (error) throw error;

      setFeedback(data.feedback);
      
      toast({
        title: "Review Complete!",
        description: "AI has analyzed your code",
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
      <div className="max-w-6xl mx-auto">
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
            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Coding Copilot</h1>
              <p className="text-muted-foreground">AI code review and refactoring</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Paste Your Code
              </label>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Paste your Python or JavaScript code here..."
                className="min-h-[400px] font-mono text-sm"
              />
              <Button
                onClick={handleReview}
                disabled={loading}
                className="w-full mt-4"
                size="lg"
              >
                {loading ? (
                  <>Analyzing...</>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Review with AI
                  </>
                )}
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                AI Feedback
              </label>
              <div className="glass-card p-6 rounded-xl min-h-[400px]">
                {feedback ? (
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-sm">
                      {feedback}
                    </pre>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p>AI feedback will appear here...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <h3 className="font-bold mb-2">Tips for Best Results:</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Paste clean, formatted code for better analysis</li>
            <li>Include relevant context in comments</li>
            <li>Focus on small functions or code blocks</li>
            <li>AI can help with Python, JavaScript, and more!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Coding;
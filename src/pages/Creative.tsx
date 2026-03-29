import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Palette, Sparkles, Download, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Creative = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [workType, setWorkType] = useState<"story" | "poetry" | "art_idea">("story");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!prompt.trim()) {
      toast({ title: "Error", description: "Please enter a creative prompt", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("creative-ai", { body: { prompt, workType } });
      if (error) throw error;
      setResult(data.content);
      toast({ title: "Created!", description: "Your creative work is ready" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!result) return;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");
      const { error } = await supabase.from("creative_works").insert({
        user_id: session.user.id, title: prompt.slice(0, 100), content: result, work_type: workType,
      });
      if (error) throw error;
      toast({ title: "Saved!", description: "Your work has been saved" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[300px] h-[300px] bg-pink-500/8 rounded-full blur-[80px] animate-float-slow stagger-2" />
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-6 gap-2 text-muted-foreground hover:text-foreground animate-slide-up">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Button>

          <div className="glass-card p-8 rounded-3xl neon-border mb-6 animate-slide-up stagger-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-400 shadow-lg">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold">Creative Studio</h1>
                <p className="text-muted-foreground">Co-create with AI</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Creation Type</label>
                <Select value={workType} onValueChange={(v: any) => setWorkType(v)}>
                  <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="story">📖 Story</SelectItem>
                    <SelectItem value="poetry">🎭 Poetry</SelectItem>
                    <SelectItem value="art_idea">🎨 Art Idea</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Your Creative Prompt</label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., A story about a robot discovering emotions..."
                  className="min-h-[100px] rounded-xl bg-muted/20 border-border/50 focus:border-primary"
                />
              </div>

              <Button onClick={handleCreate} disabled={loading} className="w-full h-12 rounded-xl glow-effect hover:scale-[1.02] transition-all text-base font-semibold" size="lg">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Creating...
                  </span>
                ) : (
                  <><Sparkles className="w-4 h-4 mr-2" /> Create with AI</>
                )}
              </Button>
            </div>
          </div>

          {result && (
            <div className="glass-card p-8 rounded-3xl neon-border animate-scale-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-display text-2xl font-bold gradient-text">Your Creation</h2>
                <div className="flex gap-2">
                  <Button onClick={handleSave} variant="outline" size="sm" className="gap-2 neon-border rounded-lg">
                    <Save className="w-4 h-4" /> Save
                  </Button>
                  <Button
                    onClick={() => {
                      const blob = new Blob([result], { type: "text/plain" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `${workType}-${Date.now()}.txt`;
                      a.click();
                    }}
                    variant="outline"
                    size="sm"
                    className="gap-2 neon-border rounded-lg"
                  >
                    <Download className="w-4 h-4" /> Download
                  </Button>
                </div>
              </div>
              <Textarea value={result} readOnly className="min-h-[400px] text-base leading-relaxed rounded-xl bg-muted/10 border-border/30" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Creative;

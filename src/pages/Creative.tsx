import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Palette, Sparkles, Download } from "lucide-react";
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
      toast({
        title: "Error",
        description: "Please enter a creative prompt",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("creative-ai", {
        body: { prompt, workType },
      });

      if (error) throw error;

      setResult(data.content);
      
      toast({
        title: "Created!",
        description: "Your creative work is ready",
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

  const handleSave = async () => {
    if (!result) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const { error } = await supabase.from("creative_works").insert({
        user_id: session.user.id,
        title: prompt.slice(0, 100),
        content: result,
        work_type: workType,
      });

      if (error) throw error;

      toast({
        title: "Saved!",
        description: "Your work has been saved",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
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
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Creative Studio</h1>
              <p className="text-muted-foreground">Co-create with AI</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                What would you like to create?
              </label>
              <Select value={workType} onValueChange={(v: any) => setWorkType(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="story">Story</SelectItem>
                  <SelectItem value="poetry">Poetry</SelectItem>
                  <SelectItem value="art_idea">Art Idea</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Your Creative Prompt
              </label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A story about a robot discovering emotions..."
                className="min-h-[100px]"
              />
            </div>

            <Button
              onClick={handleCreate}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>Processing...</>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create with AI
                </>
              )}
            </Button>
          </div>
        </div>

        {result && (
          <div className="glass-card p-8 rounded-2xl animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Your Creation</h2>
              <div className="space-x-2">
                <Button onClick={handleSave} variant="outline" size="sm">
                  Save
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
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <Textarea
              value={result}
              readOnly
              className="min-h-[400px] text-base leading-relaxed"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Creative;
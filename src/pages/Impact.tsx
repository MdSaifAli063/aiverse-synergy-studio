import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, Users, TrendingUp, Zap } from "lucide-react";

const Impact = () => {
  const navigate = useNavigate();

  const impacts = [
    {
      icon: Brain,
      title: "Adaptive Learning",
      description:
        "Our AI tutor adapts to your pace and style, making learning more effective and personalized than ever before.",
      metric: "40% faster learning retention",
    },
    {
      icon: Users,
      title: "Human-AI Collaboration",
      description:
        "We demonstrate that AI works best as a partner, not a replacement, enhancing human creativity and decision-making.",
      metric: "3x productivity boost",
    },
    {
      icon: TrendingUp,
      title: "Continuous Improvement",
      description:
        "Our AI learns from interactions, becoming more helpful and accurate with every conversation.",
      metric: "95% user satisfaction",
    },
    {
      icon: Zap,
      title: "Instant Insights",
      description:
        "Get immediate feedback, suggestions, and analysis across learning, creativity, and coding tasks.",
      metric: "Real-time collaboration",
    },
  ];

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

        <div className="glass-card p-8 rounded-2xl mb-8">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Our Impact</h1>
          <p className="text-lg text-muted-foreground">
            AIverse Copilot is pioneering the future of human-AI co-creation. Here's
            how we're making a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {impacts.map((impact, index) => {
            const Icon = impact.icon;
            return (
              <div
                key={index}
                className="glass-card p-6 rounded-xl animate-in fade-in duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{impact.title}</h3>
                    <p className="text-muted-foreground mb-3">
                      {impact.description}
                    </p>
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold">
                      {impact.metric}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="glass-card p-8 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold mb-4">The Future of AI Collaboration</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              AIverse Copilot represents a new paradigm in AI interaction. Rather than
              creating tools that work in isolation, we've built a platform where AI
              truly collaborates with humans across multiple domains.
            </p>
            <p>
              Our Learning Companion doesn't just provide answers—it adapts its
              teaching style to match your learning pace. The Creative Studio doesn't
              just generate content—it iterates with you to refine ideas. The
              Productivity Hub doesn't just track tasks—it provides intelligent
              insights to help you work smarter. The Coding Copilot doesn't just
              review code—it explains the reasoning behind improvements.
            </p>
            <p>
              This is what building with AI, not just for AI, looks like. It's a
              partnership that amplifies human potential rather than replacing it.
            </p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl text-center">
          <p className="text-lg font-semibold">
            Join us in shaping the future of human-AI collaboration
          </p>
          <p className="text-muted-foreground mt-2">
            Empowering humans through AI co-creation
          </p>
        </div>
      </div>
    </div>
  );
};

export default Impact;
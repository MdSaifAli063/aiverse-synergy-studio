import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, Users, TrendingUp, Zap, Sparkles } from "lucide-react";

const Impact = () => {
  const navigate = useNavigate();

  const impacts = [
    { icon: Brain, title: "Adaptive Learning", description: "Our AI tutor adapts to your pace and style, making learning more effective and personalized than ever before.", metric: "40% faster learning", gradient: "from-[hsl(25,100%,60%)] to-[hsl(45,100%,55%)]" },
    { icon: Users, title: "Human-AI Collaboration", description: "We demonstrate that AI works best as a partner, not a replacement, enhancing human creativity and decision-making.", metric: "3x productivity boost", gradient: "from-[hsl(340,85%,58%)] to-[hsl(310,80%,55%)]" },
    { icon: TrendingUp, title: "Continuous Improvement", description: "Our AI learns from interactions, becoming more helpful and accurate with every conversation.", metric: "95% user satisfaction", gradient: "from-[hsl(165,80%,45%)] to-[hsl(145,70%,50%)]" },
    { icon: Zap, title: "Instant Insights", description: "Get immediate feedback, suggestions, and analysis across learning, creativity, and coding tasks.", metric: "Real-time collaboration", gradient: "from-[hsl(200,90%,50%)] to-[hsl(220,85%,55%)]" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[400px] h-[400px] bg-neon-purple/8 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute bottom-[-10%] right-[20%] w-[300px] h-[300px] bg-neon-cyan/8 rounded-full blur-[80px] animate-float-slow stagger-2" />
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <Button variant="ghost" onClick={() => navigate(-1 as any)} className="mb-6 gap-2 text-muted-foreground hover:text-foreground animate-slide-up">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>

          <div className="glass-card p-8 rounded-3xl neon-border mb-8 animate-slide-up stagger-1">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 gradient-text-warm">Our Impact</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              AIverse Copilot is pioneering the future of human-AI co-creation. Here's how we're making a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {impacts.map((impact, index) => {
              const Icon = impact.icon;
              return (
                <div
                  key={index}
                  className="glass-card-hover p-7 rounded-3xl gradient-border animate-slide-up"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${impact.gradient} shadow-lg shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold mb-2">{impact.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">{impact.description}</p>
                      <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                        {impact.metric}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="glass-card p-8 rounded-3xl neon-border mb-8 animate-slide-up stagger-4">
            <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" /> The Future of AI Collaboration
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
              <p>
                AIverse Copilot represents a new paradigm in AI interaction. Rather than creating tools that work in isolation, we've built a platform where AI truly collaborates with humans across multiple domains.
              </p>
              <p>
                Our Learning Companion adapts its teaching style. The Creative Studio iterates with you. The Productivity Hub provides intelligent insights. The Coding Copilot explains the reasoning behind improvements.
              </p>
              <p className="text-foreground/80 font-medium">
                This is what building with AI, not just for AI, looks like — a partnership that amplifies human potential.
              </p>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl neon-border text-center animate-slide-up stagger-5">
            <p className="font-display text-xl font-bold gradient-text mb-2">
              Join us in shaping the future
            </p>
            <p className="text-muted-foreground text-sm">
              ✨ Empowering humans through AI co-creation ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impact;

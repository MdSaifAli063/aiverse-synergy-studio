import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Linkedin, Mail, Sparkles } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  const team = [
    { name: "Alex Chen", role: "AI Engineering Lead", bio: "Specializes in machine learning and natural language processing", emoji: "🧠" },
    { name: "Sarah Johnson", role: "Full-Stack Developer", bio: "Builds seamless experiences connecting frontend and backend", emoji: "💻" },
    { name: "Michael Rodriguez", role: "UX/UI Designer", bio: "Creates intuitive interfaces for AI-human collaboration", emoji: "🎨" },
    { name: "Emily Zhang", role: "Product Manager", bio: "Guides vision and ensures user-centric development", emoji: "🚀" },
  ];

  const gradients = [
    "from-blue-500 to-cyan-400",
    "from-purple-500 to-pink-400",
    "from-emerald-500 to-lime-400",
    "from-orange-500 to-amber-400",
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[400px] h-[400px] bg-neon-purple/8 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute bottom-[-10%] left-[10%] w-[300px] h-[300px] bg-neon-cyan/8 rounded-full blur-[80px] animate-float-slow stagger-2" />
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <Button variant="ghost" onClick={() => navigate(-1 as any)} className="mb-6 gap-2 text-muted-foreground hover:text-foreground animate-slide-up">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>

          <div className="glass-card p-8 rounded-3xl neon-border mb-8 animate-slide-up stagger-1">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 gradient-text-warm">Meet Our Team</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              We're passionate about bridging the gap between humans and AI, creating tools that empower creativity, learning, and productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="glass-card-hover p-7 rounded-3xl gradient-border animate-slide-up"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center text-2xl font-bold shadow-lg shrink-0`}>
                    {member.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold">{member.name}</h3>
                    <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                    <div className="flex gap-1 mt-4">
                      {[Github, Linkedin, Mail].map((Icon, i) => (
                        <Button key={i} size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-primary transition-colors">
                          <Icon className="w-4 h-4" />
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card p-8 rounded-3xl neon-border animate-slide-up stagger-5">
            <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" /> Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              At AIverse Copilot, we believe AI should enhance human creativity and productivity, not replace it. Our platform demonstrates how AI can work alongside humans as a collaborator, adapting to individual learning styles, creative processes, and work habits. We're committed to making AI accessible, understandable, and beneficial for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

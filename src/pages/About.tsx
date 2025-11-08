import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Linkedin, Mail } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  const team = [
    {
      name: "Alex Chen",
      role: "AI Engineering Lead",
      bio: "Specializes in machine learning and natural language processing",
    },
    {
      name: "Sarah Johnson",
      role: "Full-Stack Developer",
      bio: "Builds seamless experiences connecting frontend and backend",
    },
    {
      name: "Michael Rodriguez",
      role: "UX/UI Designer",
      bio: "Creates intuitive interfaces for AI-human collaboration",
    },
    {
      name: "Emily Zhang",
      role: "Product Manager",
      bio: "Guides vision and ensures user-centric development",
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
          <h1 className="text-4xl font-bold mb-4 gradient-text">Meet Our Team</h1>
          <p className="text-lg text-muted-foreground">
            We're passionate about bridging the gap between humans and AI, creating
            tools that empower creativity, learning, and productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="glass-card p-6 rounded-xl animate-in fade-in duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold">
                  {member.name[0]}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Github className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Mail className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card p-8 rounded-2xl mt-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            At AIverse Copilot, we believe AI should enhance human creativity and
            productivity, not replace it. Our platform demonstrates how AI can work
            alongside humans as a collaborator, adapting to individual learning
            styles, creative processes, and work habits. We're committed to making
            AI accessible, understandable, and beneficial for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
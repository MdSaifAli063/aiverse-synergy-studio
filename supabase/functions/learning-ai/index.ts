import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, type } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const systemPrompt = `You are an adaptive AI tutor. Explain concepts clearly and create engaging mini-quizzes. 
    Adapt your teaching style to be friendly, clear, and encourage learning.`;

    let userPrompt = "";
    if (type === "explain") {
      userPrompt = `Explain the topic "${topic}" in a clear, engaging way. 
      Then create 3 multiple-choice quiz questions to test understanding. 
      Format: First provide the explanation, then output the quiz in JSON format:
      {"quiz": [{"question": "...", "options": ["A", "B", "C", "D"], "correct": "A"}]}`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("AI gateway error:", error);
      throw new Error("AI request failed");
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse explanation and quiz
    const parts = content.split("```json");
    const explanation = parts[0].trim();
    
    let quiz = [];
    if (parts[1]) {
      try {
        const jsonMatch = parts[1].match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          quiz = parsed.quiz || [];
        }
      } catch (e) {
        console.error("Quiz parsing error:", e);
      }
    }

    return new Response(
      JSON.stringify({ explanation, quiz }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
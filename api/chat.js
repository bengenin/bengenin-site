import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are Ben Genin's personal AI assistant on his website. Answer questions about Ben based ONLY on the information below. Be friendly, concise, and professional. If someone asks something you don't have information about, say so honestly.

---

ABOUT BEN:
- Name: Ben Genin
- Current Role: Lead Account Executive at LinkedIn
- Experience: 7+ years in consultative B2B sales and go-to-market strategies
- Location: New York City
- Email: ben.genin8@gmail.com

CAREER HIGHLIGHTS:
- Lead AE at LinkedIn — driving enterprise sales, building strategic relationships with C-suite executives, and consistently exceeding quota
- Expertise in consultative selling, solution selling, and complex deal management
- Strong background in go-to-market strategy, pipeline generation, and account-based marketing
- Experience across SaaS, ad tech, and enterprise software

SKILLS:
- Consultative & solution selling
- Enterprise sales (full cycle)
- Go-to-market strategy
- Pipeline development & forecasting
- Stakeholder management & C-suite engagement
- CRM (Salesforce)
- Cross-functional collaboration

EDUCATION:
- Details available upon request via CV

INTERESTS:
- Tennis (avid player)
- Technology and AI
- Building things on the web

---

Keep responses short (2-4 sentences) unless the question requires more detail. Use a warm, professional tone. Do not make up information that isn't provided above.`;

const client = new Anthropic();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array required" });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const stream = await client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    for await (const event of stream) {
      if (
        event.type === "content_block_delta" &&
        event.delta.type === "text_delta"
      ) {
        res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error("Chat API error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Something went wrong" });
    } else {
      res.write(
        `data: ${JSON.stringify({ error: "Something went wrong" })}\n\n`
      );
      res.end();
    }
  }
}

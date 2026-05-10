import { CPF_KNOWLEDGE_BASE } from "@/app/lib/knowledge";

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "No API key" }), { status: 500 });
  }

  let messages;
  try {
    const body = await req.json();
    messages = body.messages;
  } catch {
    return new Response(JSON.stringify({ error: "Bad request" }), { status: 400 });
  }

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "No messages" }), { status: 400 });
  }

  // Non-streaming — simpler and more reliable
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: CPF_KNOWLEDGE_BASE,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Anthropic error:", response.status, errorText);
    return new Response(
      JSON.stringify({ error: `Anthropic ${response.status}: ${errorText}` }),
      { status: 502 }
    );
  }

  const data = await response.json();
  const text = data.content?.[0]?.text ?? "";
  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

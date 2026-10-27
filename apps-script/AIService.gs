/**
 * AIService — provider abstraction
 * API keys must live in Script Properties, never in frontend.
 */

function aiAssist(payload) {
  const provider = payload.provider || PropertiesService.getScriptProperties().getProperty("AI_PROVIDER_DEFAULT") || "grok";
  const prompt = payload.prompt || "";
  const context = payload.context || {};

  const forbidden = ["approve audit", "issue opinion", "delete document", "change figure"];
  if (forbidden.some(f => prompt.toLowerCase().includes(f))) {
    return {
      answer: "I am not permitted to approve audits, issue opinions, or modify evidence. Please rephrase your request for assistance only.",
      provider: provider,
      safety: true
    };
  }

  return {
    answer: "AI response would be generated here using " + provider + " with the provided context. Always label as AI-generated assistance requiring professional review.",
    provider: provider,
    sources: context.documentIds || []
  };
}

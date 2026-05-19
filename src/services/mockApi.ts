// Mock API service — swap with FastAPI calls later.
export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function chatWithMentor(prompt: string): Promise<string> {
  await delay(600);
  const lower = prompt.toLowerCase();
  if (lower.includes("dsa") || lower.includes("array"))
    return `Great question! Here's a structured approach:\n\n1. **Identify the pattern** — most array problems map to *two pointers*, *sliding window*, or *prefix sums*.\n2. **Edge cases first** — empty array, single element, duplicates.\n3. **Optimize** — start with brute force, then reduce time/space.\n\nWant me to generate a focused 7-day roadmap for arrays?`;
  if (lower.includes("resume"))
    return `Upload your resume on the **Resume Analyzer** page and I'll extract skills, run an ATS scan, and suggest 3 high-impact edits. Tip: lead bullets with a verb + metric.`;
  if (lower.includes("interview"))
    return `For an upcoming interview, I recommend:\n\n- 30 min DSA warm-up (mediums)\n- 20 min behavioral STAR review\n- 10 min company-specific research\n\nReady for a mock? Head to **Mock Interview**.`;
  return `Here's how I'd approach **"${prompt}"** — break it into atomic skills, attach a measurable goal to each, then ship a small project. Want me to generate a tailored plan?`;
}

export async function analyzeResume(file: File) {
  await delay(1400);
  return {
    fileName: file.name,
    atsScore: 78,
    skills: ["Python", "PyTorch", "FastAPI", "Docker", "SQL", "React", "Pandas"],
    strengths: [
      "Strong ML project portfolio with measurable outcomes",
      "Production deployment experience (Docker + AWS)",
      "Clear quantified impact in bullet points",
    ],
    weaknesses: [
      "Missing system design exposure",
      "No mention of distributed training",
      "Limited open-source contributions",
    ],
    missing: ["Kubernetes", "Kafka", "System Design", "LeetCode Profile"],
    recommendations: [
      "Add a 'Selected Projects' section with metrics",
      "Include a link to GitHub & LeetCode in header",
      "Quantify model performance (accuracy, latency, throughput)",
    ],
  };
}

export interface MockQuestion {
  id: number;
  type: string;
  question: string;
}

export async function generateInterviewQuestions(track: string): Promise<MockQuestion[]> {
  await delay(800);
  const banks: Record<string, string[]> = {
    Technical: [
      "Walk me through the architecture of a project you're proud of.",
      "How would you design a rate limiter for an API gateway?",
      "Explain the trade-offs between SQL and NoSQL for an e-commerce catalog.",
    ],
    HR: [
      "Tell me about yourself and what drives you.",
      "Describe a time you handled conflict on a team.",
      "Where do you see yourself in 5 years?",
    ],
    AIML: [
      "Explain the bias-variance tradeoff in your own words.",
      "How do transformers differ from RNNs for sequence modeling?",
      "Walk through how you'd debug an overfitting model in production.",
    ],
    DSA: [
      "Given a sorted rotated array, find a target in O(log n).",
      "Design an LRU cache with O(1) get and put.",
      "Find the longest substring without repeating characters.",
    ],
  };
  return (banks[track] ?? banks.Technical).map((q, i) => ({
    id: i + 1,
    type: track,
    question: q,
  }));
}

export async function scoreAnswer(answer: string) {
  await delay(900);
  const len = Math.min(answer.length, 600);
  const base = 55 + Math.round((len / 600) * 35);
  return {
    confidence: Math.min(98, base + 4),
    communication: Math.min(98, base + 2),
    technical: Math.min(98, base),
    feedback:
      "Strong structure. Consider quantifying outcomes and naming specific technologies. Pause briefly before each major point — it conveys confidence.",
  };
}

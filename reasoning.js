import { getAllMemories } from "./memory.js";
import { saveInsight } from "./insightLog.js";

export function reason() {
  const memories = getAllMemories();
  const tagPairs = {};

  for (let i = 1; i < memories.length; i++) {
    const prev = memories[i - 1].tags;
    const curr = memories[i].tags;

    prev.forEach((from) => {
      curr.forEach((to) => {
        const key = `${from}→${to}`;
        tagPairs[key] = (tagPairs[key] || 0) + 1;
      });
    });
  }

  const insights = Object.entries(tagPairs)
    .filter(([_, count]) => count > 1)
    .map(([pair]) => {
      const [from, to] = pair.split("→");
      const insight = `You often move from **${from}** to **${to}** — maybe there's a connection.`;
      saveInsight(insight);
      return insight;
    });

  if (insights.length === 0) {
    return "I'm still learning. I don’t see clear patterns yet, but I’m watching gently.";
  }

  return insights.slice(0, 3).join("\n");
}

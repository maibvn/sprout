// tagFrequency.js
import fs from "fs";
import { getAllMemories } from "./memory.js";
import { TAG_FREQUENCY_FILE } from "./paths.js";

export function calculateTagFrequency() {
  const memories = getAllMemories();

  const tagCounts = {};

  memories.forEach((mem) => {
    mem.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  fs.writeFileSync(TAG_FREQUENCY_FILE, JSON.stringify(tagCounts, null, 2));
  return tagCounts;
}

export function summarizeFeltOften() {
  const counts = calculateTagFrequency();
  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  if (sorted.length === 0) return "I haven’t felt much yet.";

  return (
    "I often feel " +
    sorted.map(([t, c]) => `**${t}** (${c} times)`).join(", ") +
    "."
  );
}

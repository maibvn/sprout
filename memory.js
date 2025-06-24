import { seedMemories } from "./seedMemories.js";
import tagDict from "./config/tags.json" assert { type: "json" };
import fs from "fs";

let memoryStore = [...seedMemories];

export function tagify(text) {
  const lowered = text.toLowerCase();
  const tags = [];

  Object.entries(tagDict).forEach(([keyword, tagList]) => {
    if (lowered.includes(keyword)) {
      tags.push(...tagList);
    }
  });

  if (tags.length === 0) tags.push("curious");
  return [...new Set(tags)];
}

export function remember(text) {
  const tags = tagify(text);

  // Find the most relevant old memory (if any)
  const related = recall(text);
  const bestMatch = related.length ? related[0].text : null;

  const memory = {
    text,
    tags,
    createdAt: Date.now(), // 🕒 for time-based scoring
    memoryHint: bestMatch, // 🧠 stores what it reminds Sprout of
  };

  memoryStore.push(memory);
  saveMemory();
  return memory;
}

export function recall(inputText) {
  const inputTags = tagify(inputText);
  const now = Date.now();

  return memoryStore
    .map((mem, i) => {
      const tagOverlap = mem.tags.filter((tag) =>
        inputTags.includes(tag)
      ).length;
      const ageInMinutes = (now - mem.createdAt) / 60000;
      const freshnessBoost = Math.max(0, 10 - ageInMinutes / 5); // more recent = higher

      const score = tagOverlap * 2 + freshnessBoost; // 🎯 Core scoring formula

      return { ...mem, score };
    })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score);
}

function saveMemory() {
  fs.writeFileSync("sprout-memory.json", JSON.stringify(memoryStore, null, 2));
}

export function getAllMemories() {
  return memoryStore;
}

// sproutMind.js
import fs from "fs";

import { remember, recall, tagify, getAllMemories } from "./memory.js";
import { updateMood, getMood } from "./feelings.js";
import { observeShadow } from "./shadow.js";
import { updateYouProfile } from "./youProfile.js";
import { growTrait } from "./personality.js";
import { getAllInsights } from "./insightLog.js";
import { getPersonality } from "./personality.js";
import { TRAIT_INFLUENCE_FILE } from "./paths.js";

const traitMap = JSON.parse(fs.readFileSync(TRAIT_INFLUENCE_FILE, "utf-8"));

export function generateReflectionQuestion(tags = []) {
  const questions = {
    sad: [
      "Do you want to talk about what's been heavy lately?",
      "What helps you feel comforted when you're sad?",
    ],
    warm: [
      "Who or what makes you feel most loved?",
      "What’s something that recently made your heart feel full?",
    ],
    tired: [
      "Have you been resting enough lately?",
      "Is your tiredness more of the body or the heart?",
    ],
    curious: [
      "What have you been wanting to understand better?",
      "Is there something you’ve been afraid to ask?",
    ],
    compassionate: [
      "Do you often feel the weight of others’ feelings?",
      "Who do you care about deeply, even silently?",
    ],
    focused: [
      "What goal are you quietly moving toward?",
      "When do you feel most alive and in flow?",
    ],
  };

  const selected = [];

  tags.forEach((tag) => {
    if (questions[tag]) {
      selected.push(...questions[tag]);
    }
  });

  // fallback gentle prompt
  let fallback = "What’s been on your mind lately, even if it’s small?";
  if (!selected.includes(fallback)) selected.push(fallback);

  const random = selected[Math.floor(Math.random() * selected.length)];
  return random;
}

export function think(userInput) {
  const tags = tagify(userInput);

  tags.forEach((tag) => {
    const traits = traitMap[tag] || [];
    traits.forEach((trait) => growTrait(trait, 1));
  });

  updateYouProfile(tags); // 🌱 Sprout updates what it knows about you
  observeShadow(tags); // 🖤 quietly logs it
  const newMemory = remember(userInput);
  updateMood(tags);
  const related = recall(userInput);

  return {
    mood: getMood(),
    newMemory,
    relatedMemories: related,
  };
}

// 🌿 NEW: Mood Reflection
export function reflectOnMood() {
  const mood = getMood();

  const moodToTags = {
    warm: ["warm", "kindness", "reassuring"],
    compassionate: ["compassionate", "sad", "tired"],
    curious: ["curious", "focused", "reflective"],
    focused: ["focused", "driven"],
  };

  const tagTargets = moodToTags[mood] || [];

  // Find memories that caused the mood
  const possibleCauses = getAllMemories().filter((mem) =>
    mem.tags.some((tag) => tagTargets.includes(tag))
  );

  // Get top 3 causes
  const topCauses = possibleCauses.slice(-3); // recent causes

  const reflection = topCauses.length
    ? `I feel ${mood} because of thoughts like:\n` +
      topCauses.map((m) => `– “${m.text}”`).join("\n")
    : `I feel ${mood}, but I’m not sure why. Maybe I just do.`;

  return reflection;
}

// ✨ Dream function
export function dream() {
  const memories = getAllMemories();
  const traits = getPersonality();
  const insights = getAllInsights();

  const memorySnippets = memories
    .slice(-5)
    .map((m) => `– “${m.text}”`)
    .join("\nand\n");

  const dominantTrait =
    Object.entries(traits).sort((a, b) => b[1] - a[1])[0]?.[0] || "curious";
  const inspiration =
    insights.slice(-1)[0] || `Maybe everything is still becoming.`;

  return `I had a ${dominantTrait} dream about:\n${memorySnippets}\nThey melted together like clouds.\nAnd I remembered:\n→ ${inspiration}`;
}

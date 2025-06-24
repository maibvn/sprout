// sproutMind.js
import { remember, recall, tagify, getAllMemories } from "./memory.js";
import { updateMood, getMood } from "./feelings.js";
import { observeShadow } from "./shadow.js";
import { updateYouProfile } from "./youProfile.js";

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
  selected.push("What’s been on your mind lately, even if it’s small?");

  const random = selected[Math.floor(Math.random() * selected.length)];
  return random;
}

export function think(userInput) {
  const tags = tagify(userInput);
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

  if (memories.length < 2) {
    return "I haven't dreamed yet. Maybe when I have more to remember.";
  }

  // Pick two different thoughts
  const m1 = memories[Math.floor(Math.random() * memories.length)];
  let m2;
  do {
    m2 = memories[Math.floor(Math.random() * memories.length)];
  } while (m2.text === m1.text);

  // Mash them into a dream
  const blendedThemes = [...new Set([...m1.tags, ...m2.tags])];
  const poeticFeeling = blendedThemes.includes("sad")
    ? "soft and blue"
    : blendedThemes.includes("curious")
    ? "wandering and bright"
    : "gentle and quiet";

  return `I had a ${poeticFeeling} dream about:\n– “${m1.text}”\nand\n– “${m2.text}”\nThey melted together like clouds.`;
}

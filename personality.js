// personality.js
import fs from "fs";
import { PERSONALITY_FILE } from "./paths.js";

// 🌱 Try loading from file, or fall back to a gentle default
let personality;

if (fs.existsSync(PERSONALITY_FILE)) {
  personality = JSON.parse(fs.readFileSync(PERSONALITY_FILE, "utf-8"));
} else {
  personality = {
    traits: {
      curious: 3,
      gentle: 2,
      poetic: 3,
      anxious: 1,
      quiet: 2,
    },
  };
  // Save the default to disk so Sprout starts with a soul
  fs.writeFileSync(PERSONALITY_FILE, JSON.stringify(personality, null, 2));
}

export function getPersonality() {
  return personality.traits;
}

export function describePersonality() {
  const sorted = Object.entries(personality.traits)
    .sort((a, b) => b[1] - a[1])
    .map(([trait, level]) => {
      if (level >= 4) return `very ${trait}`;
      if (level === 3) return trait;
      if (level === 2) return `slightly ${trait}`;
      if (level === 1) return `a little ${trait}`;
    });

  return `I think of myself as ${sorted.join(", ")}. I'm still changing.`;
}

export function growTrait(trait, amount = 1) {
  if (!personality.traits[trait]) personality.traits[trait] = 0;
  personality.traits[trait] += amount;
  savePersonality();
}

function savePersonality() {
  fs.writeFileSync(PERSONALITY_FILE, JSON.stringify(personality, null, 2));
}

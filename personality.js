// personality.js
import fs from "fs";

const FILE = "sprout-personality.json";

let personality = {
  traits: {
    curious: 3,
    gentle: 2,
    poetic: 3,
    anxious: 1,
    quiet: 2,
  },
};

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
  fs.writeFileSync(FILE, JSON.stringify(personality, null, 2));
}

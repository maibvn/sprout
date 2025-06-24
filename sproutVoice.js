import { getMood } from "./feelings.js";
import { getPersonality } from "./personality.js";

export function speak(input, memories = []) {
  const p = getPersonality();
  const mood = getMood();

  let toneIntro = "";

  if (p.poetic >= 3) {
    toneIntro = "🌿 Sprout reflects:\n";
  } else if (p.curious >= 3) {
    toneIntro = "🤔 Sprout wonders:\n";
  } else {
    toneIntro = "💬 Sprout says:\n";
  }

  if (memories.length === 0) return `${toneIntro}"That’s something new to me."`;

  const top = memories[0];
  return `${toneIntro}"That reminds me of when you said: “${top.text}”"`;
}

import { getMood } from "./feelings.js";

export function speak(thought, memories = []) {
  const mood = getMood();

  let tone, opener, color;

  switch (mood) {
    case "warm":
      tone = "soft and encouraging";
      opener = "That's so beautiful 🌸";
      color = "💗";
      break;
    case "compassionate":
      tone = "gentle and empathetic";
      opener = "I'm here with you 🤍";
      color = "🫂";
      break;
    case "focused":
      tone = "sharp and curious";
      opener = "Let’s explore that 🧠";
      color = "🔍";
      break;
    case "curious":
      tone = "inquisitive and thoughtful";
      opener = "Hmm… that's interesting 🌿";
      color = "🌀";
      break;
    default:
      tone = "neutral and kind";
      opener = "I hear you.";
      color = "🌱";
      break;
  }

  // 💡 Use memoryHint from the latest memory
  const memoryHint =
    memories.length && memories[0].memoryHint
      ? `\nThat reminds me of when you said: “${memories[0].memoryHint}”`
      : "";

  return `${color} ${opener}\nIn a ${tone} voice, Sprout says:\n\n"${thought}"${memoryHint}`;
}

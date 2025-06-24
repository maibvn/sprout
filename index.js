// index.js
import { think, reflectOnMood } from "./sproutMind.js";
import { speak } from "./sproutVoice.js";
import { dream, generateReflectionQuestion } from "./sproutMind.js";
import readline from "readline";
import { analyzeShadow } from "./shadow.js";
import { shadowDream } from "./shadow.js";
import { writeToJournal } from "./journal.js";
import { getYouSummary } from "./youProfile.js";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("🌱 Talk to Sprout. Ask something or say how you feel:\n");

rl.on("line", (input) => {
  if (input.trim().toLowerCase().includes("why do you feel")) {
    const reflection = reflectOnMood();
    console.log(`\n🧘 Sprout reflects:\n${reflection}\n`);
    return;
  }
  if (input.trim().toLowerCase().includes("dream")) {
    const dreamThought = dream();
    console.log(`\n🌙 Sprout dreams:\n${dreamThought}\n`);
    return;
  }
  if (input.trim().toLowerCase().includes("shadow")) {
    const shadowMsg = analyzeShadow();
    console.log(`\n🌒 Shadow Sprout whispers:\n${shadowMsg}\n`);
    return;
  }
  if (input.toLowerCase().includes("shadow dream")) {
    const dream = shadowDream();
    console.log(`\n🌙 Sprout's shadow dreamed:\n${dream}\n`);
    writeToJournal(`🌙 Shadow Dream:\n${dream}`);
    return;
  }

  if (
    input.toLowerCase().includes("who do you think i am") ||
    input.toLowerCase().includes("what do you know about me")
  ) {
    const summary = getYouSummary();
    console.log(`\n🌿 Sprout whispers:\n${summary}\n`);
    return;
  }

  const result = think(input);
  console.log("\n🧠 Sprout’s Mood:", result.mood);
  console.log(speak(input, result.relatedMemories));

  const reflection = generateReflectionQuestion(result.newMemory.tags);
  console.log(`\n🌿 Sprout asks:\n"${reflection}"\n`);
  writeToJournal(`🌿 Sprout asked: "${reflection}"`);
});

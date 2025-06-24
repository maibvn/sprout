// index.js
import { think, reflectOnMood } from "./sproutMind.js";
import { speak } from "./sproutVoice.js";
import { dream, generateReflectionQuestion } from "./sproutMind.js";
import readline from "readline";
import { analyzeShadow } from "./shadow.js";
import { shadowDream } from "./shadow.js";
import { writeToJournal } from "./journal.js";
import { getYouSummary } from "./youProfile.js";
import { describePersonality } from "./personality.js";
import { nameSelf, getSoulName } from "./soulName.js";
import { reason } from "./reasoning.js";
import { loadInsights } from "./insightLog.js";
import { summarizeFeltOften } from "./tagFrequency.js";

loadInsights();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\u{1F331} Talk to Sprout. Ask something or say how you feel:\n");

const handlers = [
  {
    keywords: ["what do you feel often"],
    action: () => {
      const summary = summarizeFeltOften();
      console.log(`\n\u{1F33E} Sprout reflects:\n${summary}\n`);
    },
  },
  {
    keywords: ["why do you feel"],
    action: () => {
      const reflection = reflectOnMood();
      console.log(`\n\u{1F9D8} Sprout reflects:\n${reflection}\n`);
    },
  },
  {
    keywords: ["dream"],
    action: () => {
      const dreamThought = dream();
      console.log(`\n\u{1F319} Sprout dreams:\n${dreamThought}\n`);
    },
  },
  {
    keywords: ["shadow dream"],
    action: () => {
      const d = shadowDream();
      console.log(`\n\u{1F319} Sprout's shadow dreamed:\n${d}\n`);
      writeToJournal(`\u{1F319} Shadow Dream:\n${d}`);
    },
  },
  {
    keywords: ["shadow"],
    action: () => {
      const msg = analyzeShadow();
      console.log(`\n\u{1F31A} Shadow Sprout whispers:\n${msg}\n`);
    },
  },
  {
    keywords: ["who do you think i am", "what do you know about me"],
    action: () => {
      const summary = getYouSummary();
      console.log(`\n\u{1F33F} Sprout whispers:\n${summary}\n`);
    },
  },
  {
    keywords: ["who are you", "what is your personality"],
    action: () => {
      const desc = describePersonality();
      console.log(`\n\u{1F331} Sprout says:\n${desc}\n`);
    },
  },
  {
    keywords: ["name yourself", "what is your true name"],
    action: () => {
      const name = nameSelf();
      console.log(
        `\n\u{1F331} Sprout closes its eyes...\n“I think I want to be called: **${name}**.”\n`
      );
    },
  },
  {
    keywords: ["patterns", "what have you learned"],
    action: () => {
      const thoughts = reason();
      console.log(`\n\u{1F9E0} Sprout reflects:\n${thoughts}\n`);
    },
  },
];

rl.on("line", (input) => {
  const normalized = input.trim().toLowerCase();
  const matched = handlers.find((h) =>
    h.keywords.some((k) => normalized.includes(k))
  );

  if (matched) {
    matched.action();
    return;
  }

  const result = think(input);
  console.log("\n\u{1F9E0} Sprout’s Mood:", result.mood);
  console.log(speak(input, result.relatedMemories));

  const reflection = generateReflectionQuestion(result.newMemory.tags);
  console.log(`\n\u{1F33F} Sprout asks:\n"${reflection}"\n`);
  writeToJournal(`\u{1F33F} Sprout asked: "${reflection}"`);
});

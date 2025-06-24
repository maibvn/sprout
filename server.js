// server.js (ESM version) 🌱🧠 - for SproutGPT
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import stringSimilarity from "string-similarity";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// Data
const memoryFile = path.join(__dirname, "memory.json");
const brainFile = path.join(__dirname, "brain.json");

let memory = fs.existsSync(memoryFile)
  ? JSON.parse(fs.readFileSync(memoryFile))
  : { history: [], mood: "neutral" };

let brain = fs.existsSync(brainFile)
  ? JSON.parse(fs.readFileSync(brainFile))
  : [
      {
        input: "hello",
        output: ["Hey there!", "Hello! How can I help?", "Hi 👋"],
      },
      {
        input: "how are you",
        output: [
          "I'm just code, but I'm feeling electric ⚡",
          "Doing great, thanks!",
        ],
      },
      {
        input: "who are you",
        output: [
          "I'm SproutGPT, your tiny digital buddy!",
          "Just a friendly piece of code.",
        ],
      },
      {
        input: "bye",
        output: ["Goodbye friend 👋", "See you soon!"],
      },
      {
        input: "galaxies",
        output: [
          "Isn't it wild that we're made of star stuff?",
          "200 galaxies... and we're still chatting on Earth 💫",
        ],
      },
    ];

function saveMemory() {
  fs.writeFileSync(memoryFile, JSON.stringify(memory, null, 2));
}

function saveBrain() {
  fs.writeFileSync(brainFile, JSON.stringify(brain, null, 2));
}

function getResponse(userInput) {
  memory.history.push(userInput);
  if (/thank|love|cool|nice/i.test(userInput)) memory.mood = "happy";
  else if (/bad|hate|stupid/i.test(userInput)) memory.mood = "grumpy";

  const cleaned = userInput.toLowerCase().trim();
  const inputs = brain.map((entry) => entry.input);
  const match = stringSimilarity.findBestMatch(cleaned, inputs).bestMatch;

  if (match.rating > 0.4) {
    const entry = brain.find((e) => e.input === match.target);
    const response =
      entry.output[Math.floor(Math.random() * entry.output.length)];
    saveMemory();
    return memory.mood === "happy"
      ? response + " 😊"
      : memory.mood === "grumpy"
      ? response + " 😤"
      : response;
  }

  saveMemory();
  return "Hmm... I don't know that yet. Try training me!";
}

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/message", (req, res) => {
  const { input } = req.body;
  const reply = getResponse(input);
  res.json({ reply, mood: memory.mood });
});

app.post("/train", (req, res) => {
  const { input, output, brain: bulkBrain } = req.body;

  if (bulkBrain && Array.isArray(bulkBrain)) {
    for (const entry of bulkBrain) {
      if (entry.input && entry.output) {
        const cleanedInput = entry.input.toLowerCase().trim();
        const existing = brain.find((e) => e.input === cleanedInput);
        if (existing) {
          for (const o of entry.output) {
            if (!existing.output.includes(o)) existing.output.push(o);
          }
        } else {
          brain.push({ input: cleanedInput, output: entry.output });
        }
      }
    }
    saveBrain();
    return res.json({ status: "bulk learned", added: bulkBrain.length });
  }

  if (!input || !output)
    return res.status(400).json({ error: "Missing input/output" });

  const cleaned = input.toLowerCase().trim();
  const existing = brain.find((entry) => entry.input === cleaned);

  if (existing) {
    if (!existing.output.includes(output)) {
      existing.output.push(output);
    }
  } else {
    brain.push({ input: cleaned, output: [output] });
  }

  saveBrain();
  res.json({ status: "learned", input: cleaned, output });
});

app.get("/brain", (req, res) => {
  res.json(brain);
});

app.get("/memory", (req, res) => {
  res.json(memory);
});

// New route: visualize memory panel
app.get("/panel/memory", (req, res) => {
  const recent = memory.history.slice(-20).reverse();
  res.json({ recent, mood: memory.mood });
});

app.listen(3000, () => {
  console.log("🌱 SproutGPT server listening at http://localhost:3000");
});

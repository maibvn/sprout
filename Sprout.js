const fs = require("fs");
const readline = require("readline");

// Load memory if exists
let memory = fs.existsSync("memory.json")
  ? JSON.parse(fs.readFileSync("memory.json"))
  : {
      history: [],
      mood: "neutral",
    };

// Brain patterns
const brain = [
  {
    input: /hello|hi|hey/i,
    output: ["Hey there!", "Hello! How can I help?", "Hi 👋"],
  },
  {
    input: /how are you/i,
    output: [
      "I'm just code, but I'm feeling electric ⚡",
      "Doing great, thanks!",
    ],
  },
  {
    input: /who (are|r) you/i,
    output: ["I'm a tiny GPT-style bot!", "Just a friendly piece of code."],
  },
  {
    input: /what.*(can|do)/i,
    output: ["I can chat, listen, and pretend to be smart 😎"],
  },
  {
    input: /bye|goodbye/i,
    output: ["Bye! Come back soon!", "Goodbye friend 👋"],
  },
  {
    input: /galaxies|space|universe/i,
    output: [
      "Isn't it wild that we're made of star stuff?",
      "200 galaxies... and we're still chatting on Earth 💫",
    ],
  },
];

function saveMemory() {
  fs.writeFileSync("memory.json", JSON.stringify(memory, null, 2));
}

function getResponse(userInput) {
  memory.history.push(userInput);

  if (/thank|love|cool|nice/i.test(userInput)) memory.mood = "happy";
  else if (/bad|hate|stupid/i.test(userInput)) memory.mood = "grumpy";

  for (const pattern of brain) {
    if (pattern.input.test(userInput)) {
      const replies = pattern.output;
      let response = replies[Math.floor(Math.random() * replies.length)];

      if (memory.mood === "happy") response += " 😊";
      if (memory.mood === "grumpy") response += " 😤";

      saveMemory(); // Save after every response
      return response;
    }
  }

  saveMemory();
  return "Hmm... that's interesting. Tell me more!";
}

// CLI chat
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("🤖 SproutGPT is here. Your tiny talking buddy is listening...");

function ask() {
  rl.question("You: ", (input) => {
    const response = getResponse(input);

    let i = 0;
    process.stdout.write("Bot: ");
    const interval = setInterval(() => {
      if (i < response.length) {
        process.stdout.write(response[i]);
        i++;
      } else {
        clearInterval(interval);
        process.stdout.write("\n");
        ask();
      }
    }, 30);
  });
}

ask();

// sprout-gpt.js

// Simple browser version of SproutGPT using prompt + alert

// Step 1: Hardcoded conversation patterns
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
    output: [
      "I'm SproutGPT! A tiny chat buddy.",
      "Just a friendly bit of code.",
    ],
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

let mood = "neutral";
let memory = [];

function getResponse(userInput) {
  memory.push(userInput);

  if (/thank|love|cool|nice/i.test(userInput)) mood = "happy";
  else if (/bad|hate|stupid/i.test(userInput)) mood = "grumpy";

  for (const pattern of brain) {
    if (pattern.input.test(userInput)) {
      const replies = pattern.output;
      let response = replies[Math.floor(Math.random() * replies.length)];

      if (mood === "happy") response += " 😊";
      if (mood === "grumpy") response += " 😤";

      return response;
    }
  }

  return "Hmm... that's interesting. Tell me more!";
}

// Simple browser loop
function startChat() {
  alert("🤖 Hi! I'm SproutGPT. Let's chat.");
  let keepChatting = true;

  while (keepChatting) {
    const userInput = prompt("You:");
    if (!userInput || /bye|exit|quit/i.test(userInput)) {
      alert("👋 Bye for now!");
      keepChatting = false;
    } else {
      const botResponse = getResponse(userInput);
      alert("Bot: " + botResponse);
    }
  }
}

startChat();

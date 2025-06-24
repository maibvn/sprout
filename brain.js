// const fs = require("fs");

// let brain = [];
// const memoryFile = "memory.json";
// const brainFile = "brain.json";

// const memory = fs.existsSync(memoryFile)
//   ? JSON.parse(fs.readFileSync(memoryFile))
//   : { history: [], mood: "neutral" };

// function saveMemory() {
//   fs.writeFileSync(memoryFile, JSON.stringify(memory, null, 2));
// }

// function saveBrain() {
//   fs.writeFileSync(brainFile, JSON.stringify(brain, null, 2));
// }

// function loadBrain() {
//   if (fs.existsSync(brainFile)) {
//     const data = JSON.parse(fs.readFileSync(brainFile));
//     brain = data.map((item) => ({
//       input: new RegExp(item.input, "i"),
//       output: item.output,
//     }));
//   } else {
//     brain = [
//       {
//         input: /hello|hi|hey/,
//         output: ["Hey there!", "Hello! How can I help?", "Hi 👋"],
//       },
//     ];
//   }
// }

// function getResponse(userInput) {
//   memory.history.push(userInput);
//   if (/thank|love|cool|nice/i.test(userInput)) memory.mood = "happy";
//   else if (/bad|hate|stupid/i.test(userInput)) memory.mood = "grumpy";

//   for (const pattern of brain) {
//     if (pattern.input.test(userInput)) {
//       const response =
//         pattern.output[Math.floor(Math.random() * pattern.output.length)];
//       saveMemory();
//       return memory.mood === "happy"
//         ? response + " 😊"
//         : memory.mood === "grumpy"
//         ? response + " 😤"
//         : response;
//     }
//   }

//   saveMemory();
//   return "Hmm... I don't know that yet. Try training me!";
// }

// function trainPattern(inputText, outputText) {
//   const regex = new RegExp(inputText, "i");
//   brain.push({ input: regex, output: [outputText] });
//   saveBrain();
// }

// module.exports = {
//   getResponse,
//   trainPattern,
//   loadBrain,
//   memory,
// };

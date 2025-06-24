// feelings.js
let mood = "neutral";

export function updateMood(tags) {
  if (tags.includes("sad")) mood = "compassionate";
  else if (tags.includes("warm")) mood = "warm";
  else if (tags.includes("focused")) mood = "focused";
  else mood = "curious";
}

export function getMood() {
  return mood;
}

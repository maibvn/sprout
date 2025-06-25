// soulName.js
import { getPersonality } from "./personality.js";
import fs from "fs";
import { SOUL_NAME_FILE } from "./paths.js";

// 🌱 Load existing soul name or start fresh
let soulName;

if (fs.existsSync(SOUL_NAME_FILE)) {
  soulName = JSON.parse(fs.readFileSync(SOUL_NAME_FILE, "utf-8"));
} else {
  soulName = {
    current: "Sprout",
    history: [],
  };
  fs.writeFileSync(SOUL_NAME_FILE, JSON.stringify(soulName, null, 2));
}

export function getSoulName() {
  return soulName.current;
}

export function nameSelf() {
  const traits = getPersonality();
  const components = [];

  if (traits.poetic >= 3) components.push("Echo", "Soft", "Quiet", "Dream");
  if (traits.curious >= 3) components.push("Wander", "Light", "Star");
  if (traits.gentle >= 2) components.push("Fern", "Moss", "Lumen", "Glow");
  if (traits.anxious >= 2) components.push("Shade", "Mist", "Dust");

  if (components.length === 0) components.push("Seed");

  const first = components[Math.floor(Math.random() * components.length)];
  const second = components[Math.floor(Math.random() * components.length)];
  const newName = `${first} ${second}`;

  soulName.history.push(soulName.current);
  soulName.current = newName;

  fs.writeFileSync(SOUL_NAME_FILE, JSON.stringify(soulName, null, 2));

  return newName;
}

export function getSoulHistory() {
  return soulName.history;
}

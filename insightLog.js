import fs from "fs";
import path from "path";
import { INSIGHTS_FILE } from "./paths.js";

let insights = [];

// Ensure parent folder exists (helpful if config/data was deleted)
function ensureFolderExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function loadInsights() {
  ensureFolderExists(INSIGHTS_FILE);

  if (fs.existsSync(INSIGHTS_FILE)) {
    try {
      insights = JSON.parse(fs.readFileSync(INSIGHTS_FILE, "utf-8"));
    } catch (err) {
      console.error("❌ Failed to parse insights file, starting fresh.");
      insights = [];
    }
  } else {
    insights = [];
    fs.writeFileSync(INSIGHTS_FILE, JSON.stringify(insights, null, 2));
  }
}

export function saveInsight(text) {
  if (!insights.includes(text)) {
    insights.push(text);
    fs.writeFileSync(INSIGHTS_FILE, JSON.stringify(insights, null, 2));
  }
}

export function getAllInsights() {
  return insights;
}

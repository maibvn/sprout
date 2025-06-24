// insightLog.js
import fs from "fs";

const FILE = "sprout-insights.json";

let insights = [];

export function loadInsights() {
  if (fs.existsSync(FILE)) {
    insights = JSON.parse(fs.readFileSync(FILE));
  }
}

export function saveInsight(text) {
  if (!insights.includes(text)) {
    insights.push(text);
    fs.writeFileSync(FILE, JSON.stringify(insights, null, 2));
  }
}

export function getAllInsights() {
  return insights;
}

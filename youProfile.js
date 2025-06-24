// youProfile.js
import fs from "fs";

const PROFILE_PATH = "you-profile.json";

let profile = {
  tagCounts: {},
  favoriteTags: [],
  notes: [],
};

export function updateYouProfile(tags = []) {
  tags.forEach((tag) => {
    profile.tagCounts[tag] = (profile.tagCounts[tag] || 0) + 1;
  });

  // Update favorite tags
  const sorted = Object.entries(profile.tagCounts).sort((a, b) => b[1] - a[1]);
  profile.favoriteTags = sorted.slice(0, 3).map(([tag]) => tag);

  saveProfile();
}

export function getYouSummary() {
  if (!profile.favoriteTags.length) return "I’m still getting to know you.";

  return `I feel like you’re often drawn to these feelings: ${profile.favoriteTags
    .map((t) => `**${t}**`)
    .join(", ")}.\nThat says something beautiful about your heart.`;
}

function saveProfile() {
  fs.writeFileSync(PROFILE_PATH, JSON.stringify(profile, null, 2));
}

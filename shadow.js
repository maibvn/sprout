// shadow.js
const shadowTraces = [];

export function observeShadow(tags) {
  const now = new Date();
  const localHour = now.getHours(); // Local hour in 24h format

  shadowTraces.push({
    tags,
    hour: localHour,
    date: now.toISOString().split("T")[0],
  });

  // Optional: keep only recent 100 traces
  if (shadowTraces.length > 100) shadowTraces.shift();
}

export function analyzeShadow() {
  const tagFrequency = {};
  const hourTagMap = {};

  shadowTraces.forEach(({ tags, hour }) => {
    tags.forEach((tag) => {
      tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
      hourTagMap[hour] = hourTagMap[hour] || {};
      hourTagMap[hour][tag] = (hourTagMap[hour][tag] || 0) + 1;
    });
  });

  const topTags = Object.entries(tagFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([tag]) => tag);

  const poetic = topTags.map((tag) => {
    const mostCommonHour = Object.entries(hourTagMap)
      .map(([hour, tags]) => ({ hour, count: tags[tag] || 0 }))
      .sort((a, b) => b.count - a.count)[0];

    const timeNote = mostCommonHour?.count
      ? `mostly around ${mostCommonHour.hour}:00`
      : `at random times`;

    return `You often feel **${tag}**, ${timeNote}.`;
  });

  return poetic.length
    ? poetic.join("\n")
    : "Your shadow is still quiet. Maybe soon it will whisper.";
}

export function shadowDream() {
  const nightTraces = shadowTraces.filter(
    (s) => s.hour >= 21 || s.hour <= 4 // 9pm–4am = “emotional night”
  );

  if (nightTraces.length < 2) {
    return "The night was quiet. I didn’t dream of anything yet.";
  }

  const tagFrequency = {};
  nightTraces.forEach(({ tags }) => {
    tags.forEach((tag) => {
      tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
    });
  });

  const sorted = Object.entries(tagFrequency)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);

  const topTags = sorted.slice(0, 2);
  if (!topTags.length) return "My dreams were blurry. I can’t remember them.";

  const dreamMood =
    topTags.includes("sad") || topTags.includes("tired")
      ? "soft and hazy"
      : topTags.includes("curious")
      ? "wandering and full of light"
      : "strange and peaceful";

  return `I had a ${dreamMood} dream shaped by:\n– ${topTags
    .map((t) => `**${t}**`)
    .join(" and ")}.\nIt felt like something important, but I’m not sure why.`;
}

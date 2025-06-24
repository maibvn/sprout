// journal.js
import fs from "fs";
import path from "path";

export function writeToJournal(entryText) {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0];
  const filePath = path.join("journal", `${date}.txt`);

  const fullEntry = `[${time}] ${entryText}\n`;

  fs.mkdirSync("journal", { recursive: true });
  fs.appendFileSync(filePath, fullEntry);
}

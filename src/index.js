const { fetchIssues } = require("./github");
const { sendNotification } = require("./notifier");
const fs = require("fs");

const SEEN_FILE = "seen_issues.json";

function loadSeen() {
  try {
    if (!fs.existsSync(SEEN_FILE)) return [];
    const content = fs.readFileSync(SEEN_FILE, "utf8").trim();
    if (!content || content.charCodeAt(0) === 0xfeff) return [];
    return JSON.parse(content);
  } catch (e) {
    return [];
  }
}

function saveSeen(seen) {
  fs.writeFileSync(SEEN_FILE, JSON.stringify(seen));
}

async function run() {
  const seen = loadSeen();
  const issues = await fetchIssues();

  let newCount = 0;

  for (const issue of issues) {
    if (!seen.includes(issue.id)) {
      await sendNotification(issue);
      seen.push(issue.id);
      newCount++;
    }
  }

  saveSeen(seen);
  console.log(`Done. ${newCount} new issues found.`);
}

run();

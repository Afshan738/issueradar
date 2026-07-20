// const fetch = require("node-fetch");

const NTFY_TOPIC = process.env.NTFY_TOPIC;

async function sendNotification(issue) {
  const message = `${issue.title}\n${issue.html_url}`;

  await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
    method: "POST",
    headers: {
      Title: `New Issue: ${issue.repository_url.split("/").slice(-1)[0]}`,
      Priority: "high",
      Tags: "tada,computer",
    },
    body: message,
  });
}

module.exports = { sendNotification };

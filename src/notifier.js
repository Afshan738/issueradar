const NTFY_TOPIC = process.env.NTFY_TOPIC;

async function sendNotification(issue) {
  const message = `${issue.title}\n${issue.html_url}`;

  console.log(`Sending notification to ntfy topic: ${process.env.NTFY_TOPIC}`);

  const response = await fetch(`https://ntfy.sh/${process.env.NTFY_TOPIC}`, {
    method: "POST",
    headers: {
      Title: `New Issue: ${issue.repository_url.split("/").slice(-1)[0]}`,
      Priority: "high",
      Tags: "tada,computer",
    },
    body: message,
  });

  console.log(`ntfy response status: ${response.status}`);
}
module.exports = { sendNotification };

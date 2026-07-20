const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers = {
  Accept: "application/vnd.github.v3+json",
  Authorization: `Bearer ${GITHUB_TOKEN}`,
};

const queries = [
  'label:"good first issue" state:open language:javascript',
  'label:"good first issue" state:open language:python',
  'label:"good first issue" state:open language:go',
  'label:"good first issue" state:open language:typescript',
  'label:"good first issue" state:open repo:signoz/signoz',
  'label:"good first issue" state:open repo:kubernetes/kubernetes',
  'label:"good first issue" state:open repo:apache/kafka',
  'label:"good first issue" state:open repo:expressjs/express',
  'label:"good first issue" state:open repo:nodejs/node',
];

async function fetchIssues() {
  const allIssues = [];

  for (const query of queries) {
    const url = `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&sort=created&order=desc&per_page=5`;

    const response = await fetch(url, { headers });
    const data = await response.json();

    if (data.items) {
      const unclaimed = data.items.filter(
        (issue) => issue.assignees.length === 0,
      );
      allIssues.push(...unclaimed);
    }
  }

  return allIssues;
}

module.exports = { fetchIssues };

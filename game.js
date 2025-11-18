const cardData = [
  { term: "IAM", meaning: "access control system" },
  { term: "WAF", meaning: "filters web attacks" },
  { term: "SIEM", meaning: "security event monitor" },
  { term: "SOC", meaning: "security operations team" },
  { term: "EDR", meaning: "endpoint threat detection" },
  { term: "SOAR", meaning: "automated response actions" },
  { term: "CSPM", meaning: "cloud config scanning" },
  { term: "DLP", meaning: "prevents data leaks" },
  { term: "Zero Trust", meaning: "never trust, verify" },
  { term: "Threat Hunt", meaning: "proactive search threats" },
  { term: "IOC", meaning: "compromise indicator" },
  { term: "TTPs", meaning: "attacker behavior patterns" },
  { term: "Playbook", meaning: "fixed response steps" },
  { term: "Containment", meaning: "stop attack spread" },
  { term: "Pivoting", meaning: "lateral movement" },
  { term: "Forensics", meaning: "evidence collection" },
  { term: "CloudTrail", meaning: "logs cloud activity" },
  { term: "Guardrail", meaning: "prevents unsafe configs" }
];

let deck = [];

cardData.forEach(item => {
  // Card showing the term
  deck.push({
    id: item.term,
    display: item.term,
    type: "term"
  });

  // Card showing the meaning
  deck.push({
    id: item.term,
    display: item.meaning,
    type: "meaning"
  });
});
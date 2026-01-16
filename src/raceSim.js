let pendingIncidents = [];
let currentIncidentIndex = 0;
let raceResultsCache = [];

const incidentPool = [
 Jumped under red flag", "Ignored yellow flag", "Passed under waving yellow", "Aggressive block pass", "Unsafe rejoin", "False start", "Illegal bike modification", "Outside assistance", "Improper pit entry", "Track cutting", "Multi-rider pileup", "Bike fire during race", "Medical flag ignored", "Helmet removed on track", "Black flag ignored", "Weaving on straight", "Unsportsmanlike conduct", "Team interference", "Illegal repair", "Lap count dispute", "Timing loop failure", "Weather reduced visibility", "Track lights failure", "Wrong gate assigned", "Throttle stuck open", "Lost bike part on track", "Jumped tuff blocks", "Rode restricted area", "Unsafe marshal interaction", "Excessive noise", "Fuel rule violation", "Chain failure oil spill", "Verbal abuse of official", "Physical altercation", "Delayed race restart", "Incorrect lineup order", "Jumped on red-cross flag", "Ignoring slowdown zone", "Illegal tire compound", "Jumping under caution", "Late contact pass", "Blocking lapped rider", "Medical helicopter delay", "Start device violation", "Track rut manipulation", "Bike stalled on start", "Mechanical black smoke", "Team radio interference", "Marshal instruction ignored", "Jump timing sensor fault", "Restart jump violation", "Wrong penalty board shown", "Official miscommunication", "Crowd interference"
];

const dnfReasons = [
  "Crash",
  "Mechanical failure",
  "Injury",
  "Bike fire",
  "Weather damage"
];

function startRace() {
  seatsFilled = Math.floor(maxSeats * (popularity / 100));

  raceResultsCache = drivers.map(name => {
    if (Math.random() < 0.12) {
      return { name, dnf: true, reason: rand(dnfReasons) };
    }
    return { name, time: Math.random() * 1000 };
  });

  raceResultsCache.sort((a, b) => (a.time || 9999) - (b.time || 9999));

  pendingIncidents = [];
  currentIncidentIndex = 0;

  const incidentCount = Math.floor(Math.random() * 5);
  for (let i = 0; i < incidentCount; i++) {
    pendingIncidents.push({
      description: rand(incidentPool),
      severity: rand(["minor", "moderate", "major"]),
      penalty: null
    });
  }

  if (pendingIncidents.length === 0) {
    finalizeRace("✅ Clean race. No incidents.");
  } else {
    showIncident();
  }
}

function showIncident() {
  const inc = pendingIncidents[currentIncidentIndex];
  document.getElementById("raceText").textContent =
    `Incident ${currentIncidentIndex + 1}/${pendingIncidents.length}\n\n` +
    inc.description + `\nSeverity: ${inc.severity.toUpperCase()}`;

  const opts = document.getElementById("penaltyOptions");
  opts.innerHTML = "";

  btn("Nothing", () => resolve("nothing"));
  btn("Warning", () => resolve("warning"));
  btn("Disqualification", () => resolve("dsq"));
  btn("Time Penalty", () => choosePenalty("Time (sec)", [5, 10, 20]));
  btn("Place Penalty", () => choosePenalty("Place", [1, 3, 5]));

  document.getElementById("raceModal").style.display = "flex";
}

function choosePenalty(label, values) {
  document.getElementById("raceText").textContent = label;
  const opts = document.getElementById("penaltyOptions");
  opts.innerHTML = "";
  values.forEach(v => btn(v, () => resolve({ label, value: v })));
  btn("⬅ Back", showIncident);
}

function resolve(penalty) {
  const inc = pendingIncidents[currentIncidentIndex];
  inc.penalty = penalty;

  if (
    (fanPreference === "strict" && penalty === "nothing") ||
    (fanPreference === "lenient" && penalty === "dsq")
  ) popularity -= 3;
  else popularity += 1;

  currentIncidentIndex++;
  if (currentIncidentIndex >= pendingIncidents.length)
    finalizeRace("⚖ All incidents reviewed.");
  else showIncident();
}

function finalizeRace(msg) {
  payRaceSponsors(); // 💰 SPONSOR PAYOUT

  applyResults(raceResultsCache);

  let text = `${msg}\n\n🏁 Results:\n`;
  raceResultsCache.forEach((r, i) => {
    text += r.dnf
      ? `${i + 1}. ${r.name} — DNF (${r.reason})\n`
      : `${i + 1}. ${r.name}\n`;
  });

  text += `\n📋 Incidents: ${pendingIncidents.length}`;
  document.getElementById("raceText").textContent = text;
  document.getElementById("penaltyOptions").innerHTML = "";
  updateUI();
}

function applyResults(results) {
  const A = [25, 22, 20, 18, 16, 15, 14, 13, 12, 11];
  const B = [20, 17, 15, 13, 11, 10, 9, 8, 7, 6];
  const table = pointsSystem === "A" ? A : B;

  results.forEach((r, i) => {
    if (!r.dnf)
      championship[r.name] =
        (championship[r.name] || 0) + (table[i] || 0);
  });
}

function btn(t, f) {
  const b = document.createElement("button");
  b.textContent = t;
  b.onclick = f;
  document.getElementById("penaltyOptions").appendChild(b);
}

function rand(a) {
  return a[Math.floor(Math.random() * a.length)];
}



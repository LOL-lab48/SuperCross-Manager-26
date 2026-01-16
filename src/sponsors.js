// ==========================
// SPONSOR SYSTEM
// ==========================

// ACTIVE & INTERESTED SPONSORS
let activeSponsors = [];
let sponsorsInterested = [];

// LIMIT
const MAX_SPONSORS = 3;

// NAME POOL
const sponsorNames = [
  "Xcelerate Xtreme Sports™",
  "Red Apex Energy",
  "IronClaw Performance",
  "Velocity Gear Co.",
  "Pulse Racing Tech",
  "Overdrive Motorsports",
  "Blackline Industries",
  "NitroEdge Fuel",
  "ApexCore Labs"
];

// ==========================
// SPONSOR GENERATION
// ==========================

function addInterestedSponsor() {
  if (sponsorsInterested.length > 5) return;

  const name = sponsorNames[Math.floor(Math.random() * sponsorNames.length)];

  // Avoid duplicates
  if (
    activeSponsors.find(s => s.name === name) ||
    sponsorsInterested.find(s => s.name === name)
  ) return;

  const perRace = Math.floor(30000 + Math.random() * 70000);
  const season = perRace * 10 + Math.floor(Math.random() * 200000);

  sponsorsInterested.push({
    name,
    perRace,
    season,
    patience: 5 // days before they lose interest
  });

  // Also send an email
  mailQueue.push({
    title: `🤝 Sponsorship Offer`,
    body:
      `Hello from ${name}!\n\n` +
      `We are interested in sponsoring the SuperCross League.\n\n` +
      `Offer options:\n` +
      `• $${perRace.toLocaleString()} per race\n` +
      `• $${season.toLocaleString()} for the full season\n\n` +
      `Please let us know.`,
    responses: [
      { text: "View Sponsors", effect: () => openSponsors() },
      { text: "Ignore", effect: () => ignoreMail() }
    ]
  });
}

// ==========================
// SPONSOR UI
// ==========================

function openSponsors() {
  const panel = document.getElementById("sponsorPanel");
  panel.style.display = "flex";
  renderSponsors();
}

function closeSponsors() {
  document.getElementById("sponsorPanel").style.display = "none";
}

function renderSponsors() {
  const activeDiv = document.getElementById("activeSponsors");
  const interestDiv = document.getElementById("interestedSponsors");

  activeDiv.innerHTML = "<h3>Active Sponsors</h3>";
  interestDiv.innerHTML = "";

  if (activeSponsors.length === 0) {
    activeDiv.innerHTML += "<p>No active sponsors.</p>";
  }

  activeSponsors.forEach(s => {
    const div = document.createElement("div");
    div.innerHTML =
      `<b>${s.name}</b><br>` +
      `Type: ${s.type}<br>` +
      `Value: $${s.value.toLocaleString()}`;
    activeDiv.appendChild(div);
  });

  sponsorsInterested.forEach((s, i) => {
    const div = document.createElement("div");
    div.innerHTML =
      `<b>${s.name}</b><br>` +
      `$${s.perRace.toLocaleString()} / race<br>` +
      `$${s.season.toLocaleString()} season<br>`;

    const b1 = document.createElement("button");
    b1.textContent = "Accept Per Race";
    b1.onclick = () => acceptSponsor(i, "perRace");

    const b2 = document.createElement("button");
    b2.textContent = "Accept Season";
    b2.onclick = () => acceptSponsor(i, "season");

    div.appendChild(b1);
    div.appendChild(b2);
    interestDiv.appendChild(div);
  });
}

// ==========================
// ACCEPT / REJECT LOGIC
// ==========================

function acceptSponsor(index, type) {
  if (activeSponsors.length >= MAX_SPONSORS) {
    alert("You can only have 3 sponsors.");
    return;
  }

  const s = sponsorsInterested.splice(index, 1)[0];

  activeSponsors.push({
    name: s.name,
    type,
    value: type === "perRace" ? s.perRace : s.season
  });

  // Immediate payout for season deal
  if (type === "season") money += s.season;

  popularity += 2;
  updateUI();
  renderSponsors();
}

// ==========================
// RACE PAYOUT HOOK
// ==========================

function payRaceSponsors() {
  activeSponsors.forEach(s => {
    if (s.type === "perRace") money += s.value;
  });
}

// ==========================
// DAILY SPONSOR PATIENCE
// ==========================

function dailySponsorDecay() {
  sponsorsInterested.forEach(s => s.patience--);
  sponsorsInterested = sponsorsInterested.filter(s => s.patience > 0);
}

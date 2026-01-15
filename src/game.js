let money = 1000000;
let popularity = 50;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateStats() {
  document.getElementById("money").textContent = money;
  document.getElementById("popularity").textContent = popularity;
}

/* RACE */
function startRace() {
  const incidents = [
    "Aggressive pass causes controversy",
    "Track conditions questioned",
    "Rider penalized for jumping on red cross",
    "Fans angry over no penalty",
    "Clean race, great battles"
  ];

  const result = incidents[rand(0, incidents.length - 1)];

  document.getElementById("raceText").innerHTML = `
    Incident: <b>${result}</b><br><br>
    Choose penalties next (coming soon).
  `;

  document.getElementById("raceModal").style.display = "flex";
}

function closeRace() {
  document.getElementById("raceModal").style.display = "none";
}

/* LEAGUE ACTIONS */
function runAds() {
  money -= 100000;
  popularity += rand(3, 7);
  document.getElementById("output").textContent =
    "📺 Ads launched. Fan interest changes.";
  updateStats();
}

function hostEvent() {
  money -= 200000;
  popularity += rand(5, 10);
  document.getElementById("output").textContent =
    "🎉 Special event held. Media buzz!";
  updateStats();
}

function improveSafety() {
  money -= 150000;
  popularity += rand(1, 4);
  document.getElementById("output").textContent =
    "🦺 Safety investment made. Riders approve.";
  updateStats();
}

function allowDrama() {
  popularity += rand(-2, 6);
  document.getElementById("output").textContent =
    "🔥 Drama allowed. Fans react unpredictably.";
  updateStats();
}

function signSponsor() {
  const payout = rand(100000, 400000);
  money += payout;
  popularity += rand(-1, 3);
  document.getElementById("output").textContent =
    `🤝 Sponsor signed! +$${payout.toLocaleString()}`;
  updateStats();
}

window.onload = updateStats;




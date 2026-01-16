let money = 1500000;
let popularity = 40;
let maxSeats = 20000;
let seatsFilled = 0;

let pointsSystem = null;
let setupSpent = {};
const championship = {};

let seasonNumber = 1;

// FUN SYSTEMS
let fanPreference = Math.random() < 0.5 ? "strict" : "lenient";
let stewardSkill = Math.random(); // higher = fewer mistakes

// ==========================
// UI
// ==========================

function updateUI() {
  popularity = Math.max(0, Math.min(100, popularity));
  document.getElementById("money").textContent = money;
  document.getElementById("popularity").textContent = popularity;
  document.getElementById("maxSeats").textContent = maxSeats;
  document.getElementById("seatsFilled").textContent = seatsFilled;
}

// ==========================
// SETUP
// ==========================

function selectPointsSystem(sys) {
  if (pointsSystem) return alert("Points system locked for this season.");
  pointsSystem = sys;
}

function setupSpend(type) {
  if (setupSpent[type]) return;
  money -= 300000;
  popularity += 5;
  setupSpent[type] = true;
  updateUI();
}

function finishSetup() {
  if (!pointsSystem) return alert("Choose a points system.");
  document.getElementById("setupPanel").style.display = "none";
  document.getElementById("gamePanel").style.display = "block";
  updateUI();
}

// ==========================
// STANDINGS
// ==========================

function showStandings() {
  let list = Object.entries(championship).sort((a, b) => b[1] - a[1]);
  let text = "🏆 Championship Standings\n\n";

  list.forEach((r, i) => {
    text += `${i + 1}. ${r[0]} — ${r[1]} pts\n`;
  });

  alert(text || "No races yet.");
}

// ==========================
// SEASON CONTROL
// ==========================

function startNewSeason() {
  if (!confirm("Start a new season?")) return;

  for (let d in championship) championship[d] = 0;

  pointsSystem = null;
  setupSpent = {};
  fanPreference = Math.random() < 0.5 ? "strict" : "lenient";
  stewardSkill = Math.random();

  seasonNumber++;
  document.getElementById("gamePanel").style.display = "none";
  document.getElementById("setupPanel").style.display = "block";
}

// ==========================
// END OF SEASON REVIEW
// ==========================

function endSeasonReview() {
  alert(
    `Season ${seasonNumber} Complete\n\n` +
    `Popularity: ${popularity}%\n` +
    `Money: $${money.toLocaleString()}\n` +
    `Controversy Level: ${typeof controversyLevel !== "undefined" ? controversyLevel : 0}\n\n` +
    `Next season will reflect these outcomes.`
  );

  seasonNumber++;
  if (typeof controversyLevel !== "undefined") {
    controversyLevel = Math.max(0, controversyLevel - 2);
  }
}











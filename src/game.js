let money = 1500000;
let popularity = 40;
let maxSeats = 20000;
let seatsFilled = 0;

let pointsSystem = null;
let setupSpent = {};
const championship = {};

// FUN SYSTEMS
let fanPreference = Math.random() < 0.5 ? "strict" : "lenient";
let stewardSkill = Math.random(); // higher = fewer mistakes

function updateUI() {
  popularity = Math.max(0, Math.min(100, popularity));
  document.getElementById("money").textContent = money;
  document.getElementById("popularity").textContent = popularity;
  document.getElementById("maxSeats").textContent = maxSeats;
  document.getElementById("seatsFilled").textContent = seatsFilled;
}

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

function showStandings() {
  let list = Object.entries(championship).sort((a,b)=>b[1]-a[1]);
  let text = "🏆 Championship Standings\n\n";
  list.forEach((r,i)=>text+=`${i+1}. ${r[0]} — ${r[1]} pts\n`);
  alert(text || "No races yet.");
}

function startNewSeason() {
  if (!confirm("Start a new season?")) return;
  for (let d in championship) championship[d] = 0;
  pointsSystem = null;
  setupSpent = {};
  fanPreference = Math.random() < 0.5 ? "strict" : "lenient";
  stewardSkill = Math.random();
  document.getElementById("gamePanel").style.display = "none";
  document.getElementById("setupPanel").style.display = "block";
}










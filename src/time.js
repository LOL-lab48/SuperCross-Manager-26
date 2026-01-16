// ==========================
// TIME SYSTEM (F1 MANAGER–STYLE)
// ==========================

let currentDay = 1;
let nextRaceDay = 7;
let skippingTime = false;
let skipInterval = null;

// UPDATE DAY DISPLAY
function updateDayUI() {
  const el = document.getElementById("currentDay");
  if (el) el.textContent = currentDay;
}

// START SKIP
function startTimeSkip() {
  if (skippingTime) return;

  skippingTime = true;
  document.getElementById("output").textContent =
    "⏩ Skipping time... (click anywhere to stop)";

  skipInterval = setInterval(() => {
    advanceDay();
  }, 300);
}

// STOP SKIP
function stopTimeSkip() {
  if (!skippingTime) return;

  skippingTime = false;
  clearInterval(skipInterval);
  skipInterval = null;

  document.getElementById("output").textContent =
    `⏸ Paused on Day ${currentDay}`;
}

// ADVANCE ONE DAY
function advanceDay() {
  currentDay++;
  updateDayUI();

  // DAILY SYSTEMS
  dailyLeagueDrift();
  processDailyMail();
  dailySponsorDecay();
  dailyLeagueChecks();

  // RACE DAY
  if (currentDay >= nextRaceDay) {
    stopTimeSkip();
    showRaceDay();
  }
}

// RACE DAY PROMPT
function showRaceDay() {
  document.getElementById("modalTitle").textContent = "🏁 Race Weekend";
  document.getElementById("raceText").textContent =
    `Day ${currentDay}\n\nIt's race day.`;

  const opts = document.getElementById("penaltyOptions");
  opts.innerHTML = "";

  const b = document.createElement("button");
  b.textContent = "Start Race";
  b.onclick = () => {
    document.getElementById("raceModal").style.display = "none";
    startRace();
    nextRaceDay = currentDay + 7;
  };

  opts.appendChild(b);
  document.getElementById("raceModal").style.display = "flex";
}

// CLICK ANYWHERE TO STOP SKIP
document.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") return;
  stopTimeSkip();
});

// BACKGROUND LEAGUE DRIFT
function dailyLeagueDrift() {
  if (popularity > 55 && Math.random() < 0.3) popularity--;
  if (popularity < 45 && Math.random() < 0.2) popularity++;
  updateUI();
}



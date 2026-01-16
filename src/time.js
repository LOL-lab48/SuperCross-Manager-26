// ==========================
// TIME SYSTEM (MANUAL SKIP)
// ==========================

// CORE TIME STATE
let currentDay = 1;
let nextRaceDay = 7;     // 1 race every 7 days (easy to change)
let skippingTime = false;
let skipInterval = null;

// UPDATE DAY DISPLAY
function updateDayUI() {
  const el = document.getElementById("currentDay");
  if (el) el.textContent = currentDay;
}

// START SKIPPING TIME
function startTimeSkip() {
  if (skippingTime) return;

  skippingTime = true;
  document.getElementById("output").textContent = "⏩ Skipping time... (click anywhere to stop)";

  skipInterval = setInterval(() => {
    advanceDay();
  }, 300); // speed of skipping (ms per day)
}

// STOP SKIPPING TIME (CLICK ANYWHERE)
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

  // DAILY DRIFT (SMALL, LEAGUE-WIDE EFFECTS)
  dailyLeagueDrift();

  // DAILY MAIL / EVENTS
  processDailyMail();

  // RACE DAY CHECK
  if (currentDay >= nextRaceDay) {
    stopTimeSkip();
    showRaceDay();
  }
}

// SHOW RACE DAY PROMPT
function showRaceDay() {
  document.getElementById("modalTitle").textContent = "🏁 Race Weekend";
  document.getElementById("raceText").textContent =
    `Day ${currentDay}\n\nIt's race day.\nClick below to run the race.`;

  const opts = document.getElementById("penaltyOptions");
  opts.innerHTML = "";

  const b = document.createElement("button");
  b.textContent = "Start Race";
  b.onclick = () => {
    document.getElementById("raceModal").style.display = "none";
    startRace();
    scheduleNextRace();
  };
  opts.appendChild(b);

  document.getElementById("raceModal").style.display = "flex";
}

// SCHEDULE NEXT RACE
function scheduleNextRace() {
  nextRaceDay = currentDay + 7;
}

// CLICK ANYWHERE TO STOP SKIP
document.addEventListener("click", (e) => {
  // ignore button clicks (they already do stuff)
  if (e.target.tagName === "BUTTON") return;
  stopTimeSkip();
});

// ==========================
// DAILY BACKGROUND EFFECTS
// ==========================

function dailyLeagueDrift() {
  // popularity slowly normalizes
  if (popularity > 50 && Math.random() < 0.3) popularity--;
  if (popularity < 50 && Math.random() < 0.2) popularity++;

  updateUI();
}

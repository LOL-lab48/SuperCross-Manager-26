// ==========================
// TIME SYSTEM v3 - AUTO-STOP ON RACE
// ==========================

let currentDay = 1;
let nextRaceDay = 7;
let raceInterval = 7; // races every 7 days
let timeSkipping = false;
let skipInterval = null;
let skipSpeed = 1000; // 1 second per day

document.getElementById("currentDay").textContent = currentDay;

// ==========================
// ADVANCE ONE DAY
// ==========================
function advanceDay() {
  currentDay++;
  document.getElementById("currentDay").textContent = currentDay;

  // --------------------------
  // DAILY ACTIVITIES
  // --------------------------
  dailyLeagueChecks();
  processDailyMail();

  // --------------------------
  // CHECK FOR RACE DAY
  // --------------------------
  if (currentDay >= nextRaceDay) {
    stopTimeSkip();  // ❌ stop skipping automatically for race
    startRace();     // 🚨 show race modal
    nextRaceDay = currentDay + raceInterval; // schedule next race
  }
}

// ==========================
// START TIME SKIP
// ==========================
function startTimeSkip() {
  if (timeSkipping) return;
  timeSkipping = true;

  skipInterval = setInterval(() => {
    advanceDay();
  }, skipSpeed);

  // Stop skipping if player clicks anywhere
  document.body.addEventListener("click", stopTimeSkipOnClick);
}

// ==========================
// STOP TIME SKIP
// ==========================
function stopTimeSkip() {
  if (!timeSkipping) return;
  timeSkipping = false;

  clearInterval(skipInterval);
  skipInterval = null;

  document.body.removeEventListener("click", stopTimeSkipOnClick);
}

// ==========================
// HELPER: stop on click
// ==========================
function stopTimeSkipOnClick() {
  stopTimeSkip();
}

// ==========================
// RESET TIME SYSTEM (new season)
// ==========================
function resetTimeSystem() {
  currentDay = 1;
  nextRaceDay = 7;
  document.getElementById("currentDay").textContent = currentDay;
  stopTimeSkip();
}

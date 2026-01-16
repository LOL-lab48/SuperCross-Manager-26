// ==========================
// TIME SYSTEM
// ==========================

let currentDay = 1;
let nextRaceDay = 7; // first race is day 7
let timeSkipping = false;
let skipInterval = null;
let skipSpeed = 1000; // milliseconds per day (1 second)

document.getElementById("currentDay").textContent = currentDay;

// ==========================
// ADVANCE ONE DAY
// ==========================
function advanceDay() {
  currentDay++;
  document.getElementById("currentDay").textContent = currentDay;

  // Daily checks
  dailyLeagueChecks();  // sponsorships, popularity, etc.
  processDailyMail();   // emails

  // Check for race day
  if (currentDay >= nextRaceDay) {
    stopTimeSkip();
    startRace(); // trigger race modal
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




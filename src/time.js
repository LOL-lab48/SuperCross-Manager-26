// ==========================
// TIME SYSTEM - FULL
// ==========================

let currentDay = 1;
let nextRaceDay = 7;
let raceInterval = 7; // races every 7 days
let timeSkipping = false;
let skipInterval = null;
let skipSpeed = 2000; // ✅ 1 day every 2 seconds

// Show initial day
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
  dailyLeagueChecks();    // sponsorship checks, popularity, etc.
  processDailyMail();     // fan mail and sponsor mail

  // --------------------------
  // CHECK FOR RACE DAY
  // --------------------------
  if (currentDay === nextRaceDay) {
    stopTimeSkip();      // stop skipping for the race
    showRaceDayModal();  // show race modal
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

  // stop if player clicks anywhere
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
// CLICK ANYWHERE TO STOP
// ==========================
function stopTimeSkipOnClick() {
  stopTimeSkip();
}

// ==========================
// SHOW RACE MODAL
// ==========================
function showRaceDayModal() {
  const raceModal = document.getElementById("raceModal");
  const raceText = document.getElementById("raceText");
  const opts = document.getElementById("penaltyOptions");

  raceText.textContent = `🏁 Race Day! Day ${currentDay}\nClick below to run the race.`;
  opts.innerHTML = "";

  const startBtn = document.createElement("button");
  startBtn.textContent = "Start Race";
  startBtn.onclick = () => {
    raceModal.style.display = "none";
    startRace();               // raceSim.js handles incidents/results
    nextRaceDay = currentDay + raceInterval; // schedule next race
  };
  opts.appendChild(startBtn);

  raceModal.style.display = "flex";
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


let currentDay = 1;
let nextRaceDay = 7;
let raceInterval = 7; 
let timeSkipping = false;
let skipInterval = null;
let skipSpeed = 2000; // 2 seconds per day

document.getElementById("currentDay").textContent = currentDay;

// -------------------------
// ADVANCE ONE DAY
// -------------------------
function advanceDay() {
  currentDay++;
  document.getElementById("currentDay").textContent = currentDay;

  dailyLeagueChecks();
  processDailyMail();

  // ✅ Race day
  if (currentDay === nextRaceDay) {
    stopTimeSkip(false);      // stop skipping but don't remove click listener
    showRaceDayModal();       // show modal
  }
}

// -------------------------
// START TIME SKIP
// -------------------------
function startTimeSkip() {
  if (timeSkipping) return;
  timeSkipping = true;

  skipInterval = setInterval(() => {
    advanceDay();
  }, skipSpeed);
}

// -------------------------
// STOP TIME SKIP
// -------------------------
function stopTimeSkip(removeClickListener = true) {
  if (!timeSkipping) return;
  timeSkipping = false;

  clearInterval(skipInterval);
  skipInterval = null;

  // only remove the listener if we’re stopping manually
  if (removeClickListener) {
    document.body.removeEventListener("click", stopTimeSkipOnClick);
  }
}

// -------------------------
// CLICK ANYWHERE
// -------------------------
function stopTimeSkipOnClick() {
  stopTimeSkip();
}

// -------------------------
// SHOW RACE MODAL
// -------------------------
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
    startRace();               // triggers raceSim.js
    nextRaceDay = currentDay + raceInterval;
  };
  opts.appendChild(startBtn);

  raceModal.style.display = "flex";
}

// -------------------------
// RESET TIME
// -------------------------
function resetTimeSystem() {
  currentDay = 1;
  nextRaceDay = 7;
  document.getElementById("currentDay").textContent = currentDay;
  stopTimeSkip();
}



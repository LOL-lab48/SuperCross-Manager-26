// ==========================
// LEAGUE MANAGEMENT SYSTEM
// ==========================

// LEAGUE SETTINGS
let leagueRules = {
  penaltySeverity: "standard", // lenient | standard | strict
  safetyLevel: 1,              // 0–3
  stewardQuality: stewardSkill // linked to your existing variable
};

// GOVERNING BODY
let governingPressure = 0;

// ==========================
// RULE MANAGEMENT
// ==========================

function changePenaltySeverity(level) {
  leagueRules.penaltySeverity = level;
  popularity -= 3;
  controversyLevel++;
}

function investInSafety() {
  if (money < 250000) return alert("Not enough money.");
  money -= 250000;
  leagueRules.safetyLevel++;
  popularity += 2;
  updateUI();
}

function hireBetterStewards() {
  if (money < 200000) return alert("Not enough money.");
  money -= 200000;
  leagueRules.stewardQuality = Math.min(1, leagueRules.stewardQuality + 0.2);
  updateUI();
}

// ==========================
// DAILY LEAGUE CHECKS
// ==========================

function dailyLeagueChecks() {
  // Governing body pressure builds
  if (controversyLevel > 3) governingPressure++;
  if (leagueRules.safetyLevel === 0 && Math.random() < 0.2)
    governingPressure++;

  // Trigger investigation
  if (governingPressure >= 5) {
    triggerInvestigation();
    governingPressure = 0;
  }
}

// ==========================
// INVESTIGATION EVENT
// ==========================

function triggerInvestigation() {
  mailQueue.push({
    title: "🏛 Governing Body Investigation",
    body:
      "The governing body is launching an investigation into league operations.\n\n" +
      "How do you respond?",
    responses: [
      {
        text: "Cooperate fully ($200k)",
        effect: () => {
          money -= 200000;
          popularity += 3;
          controversyLevel = Math.max(0, controversyLevel - 2);
        }
      },
      {
        text: "Fight investigation",
        effect: () => {
          popularity -= 4;
          controversyLevel += 2;
        }
      }
    ]
  });
}

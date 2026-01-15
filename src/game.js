let money = 1000000;
let popularity = 50;

function updateStats() {
  document.getElementById("money").innerText = money;
  document.getElementById("popularity").innerText = popularity;
}

function startRace() {
  document.getElementById("output").innerText =
    "🏁 Race simulated. Results hidden. Steward review pending.";
}

function runAds() {
  if (money >= 100000) {
    money -= 100000;
    popularity += 5;
    document.getElementById("output").innerText =
      "📺 Ads ran. New fans discovered Supercross!";
    updateStats();
  }
}

function hostEvent() {
  if (money >= 200000) {
    money -= 200000;
    popularity += 8;
    document.getElementById("output").innerText =
      "🎉 Special event boosted popularity!";
    updateStats();
  }
}

function improveSafety() {
  if (money >= 150000) {
    money -= 150000;
    popularity += 3;
    document.getElementById("output").innerText =
      "🦺 Safety improved. League credibility rises.";
    updateStats();
  }
}

function allowDrama() {
  popularity += 2;
  document.getElementById("output").innerText =
    "🔥 Drama allowed. Social media explodes!";
  updateStats();
}

window.onload = updateStats;


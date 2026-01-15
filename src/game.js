let raceData = null;
let money = 1000000;
let popularity = 50;

function updateStats() {
  document.getElementById("money").innerText = money;
  document.getElementById("popularity").innerText = popularity;
}

function startRace() {
  raceData = simulateRace();
  document.getElementById("output").innerText =
    "🏁 Race simulated.\nResults hidden.\nPost-race review pending.";
}

function runAds() {
  if (money >= 100000) {
    money -= 100000;
    popularity += 5;
    document.getElementById("output").innerText =
      "📺 Ads run. More fans discovered Supercross!";
    updateStats();
  } else {
    alert("Not enough money!");
  }
}

function hostEvent() {
  if (money >= 200000) {
    money -= 200000;
    popularity += 8;
    document.getElementById("output").innerText =
      "🎉 Special event hosted. Big fan boost!";
    updateStats();
  } else {
    alert("Not enough money!");
  }
}

function improveSafety() {
  if (money >= 150000) {
    money -= 150000;
    popularity += 3;
    document.getElementById("output").innerText =
      "🦺 Safety improved. Riders and families approve.";
    updateStats();
  } else {
    alert("Not enough money!");
  }
}

function allowDrama() {
  popularity += 2;
  document.getElementById("output").innerText =
    "🔥 Drama allowed. Social media engagement spikes!";
  updateStats();
}

window.onload = updateStats;

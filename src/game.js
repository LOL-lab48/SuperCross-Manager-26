let money = 1000000;
let popularity = 50;

function updateStats() {
  console.log("Updating stats", money, popularity);
  document.getElementById("money").textContent = money;
  document.getElementById("popularity").textContent = popularity;
}

function startRace() {
  console.log("Start race clicked");
  document.getElementById("output").textContent =
    "🏁 Race simulated. Results hidden.";
}

function runAds() {
  console.log("Run ads clicked");
  money -= 100000;
  popularity += 5;
  document.getElementById("output").textContent =
    "📺 Ads ran. Popularity increased.";
  updateStats();
}

function hostEvent() {
  console.log("Host event clicked");
  money -= 200000;
  popularity += 8;
  document.getElementById("output").textContent =
    "🎉 Special event held.";
  updateStats();
}

function improveSafety() {
  console.log("Improve safety clicked");
  money -= 150000;
  popularity += 3;
  document.getElementById("output").textContent =
    "🦺 Safety improved.";
  updateStats();
}

function allowDrama() {
  console.log("Allow drama clicked");
  popularity += 2;
  document.getElementById("output").textContent =
    "🔥 Drama allowed.";
  updateStats();
}

window.onload = function () {
  console.log("Page loaded");
  updateStats();
};



// ---------------------- CORE STATS ----------------------
let money = 1000000;
let popularity = 50;
let maxSeats = 1000;
let seatsFilled = 0;
let ticketPrice = 50;

// ---------------------- SPONSORS ----------------------
let currentSponsor = null;
const sponsors = [
  { name: "Monster Energy", payoutBase: 100000, duration: 3, minPopularity: 0 },
  { name: "Red Bull", payoutBase: 120000, duration: 3, minPopularity: 40 },
  { name: "GoPro", payoutBase: 80000, duration: 3, minPopularity: 20 },
  { name: "Yamaha", payoutBase: 200000, duration: 4, minPopularity: 70 },
  { name: "KTM", payoutBase: 180000, duration: 4, minPopularity: 60 }
];

// ---------------------- UTILS ----------------------
function outputText(txt) {
  document.getElementById("output").textContent = txt;
}

function updateStats() {
  document.getElementById("money").textContent = money;
  document.getElementById("popularity").textContent = popularity;
  document.getElementById("seatsFilled").textContent = seatsFilled;
  
  if(currentSponsor) {
    document.getElementById("sponsorOutput").textContent =
      `Current Sponsor: ${currentSponsor.name} | ` +
      `Payout: $${currentSponsor.payoutBase.toLocaleString()} per race | ` +
      `Races left: ${currentSponsor.remainingRaces}`;
  } else {
    document.getElementById("sponsorOutput").textContent = "No active sponsor";
  }
}

// ---------------------- LEAGUE ACTIONS ----------------------
function runAds() { money -= 100000; popularity += Math.floor(Math.random()*5)+3; outputText("📺 Ads run. Fans react!"); updateStats(); }
function hostEvent() { money -= 200000; popularity += Math.floor(Math.random()*6)+5; outputText("🎉 Special event held. Popularity rises!"); updateStats(); }
function improveSafety() { money -= 150000; popularity += Math.floor(Math.random()*4)+1; outputText("🦺 Safety improved. Fans and riders approve."); updateStats(); }
function allowDrama() { popularity += Math.floor(Math.random()*9)-2; outputText("🔥 Drama allowed. Fans react unpredictably."); updateStats(); }

// ---------------------- SPONSORS CHOICE ----------------------
function showSponsorChoices() {
  if(currentSponsor) {
    outputText(`❌ Already have a sponsor: ${currentSponsor.name}`);
    return;
  }

  const sponsorDiv = document.getElementById("penaltyOptions");
  sponsorDiv.innerHTML = "<h3>Choose a Sponsor</h3>";

  sponsors.forEach((s) => {
    if(popularity >= s.minPopularity) {
      const btn = document.createElement("button");
      btn.textContent = `${s.name} — $${s.payoutBase} per race`;
      btn.onclick = () => {
        currentSponsor = {...s};
        currentSponsor.remainingRaces = s.duration;
        outputText(`🤝 You signed ${s.name}! Pays $${s.payoutBase} per race for ${s.duration} races.`);
        sponsorDiv.innerHTML = "";
        updateStats();
      };
      sponsorDiv.appendChild(btn);
    }
  });
}

// ---------------------- STADIUM ----------------------
function upgradeStadium() {
  const cost = maxSeats*5;
  if(money >= cost) { money -= cost; maxSeats += 500; outputText(`🏟 Stadium upgraded! Max seats now ${maxSeats}`); updateStats(); }
  else { outputText("❌ Not enough money for stadium upgrade!"); }
}

window.onload = updateStats;







// ---------------------- CORE STATS ----------------------
let money = 1000000;
let popularity = 50;
let maxSeats = 1000;
let seatsFilled = 0;
let ticketPrice = 50;

// Sponsor system
let currentSponsor = null;
const sponsors = [
  { name: "Monster Energy", payoutBase: 100000, duration: 3 },
  { name: "Red Bull", payoutBase: 120000, duration: 3 },
  { name: "GoPro", payoutBase: 80000, duration: 3 }
];

// ---------------------- RIDERS ----------------------
const riders = [
  { name: "Rider A", skill: 80, popularity: 70 },
  { name: "Rider B", skill: 70, popularity: 50 },
  { name: "Rider C", skill: 60, popularity: 40 }
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
      `Payout: $${currentSponsor.payout.toLocaleString()} per race | ` +
      `Races left: ${currentSponsor.remainingRaces}`;
  } else {
    document.getElementById("sponsorOutput").textContent = "No active sponsor";
  }
}

window.onload = updateStats;





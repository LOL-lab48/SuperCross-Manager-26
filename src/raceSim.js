function startRace() {
  // Seats filled based on popularity
  seatsFilled = Math.min(maxSeats, Math.floor((popularity/100)*maxSeats));
  
  // Ticket revenue
  const ticketRevenue = seatsFilled * ticketPrice;

  // Sponsor payout depends on popularity
  let sponsorRevenue = 0;
  if(currentSponsor) {
    sponsorRevenue = currentSponsor.payoutBase + Math.floor(popularity*100);
    currentSponsor.remainingRaces--;
    if(currentSponsor.remainingRaces <= 0) {
      outputText(`${currentSponsor.name} sponsorship ended!`);
      currentSponsor = null;
    }
  }

  money += ticketRevenue + sponsorRevenue;

  // Random race incident
  const incidents = [
    "Aggressive pass causes controversy",
    "Track conditions questioned",
    "Rider penalized for jumping on red cross",
    "Fans angry over no penalty",
    "Clean race, great battles"
  ];
  const incident = incidents[Math.floor(Math.random()*incidents.length)];

  // Show modal
  document.getElementById("raceText").innerHTML = `
    <b>Incident:</b> ${incident}<br>
    Tickets sold: ${seatsFilled}/${maxSeats}<br>
    Money earned: $${(ticketRevenue+sponsorRevenue).toLocaleString()}
  `;

  // Generate penalty options
  generatePenalties(incident);

  document.getElementById("raceModal").style.display = "flex";

  updateStats();
}

function closeRace() {
  document.getElementById("raceModal").style.display = "none";
}

// ---------------------- PENALTIES ----------------------
function generatePenalties(incident) {
  const optionsDiv = document.getElementById("penaltyOptions");
  optionsDiv.innerHTML = "<h3>Penalty Options</h3>";
  const penalties = [
    { text: "No Penalty", popularityChange: 5, sponsorChange: 0 },
    { text: "Warning", popularityChange: -2, sponsorChange: 0 },
    { text: "Small Fine", popularityChange: -3, sponsorChange: 0, moneyChange: -5000 },
    { text: "Disqualification", popularityChange: -10, sponsorChange: -5, moneyChange: 0 },
    { text: "Ban Rider", popularityChange: -15, sponsorChange: -10, moneyChange: 0 }
  ];

  penalties.forEach((p, i) => {
    const btn = document.createElement("button");
    btn.textContent = p.text;
    btn.onclick = () => {
      popularity += p.popularityChange;
      if(currentSponsor) currentSponsor.payoutBase += p.sponsorChange*1000;
      if(p.moneyChange) money += p.moneyChange;
      outputText(`Penalty applied: ${p.text}`);
      closeRace();
      updateStats();
    };
    optionsDiv.appendChild(btn);
  });
}

// ---------------------- LEAGUE ACTIONS ----------------------
function runAds() { money -= 100000; popularity += Math.floor(Math.random()*5)+3; outputText("📺 Ads run. Fans react!"); updateStats(); }
function hostEvent() { money -= 200000; popularity += Math.floor(Math.random()*6)+5; outputText("🎉 Special event held. Popularity rises!"); updateStats(); }
function improveSafety() { money -= 150000; popularity += Math.floor(Math.random()*4)+1; outputText("🦺 Safety improved. Fans and riders approve."); updateStats(); }
function allowDrama() { popularity += Math.floor(Math.random()*9)-2; outputText("🔥 Drama allowed. Fans react unpredictably."); updateStats(); }

// ---------------------- SPONSORS ----------------------
function chooseSponsor() {
  if(currentSponsor) { outputText(`❌ You already have a sponsor: ${currentSponsor.name}`); return; }
  const s = sponsors[Math.floor(Math.random()*sponsors.length)];
  currentSponsor = {...s};
  currentSponsor.remainingRaces = currentSponsor.duration;
  outputText(`🤝 You signed ${s.name}. Payout: $${s.payoutBase} per race. Contract lasts ${s.duration} races.`);
  updateStats();
}

// ---------------------- STADIUM ----------------------
function upgradeStadium() {
  const cost = maxSeats*5;
  if(money >= cost) { money -= cost; maxSeats += 500; outputText(`🏟 Stadium upgraded! Max seats now ${maxSeats}`); updateStats(); }
  else { outputText("❌ Not enough money for stadium upgrade!"); }
}

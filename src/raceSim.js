function startRace() {
  seatsFilled = Math.min(maxSeats, Math.floor((popularity/100)*maxSeats));
  
  const ticketRevenue = seatsFilled * ticketPrice;

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

  const incidents = [
    "Rider jumped the red cross",
    "Aggressive pass caused controversy",
    "Track conditions questioned",
    "Fans angry over no penalty",
    "Clean race, great battles"
  ];
  const incident = incidents[Math.floor(Math.random()*incidents.length)];

  document.getElementById("raceText").innerHTML = `
    <b>Incident:</b> ${incident}<br>
    Tickets sold: ${seatsFilled}/${maxSeats}<br>
    Money earned: $${(ticketRevenue+sponsorRevenue).toLocaleString()}
  `;

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
  optionsDiv.innerHTML += "<h3>Penalty Options</h3>";

  const penalties = [
    { text: "No Penalty", pop: -5, sponsor: 0, money: 0, feedback: "Fans upset! Popularity dropped." },
    { text: "Warning", pop: 3, sponsor: 0, money: 0, feedback: "Correct choice! Fans approve." },
    { text: "Small Fine", pop: -2, sponsor: 0, money: -5000, feedback: "Money lost, minor fan backlash." },
    { text: "Disqualification", pop: -10, sponsor: -5, money: 0, feedback: "Overreaction! Fans and sponsors unhappy." }
  ];

  penalties.forEach((p) => {
    const btn = document.createElement("button");
    btn.textContent = p.text;
    btn.onclick = () => {
      popularity += p.pop;
      money += p.money || 0;
      if(currentSponsor) currentSponsor.payoutBase += p.sponsor*1000;
      outputText(`Penalty applied: ${p.text} → ${p.feedback}`);
      closeRace();
      updateStats();
    };
    optionsDiv.appendChild(btn);
  });
}


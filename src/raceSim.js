function startRace() {
  // Calculate tickets
  seatsFilled = Math.min(maxSeats, Math.floor((popularity/100)*maxSeats));
  const ticketRevenue = seatsFilled * ticketPrice;

  // Sponsor revenue
  let sponsorRevenue = 0;
  if(currentSponsor) {
    sponsorRevenue = currentSponsor.payoutBase + Math.floor(popularity*100);
    currentSponsor.remainingRaces--;
    if(currentSponsor.remainingRaces <= 0) {
      outputText(`${currentSponsor.name} sponsorship ended!`);
      currentSponsor = null;
    }
  }

  // Generate race positions
  const racePositions = simulateRace();
  const incident = pickIncident();

  document.getElementById("raceText").innerHTML = `
    <b>Incident:</b> ${incident}<br>
    Race positions hidden until penalty is applied.<br>
    Tickets sold: ${seatsFilled}/${maxSeats}<br>
    Race revenue pending penalty.
  `;

  generatePenalties(incident, racePositions, ticketRevenue, sponsorRevenue);

  document.getElementById("raceModal").style.display = "flex";
  updateStats();
}

function closeRace() {
  document.getElementById("raceModal").style.display = "none";
}

// ---------------------- SIMULATION HELPERS ----------------------
function simulateRace() {
  // Shuffle riders by skill + random
  const ridersCopy = [...riders];
  ridersCopy.forEach(r => r.tempScore = r.skill + Math.random()*20);
  ridersCopy.sort((a,b) => b.tempScore - a.tempScore);
  return ridersCopy;
}

function pickIncident() {
  const incidents = [
    "Rider jumped the red cross",
    "Aggressive pass caused controversy",
    "Track conditions questioned",
    "Fans angry over no penalty",
    "Clean race, great battles"
  ];
  return incidents[Math.floor(Math.random()*incidents.length)];
}

// ---------------------- PENALTIES ----------------------
function generatePenalties(incident, racePositions, ticketRevenue, sponsorRevenue) {
  const optionsDiv = document.getElementById("penaltyOptions");
  optionsDiv.innerHTML = "<h3>Penalty Options</h3>";

  const penalties = [
    { text: "No Penalty", pop: -5, money: 0, feedback: "Fans upset!" },
    { text: "Warning", pop: 3, money: 0, feedback: "Correct choice! Fans approve." },
    { text: "Small Fine", pop: -2, money: -5000, feedback: "Minor backlash." },
    { text: "Disqualification", pop: -10, money: 0, feedback: "Overreaction! Fans unhappy." }
  ];

  penalties.forEach((p) => {
    const btn = document.createElement("button");
    btn.textContent = p.text;
    btn.onclick = () => {
      popularity += p.pop;
      money += p.money || 0;

      if(currentSponsor) money += sponsorRevenue;

      // Reveal race results after penalty
      let resultText = "🏆 Race Results:\n";
      racePositions.forEach((rider, index) => {
        resultText += `${index+1}. ${rider.name}\n`;
        if(rider.name === "Your Rider") seasonPoints += Math.max(0, 10 - index); // points reward
      });

      resultText += `\nTicket revenue: $${ticketRevenue}\nSponsor revenue: $${sponsorRevenue}`;

      document.getElementById("raceText").innerText =
        `Penalty applied: ${p.text} → ${p.feedback}\n\n` + resultText;

      // Close modal after 6 seconds
      setTimeout(closeRace, 6000);
      updateStats();
    };
    optionsDiv.appendChild(btn);
  });
}

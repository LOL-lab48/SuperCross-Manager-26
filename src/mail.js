// ==========================
// MAIL & EVENT SYSTEM
// ==========================

// ALL ACTIVE MAIL
let mailQueue = [];

// MEMORY / ESCALATION TRACKING
let ignoredMailCount = 0;
let controversyLevel = 0; // feeds governing body later

// ==========================
// DAILY MAIL PROCESS
// ==========================

function processDailyMail() {
  // Chance for random fan / media mail
  if (Math.random() < 0.25) generateFanMail();
  if (Math.random() < 0.15) generateMediaMail();

  // Sponsor interest increases with popularity
  if (Math.random() < popularity / 500) generateSponsorOffer();

  // Escalation if ignoring too much
  if (ignoredMailCount >= 3 && Math.random() < 0.3) {
    generateEscalationMail();
    ignoredMailCount = 0;
  }

  // Show first mail immediately (pauses time)
  if (mailQueue.length > 0) {
    stopTimeSkip();
    showMail(mailQueue.shift());
  }
}

// ==========================
// MAIL GENERATORS
// ==========================

function generateFanMail() {
  const angry = popularity < 40;
  mailQueue.push({
    title: "📣 Fan Feedback",
    body: angry
      ? "Fans are angry about how the league is being run."
      : "Fans are discussing recent races and decisions.",
    responses: [
      { text: "Ignore", effect: () => ignoreMail() },
      { text: "Issue statement", effect: () => { popularity += 2; money -= 50000; } }
    ]
  });
}

function generateMediaMail() {
  mailQueue.push({
    title: "📰 Media Inquiry",
    body: "Media outlets are questioning recent officiating and safety standards.",
    responses: [
      { text: "No comment", effect: () => ignoreMail() },
      { text: "Defend decisions", effect: () => { popularity += 1; controversyLevel++; } },
      { text: "Admit mistakes", effect: () => { popularity -= 1; controversyLevel--; } }
    ]
  });
}

function generateSponsorOffer() {
  if (typeof sponsorsInterested === "undefined") return;

  addInterestedSponsor();
}

function generateEscalationMail() {
  mailQueue.push({
    title: "⚠️ Situation Escalating",
    body:
      "Unanswered concerns are starting to stack up.\n" +
      "Sponsors and media are losing patience.",
    responses: [
      { text: "Take action now", effect: () => { popularity += 3; money -= 100000; } },
      { text: "Ignore", effect: () => ignoreMail() }
    ]
  });
}

// ==========================
// MAIL UI
// ==========================

function showMail(mail) {
  document.getElementById("modalTitle").textContent = mail.title;
  document.getElementById("raceText").textContent = mail.body;

  const opts = document.getElementById("penaltyOptions");
  opts.innerHTML = "";

  mail.responses.forEach(r => {
    const b = document.createElement("button");
    b.textContent = r.text;
    b.onclick = () => {
      r.effect();
      closeMail();
    };
    opts.appendChild(b);
  });

  document.getElementById("raceModal").style.display = "flex";
}

function closeMail() {
  updateUI();
  document.getElementById("raceModal").style.display = "none";
}

// ==========================
// IGNORE LOGIC
// ==========================

function ignoreMail() {
  ignoredMailCount++;
  controversyLevel++;
}

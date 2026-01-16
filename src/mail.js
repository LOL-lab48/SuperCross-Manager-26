// ==========================
// MAIL SYSTEM
// ==========================

let mailQueue = [];
let readMail = [];

// PROCESS DAILY MAIL
function processDailyMail() {
  // Chance of new fan email
  if (Math.random() < 0.3) generateFanMail();

  // Chance of sponsor email handled in sponsors.js
  // (addInterestedSponsor() fires elsewhere)

  // Show first email if inbox empty
  if (mailQueue.length > 0 && !document.getElementById("mailPanel").style.display.includes("flex")) {
    showMail(mailQueue[0]);
  }
}

// GENERATE FAN EMAIL
function generateFanMail() {
  const emotions = ["angry", "confused", "happy"];
  const emotion = emotions[Math.floor(Math.random() * emotions.length)];
  const text = {
    angry: "I'm upset with the way the league handled the last race!",
    confused: "I don't understand some of the rules...",
    happy: "Great races lately, keep it up!"
  };

  mailQueue.push({
    title: `Fan Mail (${emotion})`,
    body: text[emotion],
    responses: [
      { text: "Reply Politely", effect: () => popularity += 2 },
      { text: "Ignore", effect: () => popularity -= 1 }
    ]
  });
}

// SHOW MAIL UI
function showMail(mail) {
  const panel = document.getElementById("mailPanel");
  panel.style.display = "flex";
  document.getElementById("mailTitle").textContent = mail.title;
  document.getElementById("mailBody").textContent = mail.body;

  const opts = document.getElementById("mailOptions");
  opts.innerHTML = "";

  mail.responses.forEach((r, i) => {
    const b = document.createElement("button");
    b.textContent = r.text;
    b.onclick = () => {
      r.effect();
      readMail.push(mail);
      mailQueue.shift();
      panel.style.display = "none";
    };
    opts.appendChild(b);
  });
}

// IGNORE MAIL (for sponsors etc.)
function ignoreMail() {
  if (mailQueue.length === 0) return;
  mailQueue.shift();
}


const dnfReasons = [
  "Crash","Mechanical failure","Injury",
  "Bike fire","Black flag","Weather damage"
];

const headlines = [
  "Fans debate race control decisions",
  "Social media explodes after controversy",
  "Promoter under pressure after ruling",
  "Race hailed as instant classic",
  "Safety concerns raised by teams"
];

function startRace() {
  seatsFilled = Math.floor(maxSeats * (popularity/100));
  let results = [];

  drivers.forEach(name=>{
    if (Math.random()<0.15)
      results.push({name,dnf:true,reason:rand(dnfReasons)});
    else
      results.push({name,score:Math.random()});
  });

  results.sort((a,b)=>(b.score||-1)-(a.score||-1));

  const clean = Math.random()<0.4;
  if (clean) {
    applyResults(results);
    showResults(results,"✅ Clean race. Fans loved it.");
  } else {
    showPenaltyOptions(results);
  }
}

function showPenaltyOptions(results) {
  const modal=document.getElementById("raceModal");
  const text=document.getElementById("raceText");
  const opts=document.getElementById("penaltyOptions");

  text.textContent="⚠ Incident under review. Choose response.";
  opts.innerHTML="";

  [
    {t:"Correct Call",p:+3},
    {t:"Too Soft",p:-5},
    {t:"Too Harsh",p:-8}
  ].forEach(c=>{
    const b=document.createElement("button");
    b.textContent=c.t;
    b.onclick=()=>{
      popularity+=c.p;
      applyResults(results);
      showResults(results,`Decision: ${c.t}`);
    };
    opts.appendChild(b);
  });

  modal.style.display="flex";
}

function applyResults(results) {
  const A=[25,22,20,18,16,15,14,13,12,11];
  const B=[20,17,15,13,11,10,9,8,7,6];
  const table=pointsSystem==="A"?A:B;

  results.forEach((r,i)=>{
    if(!r.dnf){
      championship[r.name]=(championship[r.name]||0)+(table[i]||0);
    }
  });
}

function showResults(results,msg) {
  let text=`${msg}\n\n🏁 Results:\n`;
  results.forEach((r,i)=>{
    text+=r.dnf
      ?`${i+1}. ${r.name} — DNF (${r.reason})\n`
      :`${i+1}. ${r.name}\n`;
  });
  text+=`\n📰 Headline: ${rand(headlines)}`;

  document.getElementById("raceText").textContent=text;
  document.getElementById("penaltyOptions").innerHTML="";
  document.getElementById("raceModal").style.display="flex";
  setTimeout(()=>document.getElementById("raceModal").style.display="none",8000);
}

function rand(a){return a[Math.floor(Math.random()*a.length)];}

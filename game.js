// =======================
// CARD DATA (TERMS + MEANINGS)
// =======================

const cardData = [
  { term: "IAM", meaning: "access control system" },
  { term: "WAF", meaning: "filters web attacks" },
  { term: "SIEM", meaning: "security event monitor" },
  { term: "SOC", meaning: "security operations team" },
  { term: "EDR", meaning: "endpoint threat detection" },
  { term: "SOAR", meaning: "automated response actions" },
  { term: "CSPM", meaning: "cloud config scanning" },
  { term: "DLP", meaning: "prevents data leaks" },
  { term: "Zero Trust", meaning: "never trust, verify" },
  { term: "Threat Hunt", meaning: "proactive search threats" },
  { term: "IOC", meaning: "compro- mise indicator" },
  { term: "TTPs", meaning: "attacker behavior patterns" },
  { term: "Playbook", meaning: "fixed response steps" },
  { term: "Contain- ment", meaning: "stop attack spread" },
  { term: "Pivoting", meaning: "lateral movement" },
  { term: "Forensics", meaning: "evidence collection" },
  { term: "CloudTrail", meaning: "logs cloud activity" },
  { term: "Guardrail", meaning: "prevents unsafe configs" }
];

// =======================
// BUILD 36-CARD DECK
// =======================

let deck = [];

cardData.forEach(item => {
  deck.push({
    id: item.term,
    display: item.term,
    type: "term"
  });

  deck.push({
    id: item.term,
    display: item.meaning,
    type: "meaning"
  });
});

// Game state
let flippedCards = [];
let matchedPairs = 0;
let lockBoard = false;
let moves = 0;
let timerInterval = null;
let seconds = 0;
let gameStarted = false;

// =======================
// TIMER
// =======================

function startTimer() {
  if (gameStarted) return;
  gameStarted = true;

  timerInterval = setInterval(() => {
    seconds++;
    document.querySelector(".stats .stat:nth-child(2) .stat-label:nth-child(2)").textContent =
      `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  }, 1000);
}

// =======================
// RENDER 6x6 GRID
// =======================

function renderBoard() {
  const board = document.getElementById("gameBoard");
  board.innerHTML = "";

  deck.forEach((card, index) => {
    const div = document.createElement("div");

    div.classList.add("card");
    div.dataset.index = index;

    div.innerHTML =`
    <div class= "card-front"><i class="fas fa-spider"</i></div> 
    <div class= "card-back">${card.display}</div>`; 
    div.addEventListener("click", flipCard);
    board.appendChild(div);
  });
}


// =======================
// FLIP CARD
// =======================

function flipCard() {
  if (lockBoard) return;

  startTimer();

  const index = this.dataset.index;
  const card = deck[index];

  if (this.classList.contains("flipped")) return;

  this.classList.add("flipped");


  flippedCards.push({ element: this, card });

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// =======================
// CHECK MATCH
// =======================

function checkMatch() {
  lockBoard = true;
  console.log("<i>It's a match!<i>")

  const [first, second] = flippedCards;

  moves++;
  document.querySelector(".stats .stat:nth-child(1) .stat-label:nth-child(2)").textContent = moves;

  if (first.card.id === second.card.id) {
    first.element.classList.add("matched");
    second.element.classList.add("matched");

    matchedPairs++;
    document.querySelector(".stats .stat:nth-child(3) .stat-label:nth-child(2)").textContent =
      `${matchedPairs}/18`;

    flippedCards = [];
    lockBoard = false;

    if (matchedPairs === 18) {
      setTimeout(showWinModal, 600);
    }
  } else {
    setTimeout(() => {
      first.element.classList.remove("flipped");
      second.element.classList.remove("flipped");
     
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}

// =======================
// SHOW WIN MODAL
// =======================

function showWinModal() {
  clearInterval(timerInterval);

  document.getElementById("finalMoves").textContent = moves;
  document.getElementById("finalTime").textContent =
    `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  document.getElementById("winModal").style.display = "flex";
}

// =======================
// NEW GAME RESET
// =======================

function newGame() {
  clearInterval(timerInterval);
  seconds = 0;
  gameStarted = false;

  moves = 0;
  matchedPairs = 0;
  flippedCards = [];
  lockBoard = false;

  document.getElementById("winModal").style.display = "none";

  // Reset UI
  document.querySelector(".stats .stat:nth-child(1) .stat-label:nth-child(2)").textContent = "0";
  document.querySelector(".stats .stat:nth-child(2) .stat-label:nth-child(2)").textContent = "0:00";
  document.querySelector(".stats .stat:nth-child(3) .stat-label:nth-child(2)").textContent = "0/18";

  // Shuffle and rebuild
  deck = deck.sort(() => Math.random() - 0.5);
  renderBoard();
}

// =======================
// START GAME ON LOAD
// =======================

deck = deck.sort(() => Math.random() - 0.5);
renderBoard();

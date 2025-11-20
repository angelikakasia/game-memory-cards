// =======================
// CARD DATA (TERMS + MEANINGS)
// =======================

const cardData = [
  { term: "IAM", meaning: "access control system", color: "#f55585ff" },
  { term: "WAF", meaning: "filters web attacks", color: "#509ef6ff" },
  { term: "SIEM", meaning: "security event monitor", color: "#2ffcccff" },
  { term: "SOC", meaning: "security operations team", color: "#d8c602ff" },
  { term: "EDR", meaning: "endpoint threat detection", color: "#ecf244ff" },
  { term: "SOAR", meaning: "automated response actions", color: "#c7f359ff" },
  { term: "CSPM", meaning: "cloud config scanning", color: "#26b58aff" },
  { term: "DLP", meaning: "prevents data leaks", color: "#bb69faff" },
  { term: "Zero Trust", meaning: "never trust, verify", color: "#77f01aff" },
  { term: "Threat Hunt", meaning: "proactive search threats", color: "#ef421bff" },
  { term: "IOC", meaning: "compro- mise indicator", color: "#f4208eff" },
  { term: "TTPs", meaning: "attacker behavior patterns", color: "#565c55ff" },
  { term: "Playbook", meaning: "fixed response steps", color: "#f8619dff" },
  { term: "Contain- ment", meaning: "stop attack spread", color: "#43f64fff" },
  { term: "Pivoting", meaning: "lateral movement", color: "#f69c48ff" },
  { term: "Forensics", meaning: "evidence collection", color: "#d5bff3ff" },
  { term: "CloudTrail", meaning: "logs cloud activity", color: "#2c4af7ff" },
  { term: "Guardrail", meaning: "prevents unsafe configs", color: "#07a4ecff" }
];


// =======================
// BUILD 40-CARD DECK
// =======================

let deck = [];

cardData.forEach(item => {
  deck.push({
    id: item.term,
    display: item.term,
    type: "term",
    color:item.color
  });

  deck.push({
    id: item.term,
    display: item.meaning,
    type: "meaning",
    color: item.color
  });
});

// =======================
// GAME STATE
// =======================

let flippedCards = [];
let matchedPairs = 0;
let lockBoard = false;

let moves = 0;
const MAX_MOVES = 40;   

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

    // Time limit
    if (seconds > 600) {
      lockBoard = true;
      clearInterval(timerInterval);
      alert("Time's up! You reached the 10-minute limit!");
    }

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

    div.innerHTML = `
      <div class="card-front"><i class="fas fa-spider"></i></div>
      <div class="card-back" style="background:${card.color}">${card.display}</div>
    `;

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

  const [first, second] = flippedCards;

  moves++;

  if (moves > MAX_MOVES) {
    lockBoard = true;
    clearInterval(timerInterval);
    alert("Game Over: You reached maximum move limit!");
    return;
  }


  document.querySelector(".stats .stat:nth-child(1) .stat-label:nth-child(2)").textContent =
    `${moves}/${MAX_MOVES}`;

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
    }, 900);
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

  const modal = document.getElementById("winModal");
  modal.style.display = "flex";
  modal.classList.add("showing");
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

  // Reset UI
  document.querySelector(".stats .stat:nth-child(1) .stat-label:nth-child(2)").textContent =
    `0/${MAX_MOVES}`;

  document.querySelector(".stats .stat:nth-child(2) .stat-label:nth-child(2)").textContent = "0:00";
  document.querySelector(".stats .stat:nth-child(3) .stat-label:nth-child(2)").textContent = "0/18";

  // Shuffle & render
  deck = deck.sort(() => Math.random() - 0.5);
  renderBoard();
}


// =======================
// SHOW INSTRUCTIONS ON LOAD
// =======================

function showInstructions() {
  document.getElementById("instructionsModal").classList.add("show");
}

function closeInstructions() {
  document.getElementById("instructionsModal").classList.remove("show");
}


// =======================
// START GAME
// =======================

deck = deck.sort(() => Math.random() - 0.5);
renderBoard();
showInstructions();
document.getElementById("winModal").style.display = "none";

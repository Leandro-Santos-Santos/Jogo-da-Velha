const currentPlayer = document.querySelector(".currentPlayer");
const scorePlayerX = document.querySelector(".scorePlayerX");
const scorePlayerO = document.querySelector(".scorePlayerO");

let selecionado;
let player = "X";
let scoreX = 0;
let scoreO = 0;

const posicao = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

function init() {
  selecionado = new Array(9).fill(null);
  currentPlayer.textContent = `Jogador da Vez: ${player}`;
  scorePlayerX.textContent = `Jogador 01: ${scoreX}`;
  scorePlayerO.textContent = `Jogador 02: ${scoreO}`;

  document.querySelectorAll(".game button").forEach((item) => {
    item.textContent = "";
    item.addEventListener("click", newMove);
  });

  if (player === "O") {
    setTimeout(cpuMove, 500); // Chama a função da jogada da CPU após 500ms
  }
}

function newMove(e) {
  const index = parseInt(e.target.dataset.posicao);
  e.target.textContent = player;
  e.target.removeEventListener("click", newMove);
  selecionado[index] = player;

  check();

  player = player === "X" ? "O" : "X";
  currentPlayer.textContent = `Jogador da Vez: ${player}`;

  if (player === "O") {
    setTimeout(cpuMove, 500); // Chama a função da jogada da CPU após 500ms
  }
}

function cpuMove() {
  const emptyIndexes = selecionado.reduce((acc, val, index) => {
    if (val === null) acc.push(index);
    return acc;
  }, []);

  const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  const button = document.querySelector(`[data-posicao="${randomIndex}"]`);

  button.textContent = player;
  button.removeEventListener("click", newMove);
  selecionado[randomIndex] = player;

  check();

  player = player === "X" ? "O" : "X";
  currentPlayer.textContent = `Jogador da Vez: ${player}`;
}

function check() {
  const playerLastMove = player === "X" ? "O" : "X";
  
  for (const pos of posicao) {
    if (pos.every((item) => selecionado[item] === playerLastMove)) {
      alert(`O Jogador '${playerLastMove}' GANHOU!`);
      if (playerLastMove === 'X') {
        scoreX++;
        scorePlayerX.textContent = `Jogador 01: ${scoreX}`;
      } else {
        scoreO++;
        scorePlayerO.textContent = `Jogador 02: ${scoreO}`;
      }
      init();
      return;
    }
  }

  if (selecionado.every((item) => item)) {
    alert("______________Ichhh Empatou!______");
    init();
    return;
  }
}

init();
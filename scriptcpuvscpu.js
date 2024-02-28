const currentPlayer = document.querySelector(".currentPlayer");
let selecionado;
let player = "X";

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
  currentPlayer.textContent = `JOGADOR DA VEZ: ${player}`;

  document.querySelectorAll(".game button").forEach((item) => {
    item.textContent = "";
  });

  playCPU();
}

function playCPU() {
  setTimeout(() => {
    const emptyIndexes = selecionado.reduce((acc, val, index) => {
      if (val === null) acc.push(index);
      return acc;
    }, []);

    const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    const button = document.querySelector(`[data-posicao="${randomIndex}"]`);

    button.textContent = player;
    selecionado[randomIndex] = player;

    check();

    player = player === "X" ? "O" : "X";
    currentPlayer.textContent = `JOGADOR DA VEZ: ${player}`;

    playCPU();
  }, 500);
}

function check() {
  const playerLastMove = player === "X" ? "O" : "X";
  
  for (const pos of posicao) {
    if (pos.every((item) => selecionado[item] === playerLastMove)) {
      alert(`O JOGADOR '${playerLastMove}' GANHOU!`);
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

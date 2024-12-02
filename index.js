let multiplier = 1.0;
let multiplierInterval;
let currentBet = 10;
let balance = 20;

// Elementos HTML
const multiplierDisplay = document.getElementById("multiplier");
const betDisplay = document.getElementById("current-bet");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const roundHistory = document.getElementById("round-history");

// Botones para ajustar la apuesta
document.getElementById("increase-bet").addEventListener("click", () => {
  currentBet += 5;
  betDisplay.textContent = currentBet;
});

document.getElementById("decrease-bet").addEventListener("click", () => {
  if (currentBet > 5) {
    currentBet -= 5;
    betDisplay.textContent = currentBet;
  }
});

// Iniciar el juego
startButton.addEventListener("click", () => {
  if (currentBet > balance) {
    alert("Saldo insuficiente");
    return;
  }

  startButton.disabled = true;
  stopButton.disabled = false;

  // Reiniciar multiplicador
  multiplier = 1.0;
  multiplierDisplay.textContent = multiplier.toFixed(2) + "x";

  // Incrementar multiplicador
  multiplierInterval = setInterval(() => {
    multiplier += 0.01;
    multiplierDisplay.textContent = multiplier.toFixed(2) + "x";
  }, 100);
});

// Detener el juego
stopButton.addEventListener("click", () => {
  clearInterval(multiplierInterval);
  startButton.disabled = false;
  stopButton.disabled = true;

  const winnings = (currentBet * multiplier).toFixed(2);
  balance += parseFloat(winnings) - currentBet;

  // Mostrar resultado
  const result = document.createElement("li");
  result.textContent = `Ganaste ${winnings} € con un multiplicador de ${multiplier.toFixed(2)}x`;
  result.style.color = "green";
  roundHistory.appendChild(result);

  alert(`¡Has ganado ${winnings} €!`);
});

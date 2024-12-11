let pegaso = document.getElementById('pegaso'); // Asegúrate de que tu imagen tenga este ID
let multiplicadorElement = document.getElementById('valorMultiplicador');
let startBtn = document.getElementById('startBtn');
let stopBtn = document.getElementById('stopBtn');
let multiplicador = 1.00;
let isRunning = false;
let gameInterval;
let pegasusAnimationDuration = 10000; // Duración de la animación de movimiento (en milisegundos)

// Función para iniciar la carrera
function startRace() {
  if (isRunning) return; // Si ya está corriendo, no hacer nada
  isRunning = true;
  stopBtn.disabled = false;
  startBtn.disabled = true;
  multiplicador = 1.00; // Resetear el multiplicador
  multiplicadorElement.textContent = `${multiplicador.toFixed(2)}x`;

  // Hacer visible el Pegaso
  pegaso.style.visibility = 'visible'; // Ahora será visible

  // Configurar posición inicial y transición para el movimiento
  pegaso.style.transition = `left ${pegasusAnimationDuration / 1000}s linear`; // Animación suave
  pegaso.style.left = '-200px'; // Comienza fuera de la pantalla (a la izquierda)
  pegaso.style.bottom = '0'; // Aseguramos que esté justo sobre el footer

  // Aumentar el multiplicador mientras el Pegaso se mueve
  let startTime = Date.now();
  gameInterval = setInterval(() => {
      let elapsedTime = (Date.now() - startTime) / 1000; // Tiempo transcurrido en segundos
      if (elapsedTime < pegasusAnimationDuration / 1000) {
          multiplicador = 1.00 + (elapsedTime / (pegasusAnimationDuration / 1000)) * 10; // Aumentar el multiplicador
          multiplicadorElement.textContent = `${multiplicador.toFixed(2)}x`;
      } else {
          clearInterval(gameInterval); // Detener el intervalo al finalizar el tiempo
      }
  }, 100);

  // Iniciar el movimiento del Pegaso
  setTimeout(() => {
      pegaso.style.left = '100%'; // Mover al lado derecho de la pantalla
  }, 100);
}


// Función para detener el juego y reiniciar todo
function stopRace() {
    clearInterval(gameInterval); // Detener el intervalo de aumento de multiplicador

    // Detener cualquier animación activa
    pegaso.style.transition = 'none'; // Quitar la transición para reiniciar instantáneamente
    pegaso.style.left = '-200px'; // Vuelve a la posición inicial fuera de pantalla
    pegaso.style.bottom = '0'; // Asegura que esté sobre el footer

    // Resetear el multiplicador
    multiplicador = 1.00;
    multiplicadorElement.textContent = `${multiplicador.toFixed(2)}x`;

    // Reactivar/desactivar botones
    stopBtn.disabled = true;
    startBtn.disabled = false;
    isRunning = false;
}

// Asignar eventos a los botones
startBtn.addEventListener('click', startRace);
stopBtn.addEventListener('click', stopRace);

// Función para mostrar y ocultar modales
const modalDepositar = document.querySelector(".modal-depositar");
const modalRetiro = document.querySelector(".modal-retiro");
const cerrarDepositar = modalDepositar.querySelector(".close");
const cerrarRetirar = modalRetiro.querySelector(".close-retirar");

const depositarBtn = document.querySelector(".depositar");
const retirarBtn = document.querySelector(".retirar");

function mostrarModal(modal) {
    modal.style.display = "flex";
}

function ocultarModal(modal) {
    modal.style.display = "none";
}

depositarBtn.addEventListener("click", () => mostrarModal(modalDepositar));
retirarBtn.addEventListener("click", () => mostrarModal(modalRetiro));

cerrarDepositar.addEventListener("click", () => ocultarModal(modalDepositar));
cerrarRetirar.addEventListener("click", () => ocultarModal(modalRetiro));

window.addEventListener("click", (event) => {
    if (event.target === modalDepositar) {
        ocultarModal(modalDepositar);
    }
    if (event.target === modalRetiro) {
        ocultarModal(modalRetiro);
    }
});

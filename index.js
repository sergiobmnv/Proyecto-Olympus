// Variables
let pegaso = document.getElementById('pegaso');
let multiplicadorElement = document.getElementById('valorMultiplicador');
let startBtn = document.getElementById('startBtn');
let stopBtn = document.getElementById('stopBtn');
let multiplicador = 1.00;
let isRunning = false;
let gameInterval;
let pegasusAnimationDuration = 5000; // Duración de la animación de movimiento (en milisegundos)

// Función para iniciar la carrera
function startRace() {
    if (isRunning) return; // Si ya está corriendo, no hacer nada
    isRunning = true;
    stopBtn.disabled = false;
    startBtn.disabled = true;
    multiplicador = 1.00; // Resetear el multiplicador
    multiplicadorElement.textContent = `${multiplicador.toFixed(2)}x`;

    // Empezar movimiento del Pegaso de izquierda a derecha
    pegaso.style.left = '-200px'; // Empezar desde fuera de la pantalla
    pegaso.style.transition = `left ${pegasusAnimationDuration / 1000}s linear`; // Establecer la duración de la animación

    // Aumentar el multiplicador mientras el Pegaso se mueve
    let startTime = Date.now();
    gameInterval = setInterval(() => {
        // Calculamos el tiempo transcurrido
        let elapsedTime = (Date.now() - startTime) / 1000; // Tiempo en segundos
        if (elapsedTime < pegasusAnimationDuration / 1000) {
            multiplicador = 1.00 + (elapsedTime / (pegasusAnimationDuration / 1000)) * 5; // Aumentar el multiplicador
            multiplicadorElement.textContent = `${multiplicador.toFixed(2)}x`;
        }
    }, 100);

    // Mover el Pegaso a la derecha
    setTimeout(() => {
        pegaso.style.left = '100%'; // Finaliza en el lado derecho de la pantalla
    }, 100);
}

// Función para detener el juego y reiniciar todo
function stopRace() {
    clearInterval(gameInterval); // Detener el intervalo de aumento de multiplicador
    
    // Eliminar la transición de movimiento para que no haya animación al resetear
    pegaso.style.transition = ''; 
    
    // Establecer el Pegaso en su posición inicial fuera de la pantalla
    pegaso.style.left = '-200px'; 
    
    // Resetear el multiplicador
    multiplicador = 1.00;
    multiplicadorElement.textContent = `${multiplicador.toFixed(2)}x`;

    // Desactivar botones
    stopBtn.disabled = true;
    startBtn.disabled = false;
    isRunning = false;
}

// Asignar eventos a los botones
startBtn.addEventListener('click', startRace);
stopBtn.addEventListener('click', stopRace);

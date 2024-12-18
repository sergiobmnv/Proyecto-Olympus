let saldo = 0.0; // Saldo inicial
let saldoElemento = document.getElementById('saldo'); // Elemento donde se mostrará el saldo
let apuestaInput = document.getElementById('apuesta'); // Campo de apuesta

let pegaso = document.getElementById('pegaso'); // Asegúrate de que tu imagen tenga este ID
let multiplicadorElement = document.getElementById('valorMultiplicador');
let startBtn = document.getElementById('startBtn');
let stopBtn = document.getElementById('stopBtn');
let multiplicador = 1.00;
let isRunning = false;
let gameInterval;
let pegasusAnimationDuration = 10000; // Duración de la animación de movimiento (en milisegundos)

// --- Nueva funcionalidad del meteorito ---
let meteoritoCayo = false; // Estado del meteorito
const probabilidadMeteorito = 0.05; // Probabilidad de caída del meteorito (5%)

// Función para verificar si cae el meteorito
function verificarMeteorito() {
  return Math.random() < probabilidadMeteorito;
}

// Función para mostrar mensaje cuando cae el meteorito
function mostrarMensajeMeteorito() {
  mostrarModalDerrota();
}

// Función para actualizar el saldo en pantalla
function actualizarSaldo() {
  saldoElemento.textContent = `Saldo: ${saldo.toFixed(2)}`; // Actualizamos el saldo en pantalla
}

// Verificar si hay saldo suficiente para jugar
function verificarSaldo() {
  const apuesta = parseFloat(apuestaInput.value);
  if (isNaN(apuesta) || apuesta <= 0) {
    mostrarMensaje("Por favor, ingresa una cantidad válida.");
    return false;
  }
  if (apuesta > saldo) {
    mostrarMensaje("No tienes suficiente saldo para realizar esta apuesta.");
    return false;
  }
  return true;
}

// Función para mostrar el modal con el premio (GIF) y detalles (multiplicador y ganancia)
function mostrarPremio(premio, multiplicador) {
  const modalPremio = document.getElementById('modalPremio');
  const mensajePremio = document.getElementById('mensajePremio');
  const multiplicadorPremio = document.getElementById('multiplicadorPremio');
  const premioTotal = document.getElementById('premioTotal');
  
  mensajePremio.textContent = `¡Felicidades! Has ganado $${premio.toFixed(2)}.`;
  multiplicadorPremio.textContent = `${multiplicador.toFixed(2)}x`;
  premioTotal.textContent = premio.toFixed(2);

  modalPremio.style.display = 'flex'; // Mostrar el modal con el premio
}

// Cerrar el modal de premio
const closeModalPremioBtn = document.querySelector('.close-premio');
closeModalPremioBtn.addEventListener('click', () => {
  document.getElementById('modalPremio').style.display = 'none';
});

// Función para iniciar la carrera
function startRace() {
  if (isRunning) return; // Si ya está corriendo, no hacer nada
  if (!verificarSaldo()) return; // Verificar si hay saldo suficiente

  const apuesta = parseFloat(apuestaInput.value);
  saldo -= apuesta; // Restamos la apuesta
  actualizarSaldo();

  isRunning = true;
  stopBtn.disabled = false;
  startBtn.disabled = true;
  multiplicador = 1.00; // Reiniciar el multiplicador
  multiplicadorElement.textContent = `${multiplicador.toFixed(2)}x`;

  meteoritoCayo = false; // Reiniciar el estado del meteorito

  // Configurar la animación del Pegaso
  pegaso.style.visibility = 'visible';
  pegaso.style.transition = `left ${pegasusAnimationDuration / 1000}s linear`;
  pegaso.style.left = '-200px';
  pegaso.style.bottom = '0';

  let startTime = Date.now();
  gameInterval = setInterval(() => {
    let elapsedTime = (Date.now() - startTime) / 1000;

    // Verificar si cae el meteorito
    if (verificarMeteorito() && !meteoritoCayo) {
      meteoritoCayo = true;
      mostrarMensajeMeteorito();
      stopRace(true); // Detener el juego debido al meteorito
    }

    // Aumentar el multiplicador si no ha caído el meteorito
    if (!meteoritoCayo) {
      multiplicador = 1.00 + (elapsedTime / (pegasusAnimationDuration / 1000)) * 10;
      multiplicadorElement.textContent = `${multiplicador.toFixed(2)}x`;
    }
  }, 100);

  setTimeout(() => {
    pegaso.style.left = '100%'; // Movimiento del Pegaso
  }, 100);
}

// Función para detener el juego
function stopRace(porMeteorito = false) {
  clearInterval(gameInterval);
  pegaso.style.transition = 'none';
  pegaso.style.left = '-200px';

  if (porMeteorito) {
    // Si cae el meteorito, no se gana nada
    multiplicador = 1.00;
  } else {
    const apuesta = parseFloat(apuestaInput.value);
    const premio = apuesta * multiplicador;
    saldo += premio;
    mostrarPremio(premio, multiplicador);
  }

  actualizarSaldo();
  multiplicador = 1.00;
  multiplicadorElement.textContent = `${multiplicador.toFixed(2)}x`;

  stopBtn.disabled = true;
  startBtn.disabled = false;
  isRunning = false;
}

// Asignar eventos a los botones
startBtn.addEventListener('click', startRace);
stopBtn.addEventListener('click', () => stopRace());

// Función para mostrar mensajes de error
function mostrarMensaje(texto, color = '#ff4d4d') {
  const mensajeElemento = document.getElementById('mensaje');
  mensajeElemento.textContent = texto;
  mensajeElemento.style.backgroundColor = color;
  mensajeElemento.classList.add('mostrar');

  setTimeout(() => {
    mensajeElemento.classList.remove('mostrar');
  }, 3000);
}

/*-------------------------------------------------------------------------------------------------------- */
// MODALES DE DEPOSITO, RETIRO.
const depositoModal = document.getElementById('depositoModal');
const depositoBtn = document.getElementById('depositarBtn');
const confirmarDepositoBtn = document.getElementById('confirmarDeposito');
const cantidadDepositoInput = document.getElementById('cantidadDeposito');
const closeModalBtn = document.querySelector('.close');

// Modal de retiro
const retiroModal = document.getElementById('retiroModal');
const retirarBtn = document.querySelector('.retirar');
const confirmarRetiroBtn = document.getElementById('confirmarRetiro');
const cantidadRetiroInput = document.getElementById('cantidadRetiro');
const closeRetirarModalBtn = document.querySelector('.close-retirar');

// Modal de Error de Retiro
const modalErrorRetiro = document.getElementById('modalErrorRetiro');
const mensajeErrorRetiro = document.getElementById('mensajeErrorRetiro');

// Modal de Error de Depósito
const modalErrorDeposito = document.getElementById('modalErrorDeposito');
const mensajeErrorDeposito = document.getElementById('mensajeErrorDeposito');

// Modal de Confirmación de Depósito Exitoso
const modalExitoDeposito = document.getElementById('modalExitoDeposito');

// Función para actualizar el saldo en pantalla
function actualizarSaldo() {
  saldoElemento.textContent = `Saldo: ${saldo.toFixed(2)}`; // Actualizamos el saldo en pantalla
}

// Función para mostrar el modal de error específico (Depósito)
function mostrarErrorDeposito(mensaje) {
  mensajeErrorDeposito.textContent = mensaje; // Mostramos el mensaje de error
  modalErrorDeposito.style.display = 'block'; // Mostramos el modal de error
}

// Función para mostrar el modal de error específico (Retiro)
function mostrarErrorRetiro(mensaje) {
  mensajeErrorRetiro.textContent = mensaje; // Mostramos el mensaje de error
  modalErrorRetiro.style.display = 'block'; // Mostramos el modal de error
}

// Función para mostrar el modal de éxito (Depósito realizado con éxito)
function mostrarExitoDeposito() {
  modalExitoDeposito.style.display = 'block'; // Mostramos el modal de éxito
}

// Cerrar los modales de error y éxito cuando el usuario hace clic en la 'X' (close)
document.querySelectorAll('.close-deposito').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    modalErrorDeposito.style.display = 'none';
    modalExitoDeposito.style.display = 'none';
  });
});

document.querySelectorAll('.close-retirar').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    modalErrorRetiro.style.display = 'none';
  });
});

// Cerrar los modales si se hace clic fuera de ellos
window.addEventListener('click', (event) => {
  if (event.target === modalErrorDeposito) {
    modalErrorDeposito.style.display = 'none';
  }
  if (event.target === modalExitoDeposito) {
    modalExitoDeposito.style.display = 'none';
  }
  if (event.target === modalErrorRetiro) {
    modalErrorRetiro.style.display = 'none';
  }
});

// Abrir modal de depósito
depositoBtn.addEventListener('click', () => {
  depositoModal.style.display = 'block';
});

// Cerrar modal de depósito
closeModalBtn.addEventListener('click', () => {
  depositoModal.style.display = 'none';
});

// Abrir modal de retiro
retirarBtn.addEventListener('click', () => {
  retiroModal.style.display = 'block';
});

// Cerrar modal de retiro
closeRetirarModalBtn.addEventListener('click', () => {
  retiroModal.style.display = 'none';
});

// Cerrar modales al hacer clic fuera de ellos
window.addEventListener('click', (event) => {
  if (event.target === depositoModal) {
    depositoModal.style.display = 'none';
  }
  if (event.target === retiroModal) {
    retiroModal.style.display = 'none';
  }
});

// Confirmar el depósito y actualizar saldo
confirmarDepositoBtn.addEventListener('click', () => {
  const cantidadDeposito = parseFloat(cantidadDepositoInput.value);

  // Validación para asegurarse de que la cantidad es un número válido y mayor que 0
  if (isNaN(cantidadDeposito) || cantidadDeposito <= 0) {
    mostrarErrorDeposito("Por favor, ingresa una cantidad válida.");
    return;
  }

  saldo += cantidadDeposito; // Aumentamos el saldo con la cantidad del depósito
  actualizarSaldo();
  depositoModal.style.display = 'none'; // Cerramos el modal
  mostrarExitoDeposito(); // Mostramos el mensaje de éxito
});

// Confirmar el retiro y actualizar saldo
confirmarRetiroBtn.addEventListener('click', () => {
  const cantidadRetiro = parseFloat(cantidadRetiroInput.value);

  // Validación para asegurarse de que la cantidad de retiro es válida
  if (isNaN(cantidadRetiro) || cantidadRetiro <= 0 || cantidadRetiro > saldo) {
    mostrarErrorRetiro("No tienes suficiente saldo para retirar esa cantidad.");
    return;
  }

  saldo -= cantidadRetiro; // Restamos la cantidad del saldo
  actualizarSaldo();
  retiroModal.style.display = 'none'; // Cerramos el modal
});
/*----------------------------------------------------------------------------------------------------*/
// Función para mostrar el modal de derrota
function mostrarModalDerrota() {
  const modalDerrota = document.getElementById('modalDerrotaUnico');
  modalDerrota.style.display = 'flex'; // Mostrar el modal
}

// Función para cerrar el modal de derrota
function cerrarModalDerrota() {
  const modalDerrota = document.getElementById('modalDerrotaUnico');
  modalDerrota.style.display = 'none'; // Ocultar el modal
}

// Cerrar el modal al hacer clic en la 'X' o fuera del modal
document.querySelector('.cerrar-modal-derrota').addEventListener('click', cerrarModalDerrota);

window.addEventListener('click', (event) => {
  const modalDerrota = document.getElementById('modalDerrotaUnico');
  if (event.target === modalDerrota) {
    cerrarModalDerrota();
  }
});

/*--------------------------------------------------------------------------------*/
// URLs de las imágenes
const imageUrls = [
  'Assets/Fondo-6.jpg',
  'Assets/gif-derrota.gif',
  'Assets/Gif-Premio.gif',
  'Assets/Pegaso.gif'
];

// Crear el Worker
const worker = new Worker('Workers.js');

// Enviar las URLs al Worker
worker.postMessage(imageUrls);

// Manejar los mensajes del Worker
worker.onmessage = function (e) {
  if (e.data.success) {
      const container = document.getElementById('contenedor-juego');
      e.data.images.forEach((imageUrl) => {
          const img = document.createElement('img');
          img.src = imageUrl;
          img.alt = 'Loaded Image';
          img.style.margin = '10px';
          container.appendChild(img);
      });
  } else {
      console.error('Error loading images:', e.data.error);
  }
};

// Manejar errores en el Worker
worker.onerror = function (e) {
  console.error('Worker error:', e.message);
};
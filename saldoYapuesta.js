let saldo = 0.0; // Inicializamos el saldo a 0
let saldoElemento = document.getElementById('saldo'); // Elemento donde se mostrará el saldo

// Modal de depósito
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

    saldo += cantidadDeposito; // Actualizamos el saldo
    actualizarSaldo(); // Mostramos el saldo actualizado

    // Limpiar y cerrar el modal de depósito
    cantidadDepositoInput.value = '';
    depositoModal.style.display = 'none';

    // Mostrar modal de éxito de depósito
    mostrarExitoDeposito();
});

// Confirmar el retiro y actualizar saldo
confirmarRetiroBtn.addEventListener('click', () => {
    const cantidadRetiro = parseFloat(cantidadRetiroInput.value);

    // Validación para asegurarse de que la cantidad es un número válido y mayor que 0
    if (isNaN(cantidadRetiro) || cantidadRetiro <= 0) {
        mostrarErrorRetiro("Por favor, ingresa una cantidad válida.");
        return;
    }

    if (cantidadRetiro > saldo) {
        mostrarErrorRetiro("No tienes suficiente saldo para retirar esa cantidad.");
        return;
    }

    saldo -= cantidadRetiro; // Actualizamos el saldo
    actualizarSaldo(); // Mostramos el saldo actualizado

    // Limpiar y cerrar el modal de retiro
    cantidadRetiroInput.value = '';
    retiroModal.style.display = 'none';
});

// Mostrar mensaje de error en el modal principal
function mostrarMensaje(texto, color = '#ff4d4d') {
    const mensajeElemento = document.getElementById('mensaje');
    mensajeElemento.textContent = texto;
    mensajeElemento.style.backgroundColor = color;
    mensajeElemento.classList.add('mostrar');

    setTimeout(() => {
        mensajeElemento.classList.remove('mostrar');
    }, 3000);
}

// Inicializar el saldo en pantalla
actualizarSaldo();


// JavaScript para abrir y cerrar el modal
function mostrarModal() {
    document.getElementById('modal').style.display = 'block';
}

function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
}

// Cerrar modal al hacer clic en la X
document.querySelector('.close').addEventListener('click', cerrarModal);

// Cerrar modal si el usuario hace clic fuera del contenido del modal
window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) {
        cerrarModal();
    }
}

// Función para capturar los datos del formulario en el modal
function confirmarReserva() {
    // Captura de los valores de los inputs
    const idMesa = document.getElementById('id-mesa').value;
    const fechaReserva = document.getElementById('fecha-reserva').value;
    const horaReserva = document.getElementById('hora-reserva').value;
    const numeroPersonas = document.getElementById('numero-personas').value;

    // Muestra los datos en la consola (puedes hacer otra acción aquí)
    console.log(`ID Mesa: ${idMesa}`);
    console.log(`Fecha Reserva: ${fechaReserva}`);
    console.log(`Hora Reserva: ${horaReserva}`);
    console.log(`Número de Personas: ${numeroPersonas}`);

    // Aquí podrías enviar los datos a un servidor o procesarlos de alguna otra forma.
    
    // Cerrar el modal después de la reserva
    cerrarModal();
}

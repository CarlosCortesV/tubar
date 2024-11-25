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
function formatTime(hora) {
    // Asegura que la hora tiene el formato correcto
    const parts = hora.split(':');
    if (parts.length === 2) {
        return `${parts[0]}:${parts[1]}:00`; // Añadir los segundos como 00
    }
    return hora; // Si ya está en el formato correcto, devuelve la hora
}

// Función para capturar los datos del formulario en el modal
async function confirmarReserva() {
    // Captura de los valores de los inputs
    const idMesa = document.getElementById('id-mesa').value;
    const fechaReserva = document.getElementById('fecha-reserva').value;
    const horaReserva = document.getElementById('hora-reserva').value;
    const numeroPersonas = document.getElementById('numero-personas').value;
    const idUsuario = document.getElementById('userid').value;
    const idBar = document.getElementById('id_bar').value;

    // Muestra los datos en la consola (puedes hacer otra acción aquí)
    console.log(`ID Usuario: ${idUsuario}`);
    console.log(`ID Mesa: ${idMesa}`);
    console.log(`Fecha Reserva: ${fechaReserva}`);
    console.log(`Hora Reserva: ${horaReserva}`);
    console.log(`Número de Personas: ${numeroPersonas}`);

    // Enviar los datos al servidor (API para insertar la reserva)
    try {
        const response = await fetch('/api/reservar/insertar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_usuario: idUsuario,
                id_bar: idBar,  // Suponiendo que tienes el id_bar, lo puedes obtener de algún lado, como del formulario
                id_mesa: idMesa,
                fecha_reserva: fechaReserva,
                hora_reserva: horaReserva,
                numero_personas: numeroPersonas
            })
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Reserva creada:', result);
            alert('Reserva realizada con éxito');
        } else {
            console.error('Error al crear la reserva:', result);
            alert('Error al realizar la reserva');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Hubo un problema al realizar la reserva');
    }

    // Cerrar el modal después de la reserva
    cerrarModal();
}



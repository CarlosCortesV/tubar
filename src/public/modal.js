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
function confirmarReserva() {
    const id_bar = 1
    const id_mesa = document.getElementById('id-mesa').value;
    const fecha_reserva = document.getElementById('fecha-reserva').value;
    const hora_reserva = formatTime(document.getElementById('hora-reserva').value);
    const numero_personas = document.getElementById('numero-personas').value;

    if (!id_bar || !id_mesa || !fecha_reserva || !hora_reserva || !numero_personas) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    fetch('/api/reservas/insertar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_bar, id_mesa, fecha_reserva, hora_reserva, numero_personas })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            cerrarModal();
        } else if (data.error) {
            alert("Gracias!");
        }
    })
    .catch(error => console.error("Error en la solicitud:", error));
}



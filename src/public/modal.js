// JavaScript para abrir y cerrar el modal
function mostrarModal(barId) {
    // Almacenar el barId en el modal
    modal.setAttribute('data-bar-id', barId);

    // Mostrar el modal
    modal.style.display = 'block';
}


closeBtn.onclick = function() {
    modal.style.display = 'none';
    modal.removeAttribute('data-bar-id'); // Limpia el barId del modal al cerrarlo
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        modal.removeAttribute('data-bar-id'); // Limpia el barId del modal
    }
};
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
    const id_bar = modal.getAttribute('data-bar-id');
    const id_usuario = document.getElementById('userid').textContent;
    const id_mesa = document.getElementById('id-mesa').value;
    const fecha_reserva = document.getElementById('fecha-reserva').value;
    const hora_reserva = formatTime(document.getElementById('hora-reserva').value);
    const numero_personas = document.getElementById('numero-personas').value;

    if (!id_bar || !id_usuario || !id_mesa || !fecha_reserva || !hora_reserva || !numero_personas) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    fetch('/api/reservas/insertar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_bar, id_usuario, id_mesa, fecha_reserva, hora_reserva, numero_personas })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert("Reserva creada con éxito.");
            modal.style.display = 'none';
            modal.removeAttribute('data-bar-id');
        } else if (data.error) {
            alert("Error al crear la reserva.");
        }
    })
    .catch(error => console.error("Error en la solicitud:", error));
}



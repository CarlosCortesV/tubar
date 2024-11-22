// app.js
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/bares');
        const bares = await response.json();

        const baresList = document.querySelector('.card-container'); // Actualiza la referencia correcta
        bares.forEach(bar => {
            const barCard = document.createElement('div');
            barCard.classList.add('card'); // Cambia la clase a 'card' para coincidir con el HTML
            barCard.innerHTML = `
                <img src="img/default-bar.jpg" alt="Imagen de ${bar.nombre_bar}">
                <h3>${bar.nombre_bar}</h3>
                <p>Ubicación: ${bar.ubicación}</p>
                <p>Teléfono: ${bar.teléfono}</p>
                <p>Contacto: ${bar.email_contacto}</p>
                <p>Descripción: ${bar.descripción}</p>
                <p>Horario: ${bar.horario_apertura} - ${bar.horario_cierre}</p>
                <p>Capacidad Máxima: ${bar.capacidad_maxima}</p>
                <button class="reservar-btn" onclick="mostrarModal()">Reservar</button> <!-- Usa mostrarModal() -->
            `;
            baresList.appendChild(barCard);
        });

    } catch (error) {
        console.error('Error al cargar los bares:', error);
    }
});

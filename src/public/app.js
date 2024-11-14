// app.js
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/bares');
        const bares = await response.json();

        const baresList = document.getElementById('card-container');
        bares.forEach(bar => {
            const barCard = document.createElement('div');
            barCard.classList.add('card');
            barCard.innerHTML = `
                <h3>${bar.nombre_bar}</h3>
                <p>Ubicación: ${bar.ubicación}</p>
                <p>Teléfono: ${bar.teléfono}</p>
                <p>Contacto: ${bar.email_contacto}</p>
                <p>Descripción: ${bar.descripción}</p>
                <p>Horario: ${bar.horario_apertura} - ${bar.horario_cierre}</p>
                <p>Capacidad Máxima: ${bar.capacidad_maxima}</p>
                <button class="reservar-btn">Reservar</button>
            `;
            baresList.appendChild(barCard);
        });
    } catch (error) {
        console.error('Error al cargar los bares:', error);
    }
});

const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');

function abrirModal(barId) {
    fetch(`/api/bares/${barId}`)
        .then(response => response.json())
        .then(bar => {
            document.getElementById('bar-details').innerText = `${bar.nombre} - ${bar.descripcion}`;
            modal.style.display = 'block';
        })
        .catch(error => console.error('Error al obtener detalles del bar:', error));
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};


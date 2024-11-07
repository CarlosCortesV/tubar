// Seleccionamos los elementos necesarios
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');
const reservarBtns = document.querySelectorAll('.reservar-btn');
const barDetails = document.getElementById('bar-details');

// Función para mostrar el modal con los detalles del bar
reservarBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const barName = btn.previousElementSibling.previousElementSibling.textContent;
        const barDesc = btn.previousElementSibling.textContent;

        // Agregamos la información del bar en el modal
        barDetails.innerHTML = `<strong>${barName}</strong><br>${barDesc}`;
        modal.style.display = 'flex';
    });
});

// Función para cerrar el modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar modal al hacer clic fuera de él
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});
const barRoutes = require('./routes/barRoutes');
app.use('/api/bares', barRoutes);

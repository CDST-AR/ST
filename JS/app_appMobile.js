// Función para ocultar todas las secciones y mostrar solo la seleccionada
function showSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Mostrar la sección seleccionada
    const selectedSection = document.querySelector(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
}

// Escuchar los clics en los enlaces del índice
document.querySelectorAll('.sidebar ul li a').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
        const sectionId = this.getAttribute('href'); // Obtener el id de la sección
        showSection(sectionId); // Mostrar la sección correspondiente
    });
});

// Mostrar la primera sección al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    showSection('#requerimientos'); // Cambia este id si prefieres otra sección
});

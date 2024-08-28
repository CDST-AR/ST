// Inicializa EmailJS con tu clave pública
emailjs.init('abcCukMQrcQF9kmf4'); // Reemplaza con tu clave pública

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const btn = document.getElementById('button');
    btn.value = 'Enviando...';

    const serviceID = 'default_service'; // Reemplaza con tu Service ID
    const templateID = 'template_vgdc6to'; // Reemplaza con tu Template ID

    emailjs.sendForm(serviceID, templateID, this)
        .then((response) => {
            console.log('Éxito:', response);
            btn.value = 'Enviar Pedido';
            alert('¡Pedido enviado exitosamente!');
        })
        .catch((err) => {
            console.error('Error:', err);
            btn.value = 'Enviar Pedido';
            alert('Hubo un error al enviar el pedido. Inténtalo de nuevo.');
        });
});

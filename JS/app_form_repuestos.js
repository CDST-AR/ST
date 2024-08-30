// Inicializa EmailJS con tu clave pública
emailjs.init('abcCukMQrcQF9kmf4'); // Reemplaza con tu clave pública

document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const btn = document.getElementById('button');
    btn.value = 'Enviando...';

    const serviceID = 'default_service'; // Reemplaza con tu Service ID
    const templateID = 'template_vgdc6to'; // Reemplaza con tu Template ID

    const form = this;

    // Crear una lista de artículos
    const articles = document.querySelectorAll('.recuadro-articulo-cantidad');
    let articleList = '';

    articles.forEach((article, index) => {
        const articleInput = article.querySelector('input[name^="articulo_"]');
        const quantityInput = article.querySelector('input[name^="cantidad_"]');
        
        const articulo = articleInput ? articleInput.value : 'No especificado';
        const cantidad = quantityInput ? quantityInput.value : 'No especificado';
        
        articleList += `Artículo: ${articulo}, Cantidad: ${cantidad}\n`;
    });

    // Añadir el listado de artículos al formulario
    const articleListInput = document.createElement('input');
    articleListInput.setAttribute('type', 'hidden');
    articleListInput.setAttribute('name', 'article_list');
    articleListInput.setAttribute('value', articleList);
    form.appendChild(articleListInput);

    emailjs.sendForm(serviceID, templateID, form)
        .then((response) => {
            console.log('Éxito:', response);
            btn.value = 'Enviar Pedido';
            alert('¡Pedido enviado exitosamente!');
            // Redirigir a index.html
            window.location.href = 'index.html';
        })
        .catch((err) => {
            console.error('Error:', err);
            btn.value = 'Enviar Pedido';
            alert('Hubo un error al enviar el pedido. Inténtalo de nuevo.');
        });
});

let articleIndex = 1;  // Inicializa un índice para los artículos

document.getElementById('add-article-btn').addEventListener('click', function () {
    // Crear un nuevo bloque para el artículo y cantidad
    const container = document.createElement('div');
    container.classList.add('recuadro-articulo-cantidad');
    
    const articleField = document.createElement('div');
    articleField.classList.add('field', 'articulo-container');
    
    const articleLabel = document.createElement('label');
    articleLabel.setAttribute('for', `articulo_${articleIndex}`);
    articleLabel.textContent = 'Artículo:'; // Quitar el índice
    
    const inputWrapper = document.createElement('div');
    inputWrapper.classList.add('input-wrapper');
    
    const articleInput = document.createElement('input');
    articleInput.setAttribute('type', 'text');
    articleInput.setAttribute('name', `articulo_${articleIndex}`);
    articleInput.setAttribute('id', `articulo_${articleIndex}`);
    articleInput.setAttribute('required', 'required');
    
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.classList.add('remove-article-btn');
    removeBtn.textContent = '-';
    
    removeBtn.addEventListener('click', function () {
        container.remove(); // Eliminar el bloque de artículo y cantidad
    });
    
    inputWrapper.appendChild(articleInput);
    inputWrapper.appendChild(removeBtn);
    
    articleField.appendChild(articleLabel);
    articleField.appendChild(inputWrapper);
    
    const quantityField = document.createElement('div');
    quantityField.classList.add('field');
    
    const quantityLabel = document.createElement('label');
    quantityLabel.setAttribute('for', `cantidad_${articleIndex}`);
    quantityLabel.textContent = 'Cantidad:'; // Quitar el índice
    
    const quantityInput = document.createElement('input');
    quantityInput.setAttribute('type', 'number');
    quantityInput.setAttribute('name', `cantidad_${articleIndex}`);
    quantityInput.setAttribute('id', `cantidad_${articleIndex}`);
    quantityInput.setAttribute('required', 'required');
    
    quantityField.appendChild(quantityLabel);
    quantityField.appendChild(quantityInput);
    
    container.appendChild(articleField);
    container.appendChild(quantityField);
    
    document.getElementById('articulos-container').appendChild(container);
    
    articleIndex++;  // Incrementa el índice
});


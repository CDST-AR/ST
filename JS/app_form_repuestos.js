// Importa los módulos de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Configura Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD1QzjOS2hp46d75kPlhHf0xmV8e5nkJSA",
    authDomain: "powergym-abb76.firebaseapp.com",
    databaseURL: "https://powergym-abb76-default-rtdb.firebaseio.com",
    projectId: "powergym-abb76",
    storageBucket: "powergym-abb76.appspot.com",
    messagingSenderId: "305991448119",
    appId: "1:305991448119:web:161322518952422e5531b2"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

// Maneja el estado de autenticación del usuario
onAuthStateChanged(auth, (user) => {
    const usernameElement = document.getElementById("username");
    const logoutLink = document.getElementById("logout-link");

    if (user) {
        console.log("Usuario autenticado:", user);

        // Obtener el nombre o email del usuario
        const userNameOrEmail = user.displayName || user.email || "Usuario";
        const username = user.email ? user.email.split('@')[0] : userNameOrEmail;

        // Mostrar el nombre o el email (sin '@' y lo que sigue) del usuario
        usernameElement.textContent = username;

        // Manejador de clic en el enlace de salida
        if (logoutLink) {
            logoutLink.addEventListener('click', (event) => {
                event.preventDefault();
                signOut(auth).then(() => {
                    console.log("Cierre de sesión exitoso");
                    window.location.href = 'principal.html';  // Redirigir a la página de inicio de sesión
                }).catch((error) => {
                    console.error("Error al cerrar sesión:", error.message);
                });
            });
        }
    } else {
        console.log("No hay usuario autenticado.");
        window.location.href = 'index.html'; // Redirigir a la página de inicio de sesión si no está autenticado
    }
});

// Configura la fecha actual en el campo de fecha automáticamente
document.addEventListener('DOMContentLoaded', function () {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fecha').value = today;
});

// Inicializa EmailJS con tu clave pública
emailjs.init('abcCukMQrcQF9kmf4'); // Reemplaza con tu clave pública

document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const btn = document.getElementById('button');
    btn.value = 'Enviando...';

    const serviceID = 'default_service'; // Reemplaza con tu Service ID
    const templateID = 'template_vgdc6to'; // Reemplaza con tu Template ID

    const form = this;

    // Crear una lista de repuestos
    const repuestos = document.querySelectorAll('.recuadro-repuesto-cantidad');
    let repuestoList = '';

    repuestos.forEach((repuesto, index) => {
        const repuestoInput = repuesto.querySelector('input[name^="repuesto_"]');
        const quantityInput = repuesto.querySelector('input[name^="cantidad_"]');

        const repuestoValue = repuestoInput ? repuestoInput.value : 'No especificado';
        const cantidad = quantityInput ? quantityInput.value : 'No especificado';

        repuestoList += `Repuesto: ${repuestoValue}, Cantidad: ${cantidad}\n`;
    });

    // Añadir el listado de repuestos al formulario
    const repuestoListInput = document.createElement('input');
    repuestoListInput.setAttribute('type', 'hidden');
    repuestoListInput.setAttribute('name', 'repuesto_list');
    repuestoListInput.setAttribute('value', repuestoList);
    form.appendChild(repuestoListInput);

    

    // Captura el archivo de foto (si se ha subido)
    const photoInput = document.getElementById('photo');
    const photoFile = photoInput.files[0];
    
    if (photoFile) {
        // Subir la foto a Firebase Storage
        const storageRef = ref(storage, `fotos/${photoFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, photoFile);
    
        uploadTask.on('state_changed',
            (snapshot) => {
                // Progreso de la subida (opcional)
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Subida: ${progress}% completado`);
            },
            (error) => {
                console.error('Error al subir la foto:', error);
                btn.value = 'Enviar Pedido';
                alert('Hubo un error al subir la foto. Inténtalo de nuevo.');
            },
            async () => {
                // Foto subida con éxito
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log('URL de la foto:', downloadURL);
    
                    // Añadir la URL de la foto al formulario
                    const photoUrlInput = document.createElement('input');
                    photoUrlInput.setAttribute('type', 'hidden');
                    photoUrlInput.setAttribute('name', 'photo_url');
                    photoUrlInput.setAttribute('value', downloadURL);
                    form.appendChild(photoUrlInput);
    
                    // Después de subir la foto, enviar el formulario
                    enviarFormulario(form, serviceID, templateID, btn);
                } catch (error) {
                    console.error('Error al obtener la URL de la foto:', error);
                    btn.value = 'Enviar Pedido';
                    alert('Hubo un error al obtener la URL de la foto. Inténtalo de nuevo.');
                }
            }
        );
    } else {
        // Si no hay foto, enviar directamente el formulario
        enviarFormulario(form, serviceID, templateID, btn);
    }
    
});

// Función para enviar el formulario con EmailJS
function enviarFormulario(form, serviceID, templateID, btn) {
    emailjs.sendForm(serviceID, templateID, form)
        .then((response) => {
            console.log('Éxito:', response);
            btn.value = 'Enviar Pedido';
            alert('¡Pedido enviado exitosamente!');
            window.close();
        })
        .catch((err) => {
            console.error('Error:', err);
            btn.value = 'Enviar Pedido';
            alert('Hubo un error al enviar el pedido. Inténtalo de nuevo.');
        });
}

// Maneja la adición dinámica de repuestos al formulario
let repuestoIndex = 1;  // Inicializa un índice para los repuestos

document.getElementById('add-repuesto-btn').addEventListener('click', function () {
    // Crear un nuevo bloque para el repuesto y cantidad
    const container = document.createElement('div');
    container.classList.add('recuadro-repuesto-cantidad');

    const repuestoField = document.createElement('div');
    repuestoField.classList.add('field', 'repuesto-container');

    const repuestoLabel = document.createElement('label');
    repuestoLabel.setAttribute('for', `repuesto_${repuestoIndex}`);
    repuestoLabel.textContent = 'Repuesto:'; // Quitar el índice

    const inputWrapper = document.createElement('div');
    inputWrapper.classList.add('input-wrapper');

    const repuestoInput = document.createElement('input');
    repuestoInput.setAttribute('type', 'text');
    repuestoInput.setAttribute('name', `repuesto_${repuestoIndex}`);
    repuestoInput.setAttribute('id', `repuesto_${repuestoIndex}`);
    repuestoInput.setAttribute('required', 'required');

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.classList.add('remove-repuesto-btn');
    removeBtn.textContent = '-';

    removeBtn.addEventListener('click', function () {
        container.remove(); // Eliminar el bloque de repuesto y cantidad
    });

    inputWrapper.appendChild(repuestoInput);
    inputWrapper.appendChild(removeBtn);

    repuestoField.appendChild(repuestoLabel);
    repuestoField.appendChild(inputWrapper);

    const quantityField = document.createElement('div');
    quantityField.classList.add('field');

    const quantityLabel = document.createElement('label');
    quantityLabel.setAttribute('for', `cantidad_${repuestoIndex}`);
    quantityLabel.textContent = 'Cantidad:'; // Quitar el índice

    const quantityInput = document.createElement('input');
    quantityInput.setAttribute('type', 'number');
    quantityInput.setAttribute('name', `cantidad_${repuestoIndex}`);
    quantityInput.setAttribute('id', `cantidad_${repuestoIndex}`);
    quantityInput.setAttribute('required', 'required');

    quantityField.appendChild(quantityLabel);
    quantityField.appendChild(quantityInput);

    container.appendChild(repuestoField);
    container.appendChild(quantityField);

    document.getElementById('repuestos-container').appendChild(container);

    repuestoIndex++;  // Incrementa el índice
});

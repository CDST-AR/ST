<<<<<<< HEAD
// Configuración de Firebase
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
firebase.initializeApp(firebaseConfig);

// Autenticación
const auth = firebase.auth();

// Elementos del DOM
const loginForm = document.getElementById('login-form');
const spinner = document.getElementById('loading-spinner');
const errorMessage = document.getElementById('error-message');

// Manejador de inicio de sesión
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Mostrar el spinner
    spinner.style.display = 'block';

    try {
        await auth.signInWithEmailAndPassword(email, password);

        // Agregar un retardo antes de redirigir después del login exitoso
        setTimeout(() => {
            window.location.href = "principal.html";
        }, 3000); // Retardo de 10 segundos

    } catch (error) {
        errorMessage.textContent = "Usuario o clave incorrecta"; // Mensaje genérico para el error
    } finally {
        // Ocultar el spinner después de que termine el proceso
        setTimeout(() => {
            spinner.style.display = 'none';
        }, 3000); // Ocultar spinner después de 10 segundos
    }
});
=======
// Configuración de Firebase
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
firebase.initializeApp(firebaseConfig);

// Autenticación
const auth = firebase.auth();

// Elementos del DOM
const loginForm = document.getElementById('login-form');
const spinner = document.getElementById('loading-spinner');
const errorMessage = document.getElementById('error-message');

// Manejador de inicio de sesión
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Mostrar el spinner
    spinner.style.display = 'block';

    try {
        await auth.signInWithEmailAndPassword(email, password);

        // Agregar un retardo antes de redirigir después del login exitoso
        setTimeout(() => {
            window.location.href = "principal.html";
        }, 3000); // Retardo de 10 segundos

    } catch (error) {
        errorMessage.textContent = "Usuario o clave incorrecta"; // Mensaje genérico para el error
    } finally {
        // Ocultar el spinner después de que termine el proceso
        setTimeout(() => {
            spinner.style.display = 'none';
        }, 3000); // Ocultar spinner después de 10 segundos
    }
});
>>>>>>> 8cc800f98792c52f5414208a22303f50f1c5bf0f

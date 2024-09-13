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
            // Redirige o realiza alguna acción después del login exitoso
            window.location.href = "principal.html";
        }, 2000); // Retardo de 2 segundos antes de la redirección

    } catch (error) {
        errorMessage.textContent = "Usuario o clave incorrecta"; // Mensaje genérico para el error
    } finally {
        // Ocultar el spinner después de que termine el proceso, independientemente del resultado
        setTimeout(() => {
            spinner.style.display = 'none';
        }, 2000); // Ocultar spinner después de 2 segundos
    }
});

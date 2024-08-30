import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';

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

// Obtén la autenticación
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
                    window.location.href = 'index.html';  // Redirigir a la página de inicio de sesión
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

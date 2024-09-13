import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { getFirestore, doc, getDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

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
const auth = getAuth(app);
const firestore = getFirestore(app);

// Maneja el estado de autenticación del usuario
onAuthStateChanged(auth, async (user) => {
    const usernameElement = document.getElementById("username");
    const logoutLink = document.getElementById("logout-link");
    const adminRegisterElement = document.getElementById("admin-register");

    if (user) {
        console.log("Usuario autenticado:", user);
        usernameElement.textContent = user.email.split('@')[0];

        try {
            // Verifica si el usuario es administrador en Firestore
            const userDocSnap = await getDoc(doc(firestore, "users", user.uid));
            adminRegisterElement.style.display = userDocSnap.exists() && userDocSnap.data().role === "admin" ? 'block' : 'none';
        } catch (error) {
            console.error("Error al obtener los datos del usuario:", error);
            adminRegisterElement.style.display = 'none';
        }

        // Manejador de clic en el enlace de salida
        if (logoutLink) {
            logoutLink.addEventListener('click', async (event) => {
                event.preventDefault();

                try {
                    // Cierra sesión
                    await signOut(auth);
                    console.log("Cierre de sesión exitoso");

                    // Redirige al usuario a la página de inicio de sesión
                    window.location.href = 'index.html';
                } catch (error) {
                    console.error("Error al cerrar sesión:", error.message);
                }
            });
        }

    }
});

// Maneja el cambio de fondo del navbar y su visibilidad en función del scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const pfSection = document.querySelector('.pf');
    const cmSection = document.querySelector('.cm');

    const pfPosition = pfSection.getBoundingClientRect().top;
    const cmPosition = cmSection.getBoundingClientRect().top;

    navbar.classList.toggle('white-bg', pfPosition <= 50);
    navbar.classList.toggle('shrink', cmPosition <= 50);
});

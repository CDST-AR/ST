import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

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
    const adminRegisterElement = document.getElementById("admin-register"); // Elemento de registro de administrador

    if (user) {
        console.log("Usuario autenticado:", user);

        // Obtener el nombre o email del usuario
        const userNameOrEmail = user.displayName || user.email || "Usuario";
        const username = user.email ? user.email.split('@')[0] : userNameOrEmail;

        // Mostrar el nombre o el email (sin '@' y lo que sigue) del usuario
        usernameElement.textContent = username;

        try {
            // Verifica si el usuario es administrador en Firestore
            const userDocRef = doc(firestore, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                if (userData.role === "admin") {
                    // Mostrar el ítem de registro de administrador si es admin
                    adminRegisterElement.style.display = 'block';
                } else {
                    // Ocultar el ítem de registro de administrador si no es admin
                    adminRegisterElement.style.display = 'none';
                }
            } else {
                console.log("No se encontró el documento del usuario en Firestore.");
                // Ocultar el ítem de registro de administrador si no se encuentra el documento
                adminRegisterElement.style.display = 'none';
            }
        } catch (error) {
            console.error("Error al obtener los datos del usuario:", error);
            // Ocultar el ítem de registro de administrador en caso de error
            adminRegisterElement.style.display = 'none';
        }

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



window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const pfSection = document.querySelector('.pf');
    const cmSection = document.querySelector('.cm');
  
    const pfPosition = pfSection.getBoundingClientRect().top;
    const cmPosition = cmSection.getBoundingClientRect().top;
  
    // Cambia el color de fondo a blanco cuando estés en la sección .qs
    if (pfPosition <= 50) { 
      navbar.classList.add('white-bg');
    } else {
      navbar.classList.remove('white-bg');
    }
  
  // Desaparece el navbar cuando estés en la sección .pf de forma suave
  if (cmPosition <= 50) {
    navbar.classList.add('shrink');
  } else {
    navbar.classList.remove('shrink');
  }
  });
  
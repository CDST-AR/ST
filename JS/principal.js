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

        const username = user.email.split('@')[0];
        usernameElement.textContent = username;

        try {
            // Verifica si el usuario es administrador en Firestore
            const userDocRef = doc(firestore, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                if (userData.role === "admin") {
                    adminRegisterElement.style.display = 'block';
                } else {
                    adminRegisterElement.style.display = 'none';
                }
            } else {
                console.log("No se encontró el documento del usuario en Firestore.");
                adminRegisterElement.style.display = 'none';
            }
        } catch (error) {
            console.error("Error al obtener los datos del usuario:", error);
            adminRegisterElement.style.display = 'none';
        }

        // Manejador de clic en el enlace de salida
        if (logoutLink) {
            logoutLink.addEventListener('click', async (event) => {
                event.preventDefault();

                try {
                    // Referencia al documento del usuario en Firestore
                    const userRef = doc(firestore, 'users', user.uid);

                    // Actualizar el estado de conexión a 'false'
                    await updateDoc(userRef, {
                        connected: false
                    });

                    console.log("Estado de conexión actualizado a 'false'.");

                    // Cerrar sesión
                    await signOut(auth);
                    console.log("Cierre de sesión exitoso");

                    // Redirigir al usuario a la página de inicio de sesión
                    window.location.href = 'index.html';

                } catch (error) {
                    console.error("Error al cerrar sesión:", error.message);
                }
            });
        }
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
  
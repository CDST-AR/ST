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

// Generar un ID de sesión único para la sesión actual
let sessionId = Math.random().toString(36).substr(2, 9);

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

                // Verificar el currentSession
                if (userData.currentSession !== sessionId) {
                    console.log("La sesión actual no es válida. Redirigiendo al inicio de sesión...");

                    // Actualizar el estado de conexión a 'false' y limpiar el campo 'currentSession'
                    await updateDoc(userDocRef, {
                        connected: false,
                        currentSession: ''  // Limpiar el campo currentSession
                    });

                    // Cerrar sesión
                    await signOut(auth);

                    // Redirigir al usuario a la página de inicio de sesión
                    window.location.href = 'index.html';
                    return; // Salir de la función para evitar continuar
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

                    // Actualizar el estado de conexión a 'false' y limpiar el campo 'currentSession'
                    await updateDoc(userRef, {
                        connected: false,
                        currentSession: ''  // Limpiar el campo currentSession
                    });

                    console.log("Estado de conexión actualizado a 'false' y sesión actual vaciada.");

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

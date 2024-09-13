import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
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

// Generar un ID de sesión único y almacenarlo en localStorage
let sessionId = Math.random().toString(36).substr(2, 9);
localStorage.setItem('sessionId', sessionId);  // Guardar el sessionId en localStorage

// Manejador de inicio de sesión
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Intenta iniciar sesión con las credenciales proporcionadas
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Inicio de sesión exitoso:", user.email);

        // Referencia al documento del usuario en Firestore
        const userRef = doc(firestore, 'users', user.uid);

        // Actualiza Firestore con el nuevo sessionId, lastLogin y pone connected a true
        await updateDoc(userRef, {
            currentSession: sessionId,
            lastLogin: new Date(),
            connected: true
        });

        // Redirige al usuario a la página principal
        window.location.href = 'principal.html';

    } catch (error) {
        console.error("Error al iniciar sesión:", error.message);
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = "Usuario o clave incorrecta";
    }
});


// Escuchar cambios en el estado de autenticación
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("Usuario autenticado:", user.email);

        const userRef = doc(firestore, 'users', user.uid);

        // Retraso para permitir que Firestore se sincronice
        await new Promise(resolve => setTimeout(resolve, 500));

        const userDocSnap = await getDoc(userRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const currentSession = userData.currentSession;

            console.log("Session ID generado localmente:", sessionId);
            console.log("Session ID en Firestore:", currentSession);

            if (currentSession && currentSession !== sessionId) {
                console.log("La sesión actual no es válida. Cerrando sesión...");

                // Actualiza el estado de conexión a 'false' y limpia el campo 'currentSession'
                await updateDoc(userRef, {
                    connected: false,
                    currentSession: ''
                });

                // Cierra sesión
                await signOut(auth);

                // Redirige al usuario a la página de inicio de sesión
                window.location.href = 'index.html';
            } else {
                console.log("Sesión actual válida:", currentSession);
            }
        } else {
            console.log("No hay datos de sesión en Firestore.");
        }
    } else {
        console.log("No hay usuario autenticado.");
    }
});

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

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a Firestore
const db = firebase.firestore();

// Autenticación
const auth = firebase.auth();

// Generar un ID de sesión único para la sesión actual
let sessionId = Math.random().toString(36).substr(2, 9);

// Manejador de inicio de sesión
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        console.log("Inicio de sesión exitoso:", user.email);

        // Referencia al usuario en Firestore
        const userRef = db.collection('users').doc(user.uid);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
            const userData = userDoc.data();

            // Verificar si hay una sesión existente y si es diferente de la nueva sesión
            if (userData.currentSession && userData.currentSession !== sessionId) {
                console.log("Otra sesión activa detectada. Cerrando la sesión previa...");
                
                // Cerrar sesión en este dispositivo
                await auth.signOut();

                // Mostrar un mensaje de alerta
                alert("Tu sesión ha sido cerrada en otro dispositivo.");

                // Redirigir al usuario a la página de inicio de sesión
                window.location.href = 'index.html';

                return;  // Salir de la función si la sesión no coincide
            }
        }

        // Actualizar Firestore con el nuevo sessionId y lastLogin
        await userRef.set({
            currentSession: sessionId,
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        // Redirigir al usuario a la página principal
        window.location.href = 'principal.html';

    } catch (error) {
        console.error("Error al iniciar sesión:", error.message);

        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = "Usuario o clave incorrecta";
    }
});

// Escuchar cambios en el estado de autenticación
auth.onAuthStateChanged(async (user) => {
    if (user) {
        console.log("Usuario autenticado:", user.email);

        const userRef = db.collection('users').doc(user.uid);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
            const currentSession = userDoc.data().currentSession;
            
            // Verificar que el sessionId almacenado en Firestore coincide con el de este dispositivo
            if (currentSession && currentSession !== sessionId) {
                console.log("La sesión actual no es válida. Cerrando sesión...");

                // Cerrar sesión si el sessionId no coincide
                await auth.signOut();

                // Redirigir al usuario a la página de inicio de sesión
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

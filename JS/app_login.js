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

// Manejador de inicio de sesión
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        console.log("Inicio de sesión exitoso:", user.email);

        // Genera un ID de sesión único para la sesión actual
        const sessionId = Math.random().toString(36).substr(2, 9);

        // Obtén el documento del usuario en Firestore
        const userRef = db.collection('users').doc(user.uid);
        const userDoc = await userRef.get();
        
        if (userDoc.exists) {
            const userData = userDoc.data();
            
            if (userData.currentSession && userData.currentSession !== sessionId) {
                // Cerrar la sesión de la sesión anterior (esto se puede hacer invalidando los tokens)
                console.log("Cerrando sesión anterior...");
                
                // Actualizar Firestore para la nueva sesión
                await userRef.update({
                    currentSession: sessionId,
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                });
            } else {
                // Actualizar con la nueva sesión
                await userRef.set({
                    currentSession: sessionId,
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
            }
        } else {
            // Si el usuario no tiene datos de sesión guardados, crearlos
            await userRef.set({
                currentSession: sessionId,
                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
            });
        }

        // Redirige al usuario a la página deseada
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
        
        if (userDoc.exists && userDoc.data().currentSession) {
            console.log("Sesión actual válida:", userDoc.data().currentSession);
        } else {
            console.log("No hay sesión activa registrada.");
        }
    } else {
        console.log("No hay usuario autenticado.");
    }
});
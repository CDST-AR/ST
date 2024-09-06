// Configura Firebase
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
console.log('Firebase inicializado');

// Obtener referencias a Firebase Auth y Firestore
const auth = firebase.auth();
const db = firebase.firestore();
console.log('Auth y Firestore obtenidos', auth, db);

// Manejar el registro de usuario
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value; // Obtener el rol del formulario

    try {
        // Crear usuario con email y contraseña
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Guardar información adicional en Firestore incluyendo el rol
        await db.collection('users').doc(user.uid).set({
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role // Guardar el rol
        });

        // Redirigir o mostrar mensaje de éxito
        alert('Registro exitoso');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        document.getElementById('error-message').textContent = error.message;
    }
});

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
const auth = firebase.auth();
const db = firebase.firestore(); // Asegúrate de tener Firestore habilitado

document.getElementById('recovery-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('recovery-email').value.trim();
    console.log('Correo electrónico ingresado:', email);

    try {
        // Verificar si el correo existe en Firestore
        const userRef = db.collection('users').where('email', '==', email);
        const snapshot = await userRef.get();

        if (!snapshot.empty) {
            console.log('El correo electrónico está registrado:', email);

            // Enviar el enlace de recuperación
            await auth.sendPasswordResetEmail(email);
            console.log('Enlace de recuperación enviado a:', email);
            alert('Se ha enviado un enlace de recuperación a tu correo electrónico.');
        } else {
            console.log('El correo electrónico no está registrado:', email);
            document.getElementById('recovery-error-message').textContent = 'El correo electrónico no está registrado.';
        }
    } catch (error) {
        console.error('Error al enviar el enlace de recuperación:', error);
        document.getElementById('recovery-error-message').textContent = `Hubo un error al intentar recuperar la contraseña. ${error.message}`;
    }
});

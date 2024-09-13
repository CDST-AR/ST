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

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Autenticación
const auth = firebase.auth();

// Manejador de inicio de sesión
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Inicio de sesión exitoso:", user.email);
            // Redirige al usuario a la página deseada
            window.location.href = 'principal.html'; // Cambia 'dashboard.html' por la página a la que desees redirigir
        })
        .catch((error) => {
            console.error("Error al iniciar sesión:", error.message);
            // Mostrar mensaje de error en el contenedor
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = "Usuario o clave incorrecta"; // Mensaje genérico
        });
});

// Cerrar sesión (esto se usa si deseas tener la opción de cerrar sesión en otra página)
function setupLogout() {
    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Cerrar Sesión';
    logoutButton.id = 'logout-btn';
    logoutButton.style.display = 'none';
    document.body.appendChild(logoutButton);

    logoutButton.addEventListener('click', () => {
        auth.signOut().then(() => {
            console.log("Cierre de sesión exitoso");
            document.getElementById('logout-btn').style.display = 'none';
            // Puedes redirigir al usuario a la página de inicio de sesión si es necesario
            // window.location.href = 'index.html';
        }).catch((error) => {
            console.error("Error al cerrar sesión:", error.message);
        });
    });
}

// Escuchar cambios en el estado de autenticación
auth.onAuthStateChanged((user) => {
    if (user) {
        // El usuario está autenticado
        console.log("Usuario autenticado:", user.email);
        setupLogout();
    } else {
        // El usuario no está autenticado
        const logoutButton = document.getElementById('logout-btn');
        if (logoutButton) {
            logoutButton.style.display = 'none';
        }
    }
});

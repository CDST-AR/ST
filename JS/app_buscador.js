// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Temporizador de inactividad (5 minutos)
let inactivityTimeout;

function resetInactivityTimer() {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
        signOut(auth).then(() => {
            console.log("Cierre de sesión por inactividad.");
            alert("Se ha cerrado la sesión por inactividad.");
            window.location.href = 'index.html'; // Redirigir a la página de inicio de sesión
        }).catch((error) => {
            console.error("Error al cerrar sesión:", error.message);
        });
    }, 5 * 60 * 1000); // 5 minutos
}

// Escuchar eventos de actividad para reiniciar el temporizador
window.onload = resetInactivityTimer;
document.onmousemove = resetInactivityTimer;
document.onkeypress = resetInactivityTimer;
document.onscroll = resetInactivityTimer;
document.onclick = resetInactivityTimer;

// Función para limpiar los detalles del error
function limpiarDetallesError() {
    document.getElementById("printerName").textContent = "";
    document.getElementById("errorName").textContent = "";
    document.getElementById("symptom").textContent = "";
    document.getElementById("solutionList").innerHTML = "";
}

// Función para mostrar las soluciones
function mostrarSoluciones(errorData) {
    const solutionList = document.getElementById("solutionList");
    solutionList.innerHTML = "";

    if (errorData.Solucion && Array.isArray(errorData.Solucion)) {
        errorData.Solucion.forEach(step => {
            const li = document.createElement("li");
            li.textContent = step;
            solutionList.appendChild(li);
        });
    } else {
        solutionList.innerHTML = "<li>No hay soluciones disponibles.</li>";
    }
}

// Función para cargar los modelos disponibles en el <select>
export function cargarModelos() {
    const modelSelect = document.getElementById("modelSelect");
    const dbRef = ref(database, 'models');

    get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            for (let model in data) {
                const option = document.createElement("option");
                option.value = model;
                option.textContent = model;
                modelSelect.appendChild(option);
            }
        } else {
            console.log("No se encontraron modelos.");
        }
    }).catch((error) => {
        console.error("Error al cargar los modelos:", error);
    });
}

// Función para cargar los códigos de error según el modelo seleccionado
export function cargarErrores() {
    const modelSelect = document.getElementById("modelSelect");
    const errorSelect = document.getElementById("errorSelect");
    const selectedModel = modelSelect.value;

    // Limpiar el menú de códigos de error
    errorSelect.innerHTML = "";

    if (selectedModel) {
        const dbRef = ref(database, `models/${selectedModel}/errors`);

        get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                for (let key in data) {
                    const option = document.createElement("option");
                    option.value = key;
                    option.textContent = key;
                    errorSelect.appendChild(option);
                }
            } else {
                console.log("No se encontraron errores para el modelo seleccionado.");
            }
        }).catch((error) => {
            console.error("Error al cargar los errores:", error);
        });
    }
}

// Función para buscar un código de error en Firebase
export function buscarError() {
    const errorCode = document.getElementById("errorSelect").value;
    const selectedModel = document.getElementById("modelSelect").value;
    const dbRef = ref(database, `models/${selectedModel}/errors`);

    get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const errorData = data[errorCode] || null;

            if (errorData) {
                document.getElementById("printerName").textContent = errorData.Impresora || "No disponible";
                document.getElementById("errorName").textContent = errorData.Error || "No disponible";
                document.getElementById("symptom").textContent = errorData.Sintoma || "No disponible";
                mostrarSoluciones(errorData);
            } else {
                limpiarDetallesError();
                document.getElementById("solutionList").innerHTML = "<li>No hay datos disponibles para este código de error.</li>";
            }
        } else {
            limpiarDetallesError();
            document.getElementById("solutionList").innerHTML = "<li>No hay datos disponibles para este código de error.</li>";
        }
    }).catch((error) => {
        console.error("Error al obtener los datos:", error);
        limpiarDetallesError();
        document.getElementById("result").innerHTML = "<p>Hubo un error al obtener los datos. Inténtalo de nuevo.</p>";
    });
}

// Mostrar el usuario logueado y manejar el cierre de sesión
onAuthStateChanged(auth, (user) => {
    const usernameElement = document.getElementById("username");
    const logoutLink = document.getElementById("logout-link");

    if (user) {
        console.log("Usuario autenticado:", user);

        // Obtener el nombre o email del usuario
        const userNameOrEmail = user.displayName || user.email || "Usuario";
        const username = user.email ? user.email.split('@')[0] : userNameOrEmail;

        // Mostrar el nombre o el email (sin '@' y lo que sigue) del usuario
        usernameElement.textContent = username;

        // Cargar modelos disponibles
        cargarModelos();

        // Eventos para cargar errores y buscar detalles al seleccionar un modelo o código de error
        document.getElementById("modelSelect").addEventListener("change", () => {
            cargarErrores();
            limpiarDetallesError();
        });
        document.getElementById("errorSelect").addEventListener("change", buscarError);

        // Manejador de clic en el enlace de salida
        logoutLink.addEventListener('click', (event) => {
            event.preventDefault();
            signOut(auth).then(() => {
                console.log("Cierre de sesión exitoso");
                window.location.href = 'index.html';  // Redirigir a la página de inicio de sesión
            }).catch((error) => {
                console.error("Error al cerrar sesión:", error.message);
            });
        });

        // Inicia el temporizador de inactividad al autenticarse
        resetInactivityTimer();
    } else {
        console.log("No hay usuario autenticado.");
        window.location.href = 'index.html'; // Redirigir a la página de inicio de sesión si no está autenticado
    }
});

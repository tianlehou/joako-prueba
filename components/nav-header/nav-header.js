import { signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { auth } from "../../environment/firebaseConfig.js";
import { getUserRole } from "../../modules/accessControl/getUserRole.js"; // Asegúrate de poner la ruta correcta

document.addEventListener("DOMContentLoaded", function () {
    const headerContainer = document.getElementById("nav-header-container");

    fetch("../../../components/nav-header/nav-header.html")
        .then((response) => response.text())
        .then((data) => {
            headerContainer.innerHTML = data;

            // Inicializa los dropdowns de Bootstrap después de cargar el contenido si usas Bootstrap
            const dropdowns = document.querySelectorAll(".dropdown-toggle");
            dropdowns.forEach((dropdown) => {
                new bootstrap.Dropdown(dropdown);
            });

            // Inicializamos el evento de logout
            initializeLogout();

            // Actualizamos el h3 con el rol del usuario
            updateUserRoleInHeader(); // Llamada a la función que actualiza el rol
        })
        .catch((error) => console.error("Error al cargar el encabezado:", error));
});

function initializeLogout() {
    const logoutLink = document.querySelector("#logout");

    if (logoutLink) {
        logoutLink.addEventListener("click", async (e) => {
            e.preventDefault(); // Previene la recarga de la página

            try {
                await signOut(auth);
                console.log("Sesión cerrada");
                window.location.href = "../../../login.html"; // Redirige a la página de login
            } catch (error) {
                console.error("Error al cerrar sesión:", error);
            }
        });
    } else {
        console.error("No se encontró el enlace de cierre de sesión");
    }
}

// Función para actualizar el contenido del h3 con el rol del usuario
function updateUserRoleInHeader() {
    const roleElement = document.querySelector(".nav-header h3");

    getUserRole()
        .then((role) => {
            if (roleElement) {
                roleElement.textContent = role; // Actualiza el contenido del h3 con el rol
            }
        })
        .catch((error) => {
            console.error("Error al obtener el rol del usuario:", error);
        });
}
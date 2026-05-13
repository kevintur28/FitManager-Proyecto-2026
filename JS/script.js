

function volverPagina() {

    if (document.referrer !== "") {

        window.history.back();

    } else {

        window.location.href = "index.html";

    }

}

// ESPERAR QUE CARGUE EL HTML
document.addEventListener("DOMContentLoaded", () => {

    const btnVolver = document.getElementById("btnVolver");

    if (btnVolver) {

        btnVolver.addEventListener("click", volverPagina);

    }

});

function inicializarDatos() {

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let clases = JSON.parse(localStorage.getItem("clases"));
    let metas = JSON.parse(localStorage.getItem("metas"));

    // ===== USUARIOS BASE =====
    const usuariosBase = [
        {
            nombres: "Juan Pérez",
            tipoDoc: "C.C",
            documento: "123456789",
            correo: "juan@gmail.com",
            password: "1234",
            membresia: "1",
            fechaVencimiento: "2026-12-31",
            clases: []
        },
        {
            nombres: "María López",
            tipoDoc: "C.C",
            documento: "987654321",
            correo: "maria@gmail.com",
            password: "1234",
            membresia: "1",
            fechaVencimiento: "2026-12-31",
            clases: []
        }
    ];

    // ===== ADMINS =====
    const admins = [
        {
            nombres: "Administrador Kevin",
            tipoDoc: "C.C",
            documento: "1028885474",
            correo: "ke2812007@gmail.com",
            password: "kevin28122007",
            membresia: "N/A",
            fechaVencimiento: "N/A",
            clases: []
        },
        {
            nombres: "Administrador Dylan",
            tipoDoc: "C.C",
            documento: "1013609004",
            correo: "dverapenuela@gmail.com",
            password: "1013609004",
            membresia: "N/A",
            fechaVencimiento: "N/A",
            clases: []
        }
    ];

    [...usuariosBase, ...admins].forEach(nuevo => {
        if (!usuarios.find(u => u.correo === nuevo.correo)) {
            usuarios.push(nuevo);
        }
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // ===== CLASES =====
    if (!clases) {
        clases = [
            { nombre: "Crossfit" },
            { nombre: "Spinning" },
            { nombre: "Yoga" }
        ];
        localStorage.setItem("clases", JSON.stringify(clases));
    }

    // ===== METAS =====
    if (!metas) {
        localStorage.setItem("metas", JSON.stringify([]));
    }
}

// ===== METAS GLOBALES =====
const METAS_GLOBALES = [
    { ejercicio: "Press banca", meta: 12 },
    { ejercicio: "Sentadilla", meta: 15 },
    { ejercicio: "Curl bíceps", meta: 10 }
];

// ===== LOGIN =====
function login(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let user = usuarios.find(u =>
        u.correo === email && u.password === pass
    );

    if (user) {

        if (
            email === "ke2812007@gmail.com" ||
            email === "dverapenuela@gmail.com"
        ) {
            localStorage.setItem("rol", "admin");
            window.location.href = "admin.html";
        } else {
            localStorage.setItem("rol", "cliente");
            localStorage.setItem("usuario", JSON.stringify(user));
            window.location.href = "cliente.html";
        }

    } else {
        alert("Correo o contraseña incorrectos");
    }
}

// ===== REGISTRO =====
function registrar(e) {
    e.preventDefault();

    let pass = document.getElementById("password").value;
    let confirm = document.getElementById("confirmPassword").value;

    if (pass !== confirm) {
        alert("Las contraseñas no coinciden");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let meses = parseInt(document.getElementById("membresia").value);

    let fecha = new Date();
    fecha.setMonth(fecha.getMonth() + meses);

    let nuevo = {
        nombres: document.getElementById("nombres").value,
        tipoDoc: document.getElementById("tipoDoc").value,
        documento: document.getElementById("documento").value,
        correo: document.getElementById("correo").value,
        password: pass,
        membresia: meses,
        fechaVencimiento: fecha.toISOString().split("T")[0],
        clases: []
    };

    if (usuarios.find(u => u.correo === nuevo.correo)) {
        alert("Ese correo ya existe");
        return;
    }

    usuarios.push(nuevo);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registrado correctamente");
    window.location.href = "index.html";
}
// ===== VER / OCULTAR CONTRASEÑA =====
function togglePassword(id, icono) {

    const input = document.getElementById(id);

    if (input.type === "password") {

        input.type = "text";
        icono.textContent = "🙈";

    } else {

        input.type = "password";
        icono.textContent = "👁";
    }
}
// ===== LOGOUT =====
function logout() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("rol");
    window.location.href = "index.html";
}
// ===== RUTINAS CLIENTE =====
function crearRutinaCliente(e) {
    e.preventDefault();

    let user = JSON.parse(localStorage.getItem("usuario"));
    if (!user) return;

    let rutinas =
        JSON.parse(localStorage.getItem(
            "rutinas_" + user.correo
        )) || [];

    let nombre =
        document.getElementById("rutinaCliente").value;

    let descripcion =
        document.getElementById("descRutinaCliente").value;

    rutinas.push({
        nombre,
        descripcion
    });

    localStorage.setItem(
        "rutinas_" + user.correo,
        JSON.stringify(rutinas)
    );

    document.getElementById("rutinaCliente").value = "";
    document.getElementById("descRutinaCliente").value = "";

    mostrarNotificacion("✔ Rutina creada");

    cargarRutinasCliente();
}

function cargarRutinasCliente() {

    let tabla =
        document.getElementById("tabla-rutinas");

    if (!tabla) return;

    let user =
        JSON.parse(localStorage.getItem("usuario"));

    if (!user) return;

    let rutinas =
        JSON.parse(localStorage.getItem(
            "rutinas_" + user.correo
        )) || [];

    tabla.innerHTML = "";

    if (rutinas.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="3">
                    No tienes rutinas creadas
                </td>
            </tr>
        `;

        return;
    }

    rutinas.forEach((r, index) => {

        tabla.innerHTML += `
            <tr>
                <td>${r.nombre}</td>
                <td>${r.descripcion}</td>
                <td>
                    <button onclick="eliminarRutina(${index})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

function eliminarRutina(index) {

    let user =
        JSON.parse(localStorage.getItem("usuario"));

    if (!user) return;

    let rutinas =
        JSON.parse(localStorage.getItem(
            "rutinas_" + user.correo
        )) || [];

    rutinas.splice(index, 1);

    localStorage.setItem(
        "rutinas_" + user.correo,
        JSON.stringify(rutinas)
    );

    mostrarNotificacion("🗑 Rutina eliminada");

    cargarRutinasCliente();
}

// ===== SECCIONES =====
function mostrarSeccion(id, el) {
    document.querySelectorAll(".seccion").forEach(s => s.classList.remove("activa"));
    document.getElementById(id).classList.add("activa");

    document.querySelectorAll(".sidebar li").forEach(li => li.classList.remove("activo"));
    if (el) el.classList.add("activo");

    if (id === "metas") {
        cargarMetas();
        cargarGraficaMetas();
    }
}

// ===== CLASES =====
function crearClase(e) {
    e.preventDefault();

    let clases = JSON.parse(localStorage.getItem("clases")) || [];

    let nombre = document.getElementById("nombreClase").value;

    clases.push({ nombre });

    localStorage.setItem("clases", JSON.stringify(clases));

    cargarClasesAdmin();
    cargarClasesCliente();
}

function cargarClasesInicio() {

    let cont = document.getElementById("lista-clases-inicio");
    if (!cont) return;

    let clases = JSON.parse(localStorage.getItem("clases")) || [];
    let user = JSON.parse(localStorage.getItem("usuario"));
    if (!user) return;

    cont.innerHTML = "";

    clases.forEach(c => {

        let inscrito = user.clases.includes(c.nombre);

        cont.innerHTML += `
        <div class="clase-item">
            <span>${c.nombre}</span>

            <button onclick="${inscrito ? `salirse('${c.nombre}')` : `inscribirse('${c.nombre}')`}">
                ${inscrito ? "Salir" : "Inscribirse"}
            </button>
        </div>`;
    });
}

function cargarMisClasesInicio() {

    let cont = document.getElementById("tabla-mis-clases");
    if (!cont) return;

    let user = JSON.parse(localStorage.getItem("usuario"));
    if (!user) return;

    cont.innerHTML = "";

    if (!user.clases || user.clases.length === 0) {
        cont.innerHTML = `
        <tr>
            <td colspan="2">No estás inscrito en ninguna clase</td>
        </tr>`;
        return;
    }

    user.clases.forEach(c => {
        cont.innerHTML += `
        <tr>
            <td>${c}</td>
            <td>
                <button onclick="salirse('${c}')">
                    Salir
                </button>
            </td>
        </tr>`;
    });
}

function cargarClasesAdmin() {
    let cont = document.getElementById("clases-admin");
    if (!cont) return;

    let clases = JSON.parse(localStorage.getItem("clases")) || [];

    cont.innerHTML = "";
    clases.forEach(c => {
        cont.innerHTML += `<div class="card">${c.nombre}</div>`;
    });
}

function cargarClasesCliente() {
    let cont = document.getElementById("lista-clases");
    if (!cont) return;

    let clases = JSON.parse(localStorage.getItem("clases")) || [];
    let user = JSON.parse(localStorage.getItem("usuario"));
    if (!user) return;

    cont.innerHTML = "";
    clases.forEach(c => {
        let inscrito = user.clases.includes(c.nombre);

        cont.innerHTML += `
        <div class="card">
            <h3>${c.nombre}</h3>
            <button onclick="${inscrito ? `salirse('${c.nombre}')` : `inscribirse('${c.nombre}')`}">
                ${inscrito ? "Salir" : "Inscribirse"}
            </button>
        </div>`;
    });
}


function inscribirse(nombre) {

    let user = JSON.parse(localStorage.getItem("usuario"));
    if (!user) return;

    if (!user.clases.includes(nombre)) {
        user.clases.push(nombre);
    }

    actualizarUsuario(user);
    localStorage.setItem("usuario", JSON.stringify(user));

    mostrarNotificacion(`✔ Te inscribiste a ${nombre}`);

    cargarClasesCliente();
    cargarClasesInicio();
    cargarMisClasesInicio();
}

function mostrarNotificacion(mensaje) {

    let div = document.createElement("div");
    div.className = "notificacion-flotante";
    div.innerText = mensaje;

    document.body.appendChild(div);

    // activar animación
    setTimeout(() => {
        div.classList.add("show");
    }, 50);

    // desaparecer
    setTimeout(() => {
        div.classList.remove("show");

        setTimeout(() => {
            div.remove();
        }, 400);

    }, 2000);
}
function salirse(nombre) {

    let user = JSON.parse(localStorage.getItem("usuario"));
    if (!user) return;

    user.clases = user.clases.filter(c => c !== nombre);

    actualizarUsuario(user);
    localStorage.setItem("usuario", JSON.stringify(user));

    alert(`Saliste de: ${nombre}`);

    cargarClasesCliente();
    cargarClasesInicio();
    cargarMisClasesInicio();
}

function actualizarUsuario(user) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios = usuarios.map(u => u.correo === user.correo ? user : u);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuario", JSON.stringify(user));
}

// ===== ASISTENCIA =====
function asistir() {

    let user = JSON.parse(localStorage.getItem("usuario"));
    if (!user) return;

    let asistencias = JSON.parse(localStorage.getItem("asistencia_" + user.correo)) || [];

    let hoy = new Date().toLocaleDateString();

    if (!asistencias.includes(hoy)) {
        asistencias.push(hoy);
        localStorage.setItem("asistencia_" + user.correo, JSON.stringify(asistencias));

        mostrarNotificacion("💪 Asistencia registrada con éxito");
    } else {
        mostrarNotificacion("⚠ Ya registraste asistencia hoy");
    }

    cargarInicioCliente();
}

// ===== REGISTROS =====
function guardarRegistro(e) {
    e.preventDefault();

    let user = JSON.parse(localStorage.getItem("usuario"));
    if (!user) return;

    let registros =
        JSON.parse(
            localStorage.getItem(
                "registros_" + user.correo
            )
        ) || [];

    let ejercicioIngresado =
        document.getElementById("ejercicio").value;

    let repsIngresadas =
        parseInt(
            document.getElementById("repeticiones").value
        );

    let nuevoRegistro = {
        ejercicio: ejercicioIngresado,
        rep: repsIngresadas,
        peso: document.getElementById("peso").value,
        fecha: new Date().toLocaleDateString()
    };

    registros.push(nuevoRegistro);

    localStorage.setItem(
        "registros_" + user.correo,
        JSON.stringify(registros)
    );

    // LIMPIAR FORMULARIO
    document.getElementById("ejercicio").value = "";
    document.getElementById("repeticiones").value = "";
    document.getElementById("peso").value = "";

    mostrarNotificacion("✔ Registro guardado");

    // RECARGAR TABLA
    cargarHistorial();
    cargarGraficaMetas();
}

// ===== HISTORIAL =====
function cargarHistorial() {

    let cont = document.getElementById("historial");
    if (!cont) return;

    let user =
        JSON.parse(localStorage.getItem("usuario"));

    if (!user) return;

    let registros =
        JSON.parse(
            localStorage.getItem(
                "registros_" + user.correo
            )
        ) || [];

    let html = `
        <table class="tabla-registro">
            <thead>
                <tr>
                    <th>Icono</th>
                    <th>Ejercicio</th>
                    <th>Reps</th>
                    <th>Peso</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody>
    `;

    // TABLA VACÍA
    if (registros.length === 0) {

        html += `
            <tr>
                <td colspan="5">
                    No hay registros todavía
                </td>
            </tr>
        `;
    }

    registros.forEach(r => {

        html += `
            <tr>
                <td style="font-size:24px;">
                    ${obtenerIconoEjercicio(r.ejercicio)}
                </td>
                <td>${r.ejercicio}</td>
                <td>${r.rep}</td>
                <td>${r.peso} kg</td>
                <td>${r.fecha}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    cont.innerHTML = html;
}
// ===== ICONOS DE EJERCICIO =====
function obtenerIconoEjercicio(ejercicio) {

    ejercicio = ejercicio.toLowerCase();

    // PECHO
    if (
        ejercicio.includes("press") ||
        ejercicio.includes("banca") ||
        ejercicio.includes("pecho")
    ) {
        return "🏋️";
    }

    // BÍCEPS
    if (
        ejercicio.includes("curl") ||
        ejercicio.includes("bíceps") ||
        ejercicio.includes("biceps")
    ) {
        return "💪";
    }

    // PIERNA
    if (
        ejercicio.includes("sentadilla") ||
        ejercicio.includes("pierna") ||
        ejercicio.includes("prensa")
    ) {
        return "🦵";
    }

    // CARDIO
    if (
        ejercicio.includes("correr") ||
        ejercicio.includes("trote") ||
        ejercicio.includes("cardio") ||
        ejercicio.includes("cinta")
    ) {
        return "🏃";
    }

    // ABDOMEN
    if (
        ejercicio.includes("abdomen") ||
        ejercicio.includes("crunch") ||
        ejercicio.includes("plancha")
    ) {
        return "🔥";
    }

    // ESPALDA
    if (
        ejercicio.includes("remo") ||
        ejercicio.includes("espalda") ||
        ejercicio.includes("dominadas")
    ) {
        return "🦍";
    }

    // HOMBRO
    if (
        ejercicio.includes("hombro") ||
        ejercicio.includes("militar")
    ) {
        return "⚡";
    }

    // DEFAULT
    return "🏅";
}
// ===== METAS =====
function cargarMetas() {
    let cont = document.getElementById("metas-lista");
    if (!cont) return;

    let user = JSON.parse(localStorage.getItem("usuario"));
    if (!user) return;

    let metasAdmin = JSON.parse(localStorage.getItem("metas")) || [];

    cont.innerHTML = "";

    METAS_GLOBALES.forEach(m => {
        cont.innerHTML += `
        <div class="card">
            <h3>${m.ejercicio}</h3>
            <p>Meta: ${m.meta}</p>
        </div>`;
    });

    metasAdmin
        .filter(m => m.usuario.toLowerCase() === user.correo.toLowerCase())
        .forEach(m => {
            cont.innerHTML += `
        <div class="card">
            <h3>${m.ejercicio}</h3>
            <p>Meta personal: ${m.meta}</p>
        </div>`;
        });
}

// ===== ASIGNAR META =====
function asignarMeta(e) {
    e.preventDefault();

    let metas = JSON.parse(localStorage.getItem("metas")) || [];

    metas.push({
        usuario: document.getElementById("correoMeta").value.trim().toLowerCase(),
        ejercicio: document.getElementById("ejercicioMeta").value,
        meta: parseInt(document.getElementById("valorMeta").value)
    });

    localStorage.setItem("metas", JSON.stringify(metas));

    alert("Meta asignada");
}

// ===== GRAFICA INICIO =====
function cargarInicioCliente() {

    let canvas = document.getElementById("grafica");
    if (!canvas) return;

    let user = JSON.parse(localStorage.getItem("usuario"));
    let asistencias = JSON.parse(localStorage.getItem("asistencia_" + user.correo)) || [];

    let porcentaje = Math.min((asistencias.length / 4) * 100, 100);

    // 🔥 destruir anterior (solo aquí está bien)
    if (window.miGrafica) window.miGrafica.destroy();

    let ctx = canvas.getContext("2d");

    window.miGrafica = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Constancia", "Faltante"],
            datasets: [{
                data: [porcentaje, 100 - porcentaje],

                // 🎨 COLORES NORMALES
                backgroundColor: [
                    "#3b82f6",   // azul
                    "#ff4d4d"    // rojo
                ],


                hoverBackgroundColor: [
                    "#ff8c00",   // naranja
                    "#32e012"    // verde mejorado (sin bug)
                ],

                hoverOffset: 1
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "70%",

            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 1200,
                easing: "easeOutQuart"
            },

            interaction: {
                mode: 'nearest',
                intersect: true
            },

            animations: {
                colors: false
            },

            plugins: {
                legend: {
                    labels: {
                        color: "#ffffff"
                    }
                }
            }
        }
    });

    // TEXTO
    let texto = document.getElementById("texto-constancia");
    if (texto) {
        texto.textContent = `Constancia: ${asistencias.length}/4`;
    }
}

// ===== GRAFICA METAS =====
function cargarGraficaMetas() {

    let user = JSON.parse(localStorage.getItem("usuario"));
    if (!user) return;

    let registros = JSON.parse(localStorage.getItem("registros_" + user.correo)) || [];
    let metasAdmin = JSON.parse(localStorage.getItem("metas")) || [];

    let metasTotales = [...METAS_GLOBALES];

    metasAdmin
        .filter(m => m.usuario.toLowerCase() === user.correo.toLowerCase())
        .forEach(m => {
            metasTotales.push({
                ejercicio: m.ejercicio,
                meta: m.meta
            });
        });

    let total = metasTotales.length;
    let cumplidas = 0;

    registros.forEach(r => {
        metasTotales.forEach(m => {
            if (
                r.ejercicio.toLowerCase() === m.ejercicio.toLowerCase() &&
                r.rep >= m.meta
            ) {
                cumplidas++;
            }
        });
    });

    let porcentaje = total > 0 ? Math.min((cumplidas / total) * 100, 100) : 0;

    let canvas = document.getElementById("grafica-metas");
    if (!canvas) return;

    let ctx = canvas.getContext("2d");


    if (!window.miGraficaMetas) {


        window.miGraficaMetas = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["Cumplidas", "Faltantes"],
                datasets: [{
                    data: [porcentaje, 100 - porcentaje],
                    backgroundColor: ["#3b82f6", "#ff4d4d"],
                    hoverBackgroundColor: ["#ff8c00", "#39ff14"]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "70%",
                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 1200,
                    easing: "easeOutBack"
                }
            }
        });

    } else {


        window.miGraficaMetas.options.animation = false;

        window.miGraficaMetas.data.datasets[0].data = [porcentaje, 100 - porcentaje];
        window.miGraficaMetas.update();
    }

    let texto = document.getElementById("texto-metas");
    if (texto) {
        texto.textContent = `Metas completadas: ${porcentaje.toFixed(1)}%`;
    }
}


function cargarUsuarios() {

    let tabla = document.getElementById("tabla-usuarios");

    if (!tabla) return;

    let usuarios =
        JSON.parse(localStorage.getItem("usuarios")) || [];

    tabla.innerHTML = "";

    usuarios.forEach((u, index) => {

        tabla.innerHTML += `
            <tr>
                <td>${u.nombres || ""}</td>
                <td>${u.tipoDoc || ""}</td>
                <td>${u.documento || ""}</td>
                <td>${u.correo || ""}</td>
                <td>${u.membresia || ""}</td>
                <td>${u.fechaVencimiento || ""}</td>

                <td>
                    <button onclick="editarUsuario(${index})">
                        ✏ Editar
                    </button>

                    <button
    onclick="eliminarUsuario(${index})"
    style="
        background:#ff0000;
        color:white;
        border:none;
        margin-left:6px;
    "
>
    🗑 Eliminar
</button>
                </td>
            </tr>
        `;
    });
}

// ===== EDITAR USUARIO =====
function editarUsuario(index) {

    let usuarios =
        JSON.parse(localStorage.getItem("usuarios")) || [];

    let usuario = usuarios[index];

    // evitar editar admins
    if (
        usuario.correo === "ke2812007@gmail.com" ||
        usuario.correo === "dverapenuela@gmail.com"
    ) {
        alert("No puedes editar administradores");
        return;
    }

    let nuevoNombre = prompt(
        "Editar nombre:",
        usuario.nombres
    );

    if (nuevoNombre === null) return;

    let nuevoCorreo = prompt(
        "Editar correo:",
        usuario.correo
    );

    if (nuevoCorreo === null) return;

    let nuevaMembresia = prompt(
        "Editar membresía:",
        usuario.membresia
    );

    usuario.nombres = nuevoNombre;
    usuario.correo = nuevoCorreo;
    usuario.membresia = nuevaMembresia;

    usuarios[index] = usuario;

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    mostrarNotificacion("✏ Usuario actualizado");

    cargarUsuarios();
}

// ===== ELIMINAR USUARIO =====
function eliminarUsuario(index) {

    let usuarios =
        JSON.parse(localStorage.getItem("usuarios")) || [];

    let usuario = usuarios[index];

    // evitar borrar admins
    if (
        usuario.correo === "ke2812007@gmail.com" ||
        usuario.correo === "dverapenuela@gmail.com"
    ) {
        alert("No puedes eliminar administradores");
        return;
    }

    let confirmar = confirm(
        `¿Seguro que deseas eliminar a ${usuario.correo}?`
    );

    if (!confirmar) return;

    usuarios.splice(index, 1);

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    mostrarNotificacion("🗑 Usuario eliminado");

    cargarUsuarios();
}


// ===== ACTUALIZACIÓN TIEMPO REAL =====
setInterval(() => {
    if (localStorage.getItem("rol") === "cliente") {
        cargarMetas();
        cargarClasesCliente();
        // 
    }
}, 2000);

// ===== INIT =====
window.onload = () => {
    inicializarDatos();
    cargarUsuarios();
    cargarClasesAdmin();
    cargarClasesCliente();
    cargarHistorial();
    cargarMetas();
    cargarInicioCliente();
    cargarGraficaMetas();
    cargarClasesInicio();
    cargarMisClasesInicio();
    cargarRutinasCliente();
};

const STORAGE = {
  users: 'fm_users',
  current: 'fm_current_user',
  catalog: 'fm_catalog',
  classes: 'fm_classes',
  goals: 'fm_goals',
  invoices: 'fm_invoices',
  invoiceDetails: 'fm_invoice_details',
  records: 'fm_records_',
  routines: 'fm_routines_',
  attendance: 'fm_attendance_'
};

const DEFAULTS = {
  memberships: [
    { id: 1, tipo: 'Diaria', precio: 5000, duracion: 1 },
    { id: 2, tipo: 'Mensual', precio: 50000, duracion: 30 },
    { id: 3, tipo: 'Bimestral', precio: 90000, duracion: 60 },
    { id: 4, tipo: 'Trimestral', precio: 130000, duracion: 90 },
    { id: 5, tipo: 'Semestral', precio: 245000, duracion: 180 },
    { id: 6, tipo: 'Anual', precio: 450000, duracion: 365 }
  ],
  products: [
    { id: 1, nombre: 'Creatina', precio: 120000 },
    { id: 2, nombre: 'Proteina', precio: 90000 },
    { id: 3, nombre: 'Pre-entreno', precio: 50000 },
    { id: 4, nombre: 'Botilo De Agua', precio: 25000 },
    { id: 5, nombre: 'Botella De Agua', precio: 5000 }
  ],
  providers: [
    { id: 1, nombre: 'Pablo Recojedor', tipoProducto: 'Proteina' },
    { id: 2, nombre: 'Pedro Carrascal', tipoProducto: 'Creatina' },
    { id: 3, nombre: 'Pepe Garcia', tipoProducto: 'Pre-entreno' },
    { id: 4, nombre: 'Patricio Fugaz', tipoProducto: 'Botilo De Agua' },
    { id: 5, nombre: 'Kristian Rangel', tipoProducto: 'Botella De Agua' }
  ],
  branches: [
    { id: 1, nombre: 'Taurus GYM', direccion: 'Cra. 45a #74-38 Sur' },
    { id: 2, nombre: 'Generico GYM', direccion: 'cll 80c sur #68b-39' },
    { id: 3, nombre: 'Bodytech GYM', direccion: 'Cl. 12 Sur #31 - 33' },
    { id: 4, nombre: 'SmartFit GYM', direccion: 'Cl. 34 Sur #A Sur 34D - 50' }
  ],
  documentTypes: [
    { id: 1, label: 'Tarjeta De Identidad (T.I)' },
    { id: 2, label: 'Cedula De Ciudadania (C.C)' },
    { id: 3, label: 'Cedula De Extranjeria (C.E)' },
    { id: 4, label: 'Permiso Especial de Permanencia (P.E.P)' },
    { id: 5, label: 'Pasaporte (P.A)' }
  ],
  paymentMethods: ['Efectivo', 'Tarjeta', 'Transferencia']
};

const GLOBAL_GOALS = [
  { ejercicio: 'Press banca', meta: 50 },
  { ejercicio: 'Sentadilla', meta: 80 },
  { ejercicio: 'Curl biceps', meta: 20 }
];

function read(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function money(value) {
  return Number(value || 0).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function addDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + Number(days || 0));
  return date.toISOString().slice(0, 10);
}

function initData() {
  if (!localStorage.getItem(STORAGE.catalog)) write(STORAGE.catalog, DEFAULTS);
  if (!localStorage.getItem(STORAGE.classes)) write(STORAGE.classes, [
    { id: 1, nombre: 'Spinning' },
    { id: 2, nombre: 'Funcional' },
    { id: 3, nombre: 'Yoga' },
    { id: 4, nombre: 'Crossfit' },
    { id: 5, nombre: 'Pilates' },
    { id: 6, nombre: 'Zumba' }
  ]);
  if (!localStorage.getItem(STORAGE.goals)) write(STORAGE.goals, [
    { usuario: 'alancru@gmail.com', ejercicio: 'Press banca', meta: 50 }
  ]);
  if (!localStorage.getItem(STORAGE.users)) write(STORAGE.users, [
    { id: 1, nombres: 'Alan Cruz', tipoDoc: 'Cedula De Ciudadania (C.C)', documento: '1012508006', correo: 'alancru@gmail.com', password: '123456', rol: 'cliente', membresia: 'Diaria', vencimiento: '2026-06-15', clases: ['Spinning'] },
    { id: 2, nombres: 'Dylan Vera', tipoDoc: 'Cedula De Ciudadania (C.C)', documento: '1013609004', correo: 'dverapenuela@gmail.com', password: '200607Kd$', rol: 'admin', membresia: 'Anual', vencimiento: '', clases: [] },
    { id: 3, nombres: 'Kevin Turizo', tipoDoc: 'Cedula De Ciudadania (C.C)', documento: '1028885474', correo: 'ke2812007@gmail.com', password: 'Kevin28122007#', rol: 'admin', membresia: 'Anual', vencimiento: '', clases: [] },
    { id: 4, nombres: 'Maria Pilar', tipoDoc: 'Cedula De Ciudadania (C.C)', documento: '53099689', correo: 'mariapilar@gmail.com', password: '987654', rol: 'cliente', membresia: 'Trimestral', vencimiento: '2026-06-30', clases: ['Yoga'] },
    { id: 5, nombres: 'Pedro Narvaez', tipoDoc: 'Cedula De Ciudadania (C.C)', documento: '1039687994', correo: 'pedronar@gmail.com', password: '246810@', rol: 'cliente', membresia: 'Bimestral', vencimiento: '2026-08-19', clases: [] }
  ]);
  if (!localStorage.getItem(STORAGE.invoices)) write(STORAGE.invoices, [
    { id: 1, fecha: '2026-02-05', numero: '1', valorTotal: 70000, metodoPago: 'Efectivo', usuarioCorreo: 'alancru@gmail.com' },
    { id: 2, fecha: '2025-12-30', numero: '2', valorTotal: 80000, metodoPago: 'Transferencia', usuarioCorreo: 'mariapilar@gmail.com' },
    { id: 3, fecha: '2026-04-24', numero: '3', valorTotal: 140000, metodoPago: 'Efectivo', usuarioCorreo: 'alancru@gmail.com' },
    { id: 4, fecha: '2026-04-20', numero: '4', valorTotal: 55000, metodoPago: 'Tarjeta', usuarioCorreo: 'mariapilar@gmail.com' },
    { id: 5, fecha: '2026-02-27', numero: '5', valorTotal: 90000, metodoPago: 'Efectivo', usuarioCorreo: 'dverapenuela@gmail.com' }
  ]);
  if (!localStorage.getItem(STORAGE.invoiceDetails)) write(STORAGE.invoiceDetails, [
    { id: 1, cantidad: 3, productoId: 1, facturaId: 1 },
    { id: 2, cantidad: 1, productoId: 4, facturaId: 2 },
    { id: 3, cantidad: 4, productoId: 4, facturaId: 3 },
    { id: 4, cantidad: 2, productoId: 3, facturaId: 4 },
    { id: 5, cantidad: 3, productoId: 2, facturaId: 5 }
  ]);
}

function params() { return new URLSearchParams(location.search); }

function currentUser() { return read(STORAGE.current, null); }
function users() { return read(STORAGE.users, []); }
function catalog() { return read(STORAGE.catalog, DEFAULTS); }

function setCurrentUser(user) { write(STORAGE.current, user); }

function notify(message, type = 'info') {
  const div = document.createElement('div');
  div.className = `notificacion-flotante ${type}`;
  div.textContent = message;
  document.body.appendChild(div);
  setTimeout(() => div.classList.add('show'), 30);
  setTimeout(() => {
    div.classList.remove('show');
    setTimeout(() => div.remove(), 350);
  }, 2200);
}

function requireRole(role) {
  const user = currentUser();
  if (!user || user.rol !== role) location.href = 'login.html';
}

function backHome() { location.href = 'index.html'; }
function logout() { localStorage.removeItem(STORAGE.current); location.href = 'index.html'; }

function togglePassword(id, icon) {
  const input = document.getElementById(id);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
  icon.textContent = input.type === 'password' ? 'Ver' : 'Ocultar';
}

function renderIndex() {
  const data = catalog();
  renderCards('membresias-grid', data.memberships, item => `
    <article class="catalogo-card">
      <h3>${item.tipo}</h3>
      <p>${money(item.precio)}</p>
      <span>Duracion: ${item.duracion} dias</span>
      <div class="catalogo-actions"><a class="btn-main" href="register.html?tipo=membresia&id=${item.id}">Comprar</a></div>
    </article>`);
  renderCards('productos-grid', data.products, item => `
    <article class="catalogo-card">
      <h3>${item.nombre}</h3>
      <p>${money(item.precio)}</p>
      <span>Producto disponible</span>
      <div class="catalogo-actions"><a class="btn-main" href="register.html?tipo=producto&id=${item.id}">Comprar</a></div>
    </article>`);
  renderCards('proveedores-grid', data.providers, item => `
    <article class="catalogo-card"><h3>${item.nombre}</h3><span>Producto: ${item.tipoProducto}</span></article>`);
  renderCards('sedes-grid', data.branches, item => `
    <article class="catalogo-card"><h3>${item.nombre}</h3><span>Direccion: ${item.direccion}</span></article>`);
}

function renderCards(id, items, template) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = items.map(template).join('') || '<p>No hay datos registrados.</p>';
}

function renderRegister() {
  const data = catalog();
  const selectedType = params().get('tipo') || '';
  const selectedId = params().get('id') || '';
  const doc = document.getElementById('tipoDoc');
  const mem = document.getElementById('membresia');
  const hiddenType = document.getElementById('tipoCompra');
  const hiddenId = document.getElementById('idCompra');
  if (hiddenType) hiddenType.value = selectedType;
  if (hiddenId) hiddenId.value = selectedId;
  if (doc) doc.innerHTML = '<option value="">Tipo de documento</option>' + data.documentTypes.map(t => `<option value="${t.label}">${t.label}</option>`).join('');
  if (mem) mem.innerHTML = '<option value="">Membresia</option>' + data.memberships.map(m => `<option value="${m.id}" ${selectedType === 'membresia' && selectedId == m.id ? 'selected' : ''}>${m.tipo} - ${money(m.precio)}</option>`).join('');
}

function registerUser(event) {
  event.preventDefault();
  const pass = document.getElementById('password').value;
  const confirm = document.getElementById('confirmPassword').value;
  if (pass !== confirm) return notify('Las contrasenas no coinciden', 'error');
  const data = catalog();
  const selectedMembership = data.memberships.find(m => String(m.id) === document.getElementById('membresia').value);
  const list = users();
  const email = document.getElementById('correo').value.trim().toLowerCase();
  if (list.some(u => u.correo.toLowerCase() === email)) return notify('Ese correo ya existe', 'error');
  const user = {
    id: Date.now(),
    nombres: document.getElementById('nombres').value.trim(),
    tipoDoc: document.getElementById('tipoDoc').value,
    documento: document.getElementById('documento').value.trim(),
    fechaNacimiento: document.getElementById('fechaNacimiento').value,
    correo: email,
    password: pass,
    rol: 'cliente',
    membresia: selectedMembership ? selectedMembership.tipo : '',
    vencimiento: selectedMembership ? addDays(selectedMembership.duracion) : '',
    compraPendiente: { tipo: document.getElementById('tipoCompra').value, id: document.getElementById('idCompra').value },
    clases: []
  };
  list.push(user);
  write(STORAGE.users, list);
  notify('Registro exitoso. Ahora inicia sesion.');
  setTimeout(() => location.href = 'login.html?registrado=true', 900);
}

function login(event) {
  event.preventDefault();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const pass = document.getElementById('password').value;
  const found = users().find(u => u.correo.toLowerCase() === email && u.password === pass);
  if (!found) return notify('Correo o contrasena incorrectos', 'error');
  setCurrentUser(found);
  location.href = found.rol === 'admin' ? 'admin.html' : 'cliente.html';
}

function mostrarSeccion(id, el) {
  document.querySelectorAll('.seccion').forEach(s => s.classList.remove('activa'));
  document.getElementById(id)?.classList.add('activa');
  document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('activo'));
  if (el) el.classList.add('activo');
  if (id === 'metas') { renderClientGoals(); renderGoalsChart(); }
  if (id === 'facturasCabecera') renderInvoices();
  if (id === 'facturasDetalladas') renderInvoiceDetails();
}

function renderAdmin() {
  requireRole('admin');
  renderUsers(); renderClassesAdmin(); renderGoalsAdmin(); renderInvoices(); renderInvoiceDetails();
}

function renderUsers() {
  const tbody = document.getElementById('tabla-usuarios');
  if (!tbody) return;
  tbody.innerHTML = users().map((u, i) => `
    <tr><td>${u.nombres}</td><td>${u.tipoDoc}</td><td>${u.documento}</td><td>${u.correo}</td><td>${u.membresia || '-'}</td><td>${u.vencimiento || '-'}</td>
    <td><button onclick="editUser(${i})">Editar</button><button class="btn-danger" onclick="deleteUser(${i})">Eliminar</button></td></tr>`).join('');
}

function editUser(index) {
  const list = users(); const u = list[index];
  if (u.rol === 'admin') return notify('No puedes editar administradores', 'error');
  const name = prompt('Editar nombre:', u.nombres); if (name === null) return;
  const email = prompt('Editar correo:', u.correo); if (email === null) return;
  u.nombres = name; u.correo = email.trim().toLowerCase();
  write(STORAGE.users, list); renderUsers(); notify('Usuario actualizado');
}

function deleteUser(index) {
  const list = users();
  if (list[index].rol === 'admin') return notify('No puedes eliminar administradores', 'error');
  if (!confirm(`Eliminar a ${list[index].correo}?`)) return;
  list.splice(index, 1); write(STORAGE.users, list); renderUsers(); notify('Usuario eliminado');
}

function assignExpiration(event) {
  event.preventDefault();
  const email = document.getElementById('correoVencimiento').value.trim().toLowerCase();
  const date = document.getElementById('fechaVencimiento').value;
  const list = users(); const u = list.find(x => x.correo.toLowerCase() === email);
  if (!u) return notify('Usuario no encontrado', 'error');
  u.vencimiento = date; write(STORAGE.users, list); renderUsers(); notify('Vencimiento asignado'); event.target.reset();
}

function createClass(event) {
  event.preventDefault();
  const classes = read(STORAGE.classes, []);
  classes.push({ id: Date.now(), nombre: document.getElementById('nombreClase').value.trim() });
  write(STORAGE.classes, classes); event.target.reset(); renderClassesAdmin(); notify('Clase creada');
}

function renderClassesAdmin() {
  const el = document.getElementById('clases-admin');
  if (!el) return;
  el.innerHTML = read(STORAGE.classes, []).map((c, i) => `<div class="card"><h3>${c.nombre}</h3><button onclick="deleteClass(${i})">Eliminar</button></div>`).join('');
}

function deleteClass(index) {
  const classes = read(STORAGE.classes, []); classes.splice(index, 1); write(STORAGE.classes, classes); renderClassesAdmin();
}

function assignGoal(event) {
  event.preventDefault();
  const goals = read(STORAGE.goals, []);
  goals.push({ usuario: document.getElementById('correoMeta').value.trim().toLowerCase(), ejercicio: document.getElementById('ejercicioMeta').value.trim(), meta: Number(document.getElementById('valorMeta').value) });
  write(STORAGE.goals, goals); event.target.reset(); renderGoalsAdmin(); notify('Meta asignada');
}

function renderGoalsAdmin() {
  const el = document.getElementById('lista-metas-admin');
  if (!el) return;
  el.innerHTML = read(STORAGE.goals, []).map(g => `<div class="card"><h3>${g.ejercicio}</h3><p>${g.usuario}</p><p>Meta: ${g.meta}</p></div>`).join('');
}

function renderInvoices() {
  const tbody = document.getElementById('tabla-facturas-cabecera');
  if (!tbody) return;
  const list = read(STORAGE.invoices, []);
  tbody.innerHTML = list.map(f => {
    const u = users().find(x => x.correo === f.usuarioCorreo) || {};
    return `<tr><td>${f.id}</td><td>${f.fecha}</td><td>${f.numero}</td><td>${money(f.valorTotal)}</td><td>${f.metodoPago}</td><td>${u.nombres || f.usuarioCorreo}</td><td>${f.usuarioCorreo}</td></tr>`;
  }).join('') || '<tr><td colspan="7">No hay facturas registradas.</td></tr>';
}

function renderInvoiceDetails() {
  const tbody = document.getElementById('tabla-facturas-detalladas');
  if (!tbody) return;
  const details = read(STORAGE.invoiceDetails, []); const inv = read(STORAGE.invoices, []); const products = catalog().products;
  tbody.innerHTML = details.map(d => {
    const f = inv.find(x => x.id === d.facturaId) || {}; const p = products.find(x => x.id === d.productoId) || {};
    const u = users().find(x => x.correo === f.usuarioCorreo) || {};
    return `<tr><td>${d.id}</td><td>${f.numero || '-'}</td><td>${p.nombre || '-'}</td><td>${money(p.precio || 0)}</td><td>${d.cantidad}</td><td>${f.fecha || '-'}</td><td>${u.nombres || '-'}</td></tr>`;
  }).join('') || '<tr><td colspan="7">No hay facturas detalladas registradas.</td></tr>';
}

function renderClient() {
  requireRole('cliente');
  renderClientHome(); renderClientClasses(); renderRoutines(); renderRecords(); renderClientGoals(); renderGoalsChart();
}

function renderClientHome() {
  const user = currentUser(); if (!user) return;
  const title = document.getElementById('bienvenida'); if (title) title.textContent = `Bienvenido ${user.nombres}`;
  const text = document.getElementById('texto-constancia');
  const attendance = read(STORAGE.attendance + user.correo, []);
  if (text) text.textContent = `Constancia: ${attendance.length}/4 dias este mes`;
  renderAttendanceChart(attendance.length);
}

function renderAttendanceChart(count) {
  const canvas = document.getElementById('grafica'); if (!canvas || typeof Chart === 'undefined') return;
  if (window.attendanceChart) window.attendanceChart.destroy();
  window.attendanceChart = new Chart(canvas.getContext('2d'), { type: 'doughnut', data: { labels: ['Constancia', 'Faltante'], datasets: [{ data: [Math.min(count, 4), Math.max(4 - count, 0)], backgroundColor: ['#3b82f6', '#ff4d4d'] }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#fff' } } } } });
}

function attend() {
  const user = currentUser(); if (!user) return;
  const key = STORAGE.attendance + user.correo; const list = read(key, []); const today = todayISO();
  if (list.includes(today)) return notify('Ya registraste asistencia hoy', 'error');
  list.push(today); write(key, list); renderClientHome(); notify('Asistencia registrada');
}

function renderClientClasses() {
  const user = currentUser(); if (!user) return;
  const available = document.getElementById('lista-clases-inicio'); const mine = document.getElementById('tabla-mis-clases');
  const classes = read(STORAGE.classes, []);
  if (available) available.innerHTML = classes.map(c => `<div class="clase-item"><span>${c.nombre}</span><button onclick="toggleClass('${c.nombre}')">${user.clases.includes(c.nombre) ? 'Salir' : 'Inscribirse'}</button></div>`).join('');
  if (mine) mine.innerHTML = user.clases.length ? user.clases.map(c => `<tr><td>${c}</td><td><button onclick="toggleClass('${c}')">Salir</button></td></tr>`).join('') : '<tr><td colspan="2">No estas inscrito en ninguna clase</td></tr>';
}

function toggleClass(name) {
  const user = currentUser(); if (!user) return;
  user.clases = user.clases.includes(name) ? user.clases.filter(c => c !== name) : [...user.clases, name];
  updateCurrentUser(user); renderClientClasses(); notify('Clases actualizadas');
}

function updateCurrentUser(user) {
  const list = users().map(u => u.id === user.id ? user : u); write(STORAGE.users, list); setCurrentUser(user);
}

function createRoutine(event) {
  event.preventDefault();
  const user = currentUser(); const key = STORAGE.routines + user.correo; const list = read(key, []);
  list.push({ nombre: document.getElementById('rutinaCliente').value.trim(), descripcion: document.getElementById('descRutinaCliente').value.trim() });
  write(key, list); event.target.reset(); renderRoutines(); notify('Rutina creada');
}

function renderRoutines() {
  const tbody = document.getElementById('tabla-rutinas'); if (!tbody) return;
  const user = currentUser(); const list = read(STORAGE.routines + user.correo, []);
  tbody.innerHTML = list.length ? list.map((r, i) => `<tr><td>${r.nombre}</td><td>${r.descripcion}</td><td><button onclick="deleteRoutine(${i})">Eliminar</button></td></tr>`).join('') : '<tr><td colspan="3">No tienes rutinas creadas</td></tr>';
}

function deleteRoutine(index) {
  const user = currentUser(); const key = STORAGE.routines + user.correo; const list = read(key, []); list.splice(index, 1); write(key, list); renderRoutines();
}

function saveRecord(event) {
  event.preventDefault();
  const user = currentUser(); const key = STORAGE.records + user.correo; const list = read(key, []);
  list.push({ ejercicio: document.getElementById('ejercicio').value.trim(), rep: Number(document.getElementById('repeticiones').value), peso: Number(document.getElementById('peso').value), fecha: todayISO() });
  write(key, list); event.target.reset(); renderRecords(); renderGoalsChart(); notify('Registro guardado');
}

function renderRecords() {
  const tbody = document.getElementById('historial'); if (!tbody) return;
  const user = currentUser(); const list = read(STORAGE.records + user.correo, []);
  tbody.innerHTML = list.length ? list.map(r => `<tr><td>${r.ejercicio}</td><td>${r.rep}</td><td>${r.peso} kg</td><td>${r.fecha}</td></tr>`).join('') : '<tr><td colspan="4">No hay registros todavia</td></tr>';
}

function userGoals() {
  const user = currentUser();
  return [...GLOBAL_GOALS, ...read(STORAGE.goals, []).filter(g => g.usuario === user.correo)];
}

function renderClientGoals() {
  const el = document.getElementById('metas-lista'); if (!el) return;
  el.innerHTML = userGoals().map(g => `<div class="card"><h3>${g.ejercicio}</h3><p>Meta: ${g.meta} reps</p></div>`).join('');
}

function renderGoalsChart() {
  const canvas = document.getElementById('grafica-metas'); if (!canvas || typeof Chart === 'undefined') return;
  const user = currentUser(); const records = read(STORAGE.records + user.correo, []); const goals = userGoals();
  const done = goals.filter(g => records.some(r => r.ejercicio.toLowerCase() === g.ejercicio.toLowerCase() && r.rep >= g.meta)).length;
  const missing = Math.max(goals.length - done, 0);
  const text = document.getElementById('texto-metas'); if (text) text.textContent = `Metas completadas: ${done}/${goals.length}`;
  if (window.goalsChart) window.goalsChart.destroy();
  window.goalsChart = new Chart(canvas.getContext('2d'), { type: 'doughnut', data: { labels: ['Cumplidas', 'Faltantes'], datasets: [{ data: [done, missing], backgroundColor: ['#3b82f6', '#ff4d4d'] }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#fff' } } } } });
}

document.addEventListener('DOMContentLoaded', () => {
  initData();
  document.getElementById('btnVolver')?.addEventListener('click', backHome);
  if (document.body.classList.contains('index-page')) renderIndex();
  if (document.body.classList.contains('register-body')) renderRegister();
  if (document.body.dataset.page === 'admin') renderAdmin();
  if (document.body.dataset.page === 'cliente') renderClient();
  if (params().get('registrado') === 'true') notify('Registro exitoso. Ahora puedes iniciar sesion.');
});

const ADMINS = [
{ email:"ke2812007@gmail.com", password:"kevin28122007"},
{ email:"dverapenuela@gmail.com", password:"1013609004"}
]

function getUsers(){
return JSON.parse(localStorage.getItem("users"))||[]
}

function saveUsers(users){
localStorage.setItem("users",JSON.stringify(users))
}

function getClases(){
return JSON.parse(localStorage.getItem("clases"))||[]
}

function saveClases(clases){
localStorage.setItem("clases",JSON.stringify(clases))
}

function setSession(user){
localStorage.setItem("session",JSON.stringify(user))
}

function getSession(){
return JSON.parse(localStorage.getItem("session"))
}

function logout(){
localStorage.removeItem("session")
window.location.href="login.html"
}

function register(){

const user={
email:document.getElementById("email").value,
password:document.getElementById("password").value,
telefono:document.getElementById("telefono").value,
tipoId:document.getElementById("tipoId").value,
numeroId:document.getElementById("numeroId").value,
peso:document.getElementById("peso").value,
edad:document.getElementById("edad").value,
altura:document.getElementById("altura").value,
membresia:"Básica",
clases:[]
}

const users=getUsers()

users.push(user)

saveUsers(users)

alert("Cuenta creada")

window.location.href="login.html"

}

function login(){

const email=document.getElementById("email").value
const password=document.getElementById("password").value

const admin=ADMINS.find(a=>a.email===email && a.password===password)

if(admin){

setSession({email:admin.email,rol:"admin"})
window.location.href="admin.html"
return

}

const users=getUsers()

const user=users.find(u=>u.email===email && u.password===password)

if(!user){
alert("Datos incorrectos")
return
}

setSession(user)

window.location.href="cliente.html"

}

function mostrarAdmin(id){

document.querySelectorAll(".admin-sec").forEach(sec=>{
sec.classList.add("hidden")
})

document.getElementById(id).classList.remove("hidden")

}

function mostrarCliente(id){

document.querySelectorAll(".cliente-sec").forEach(sec=>{
sec.classList.add("hidden")
})

document.getElementById(id).classList.remove("hidden")

}

function cargarClientes(){

const tabla=document.getElementById("tablaClientes")

if(!tabla) return

tabla.innerHTML=""

const users=getUsers()

users.forEach((u,i)=>{

tabla.innerHTML+=`
<tr>
<td>${u.email}</td>
<td>${u.membresia}</td>
<td>
<button onclick="eliminarCliente(${i})">Eliminar</button>
</td>
</tr>
`

})

}

function eliminarCliente(i){

const users=getUsers()

users.splice(i,1)

saveUsers(users)

cargarClientes()

}

function agregarClase(){

const nombre=document.getElementById("nombreClase").value
const horario=document.getElementById("horarioClase").value

if(nombre==""||horario==""){
alert("Completa los campos")
return
}

const clases=getClases()

clases.push({nombre,horario})

saveClases(clases)

cargarClasesAdmin()

}

function cargarClasesAdmin(){

const tabla=document.getElementById("tablaClasesAdmin")

if(!tabla) return

tabla.innerHTML=""

const clases=getClases()

clases.forEach((c,i)=>{

tabla.innerHTML+=`
<tr>
<td>${c.nombre}</td>
<td>${c.horario}</td>
<td>
<button onclick="eliminarClase(${i})">Eliminar</button>
</td>
</tr>
`

})

}

function eliminarClase(i){

const clases=getClases()

clases.splice(i,1)

saveClases(clases)

cargarClasesAdmin()

}

function cargarClasesCliente(){

const lista=document.getElementById("listaClasesCliente")

if(!lista) return

lista.innerHTML=""

const clases=getClases()

clases.forEach((c,i)=>{

lista.innerHTML+=`
<li>
${c.nombre} - ${c.horario}
<button onclick="inscribirse(${i})">Inscribirse</button>
</li>
`

})

}

function inscribirse(i){

alert("Inscripción realizada")

}

document.addEventListener("DOMContentLoaded",()=>{

cargarClientes()
cargarClasesAdmin()
cargarClasesCliente()

})

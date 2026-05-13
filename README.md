# 💪 FitManager

**FitManager** es un sistema web de gestión para gimnasios desarrollado en **Java Web (JSP + Servlets)** con **MySQL**, diseñado para administrar usuarios, membresías, rutinas, progreso físico y control administrativo de un gimnasio.

El sistema permite diferenciar entre **administradores** y **clientes**, brindando funcionalidades específicas para cada rol.

---

# 🚀 Características principales

## 👤 Gestión de usuarios
- Registro de usuarios.
- Inicio de sesión con autenticación.
- Gestión de roles:
  - Administrador
  - Cliente
- Asociación de membresías.
- Relación con tipos de documento.

## 🔐 Sistema de autenticación
- Login seguro mediante correo y contraseña.
- Validación de credenciales desde MySQL.
- Manejo de sesiones con `HttpSession`.
- Cierre de sesión (`LogoutServlet`).

## 🏋️ Gestión de rutinas
Los clientes pueden:

- Crear rutinas personalizadas.
- Agregar descripciones de entrenamiento.
- Visualizar rutinas guardadas.
- Eliminar rutinas.

---

## 📈 Seguimiento de progreso
El sistema incluye seguimiento del rendimiento físico mediante:

### Registro de ejercicios
El cliente puede registrar:

- Ejercicio realizado
- Número de repeticiones
- Peso levantado
- Fecha del entrenamiento

### Gráficas de progreso
Se utilizan gráficas dinámicas con **Chart.js** para mostrar:

- Constancia del usuario.
- Cumplimiento de metas.
- Progreso físico.

---

## 🎯 Sistema de metas
### Metas globales
El sistema posee metas generales predeterminadas.

Ejemplos:
- Press banca
- Sentadilla
- Curl bíceps

### Metas personalizadas
Los administradores pueden:

- Asignar metas a usuarios específicos.
- Establecer objetivos personalizados.
- Hacer seguimiento del cumplimiento.

---

## 🧾 Gestión de membresías
El sistema permite administrar distintos tipos de membresías:

- Diaria
- Mensual
- Bimestral
- Trimestral
- Semestral
- Anual

Cada membresía incluye:
- Precio
- Duración
- Asociación al usuario

---

## 📋 Panel administrativo
El administrador puede:

### Usuarios
- Visualizar usuarios registrados.
- Editar usuarios.
- Eliminar usuarios.
- Gestionar membresías.

### Clases
- Crear clases del gimnasio.
- Gestionar clases disponibles.

### Metas
- Asignar metas a clientes.

### Vencimientos
- Gestionar vencimientos de membresías.

---

## 🏢 Gestión empresarial del gimnasio
El sistema incluye módulos administrativos para:

### Facturación
- Factura cabecera
- Factura detallada
- Asociación de productos

### Productos
Ejemplos:
- Proteína
- Creatina
- Pre-entreno
- Botellas de agua

### Proveedores
Gestión de proveedores del gimnasio.

### Métodos de pago
- Efectivo
- Tarjeta
- Transferencia

### Sedes
Administración de sedes del gimnasio.

---

# 🛠 Tecnologías utilizadas

## Backend
- Java
- JSP
- Servlets
- JDBC

## Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Chart.js

## Base de datos
- MySQL / MariaDB

## IDE
- NetBeans

## Servidor
- GlassFish Server

---

# 🗄 Base de datos

El proyecto utiliza una base de datos llamada:

```sql
fitmanager

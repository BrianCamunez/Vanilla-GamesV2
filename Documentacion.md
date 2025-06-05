# Documentación
## Escenario del proyecto
**Vanilla Games S.L**. es una empresa de desarrollo de **minijuegos para navegadores web**, creados con vanillaJS, es decir, desarrollados exclusivamente con **Javascript** como lenguaje de programación (sin frameworks)

En esta empresa trabajan 10 desarrolladores y, habitualmente, suelen tener a tres alumnos/as en prácticas, de los cuales, al menos uno, tendrá muchas posibilidades de formar parte del equipo de desarrollo al acabar su etapa de formación.

El método de trabajo que se utiliza en dicha empresa consiste en **proponer a cada uno de los miembros del equipo el desarrollo de un minijuego** que, al acabar, deberán compartir con el resto de sus compañeros. Estos, a su vez, deben comentar y valorar cada una de las propuestas. Finalmente, en la empresa hay un equipo responsable de seleccionar aquellas propuestas que muestran un mayor potencial, para ser desarrolladas de manera definitiva por todo el equipo de trabajo, con el fin de crear una aplicación para su posterior comercialización.

Hasta la fecha, para el proceso de publicación de proyectos, comentarios y valoración utilizaban algunas herramientas ofimáticas, tipo hoja de cálculo de google. Actualmente pretenden crear una aplicación web tipo intranet para llevar a cabo este propósito.

Como alumno en prácticas, **tu trabajo consiste en crear una aplicación web que permitirá a los desarrolladores de Vanilla Games, publicar sus propuestas de minijuegos**, de manera que el resto de compañeros podrá hacer comentarios y emitir una valoración de cada proyecto publicado en esta plataforma.

## Diagrama de casos de uso

Registrar usuario: Un usuario puede registrarse en la plataforma proporcionando su nombre, apellidos, email y contraseña.
Recuperar contraseña: Un usuario registrado puede solicitar la recuperación de su contraseña en caso de que la haya olvidado. Para ello, se le enviará un correo electrónico con las instrucciones para restablecer su contraseña.
Iniciar sesión: Un usuario registrado puede iniciar sesión en la plataforma proporcionando su email y contraseña.
Cerrar sesión: Un usuario puede cerrar su sesión en la plataforma en cualquier momento.
Editar perfil: Un usuario registrado puede editar su perfil, actualizando su nombre, apellidos, email o contraseña.
Ver proyectos: Un usuario registrado puede ver un listado de proyectos publicados por los desarrolladores.
Publicar proyecto: Un usuario con el perfil de desarrollador puede publicar un proyecto proporcionando información como nombre, descripción, imagen representativa, enlaces a servidor de pruebas y repositorio de código, estado del proyecto, etc.
Editar proyecto: Un usuario con el perfil de desarrollador puede editar un proyecto que haya publicado previamente, actualizando la información del proyecto.
Eliminar proyecto: Un usuario con el perfil de desarrollador puede eliminar un proyecto que haya publicado previamente.
Ver/Editar usuarios: Un adminsrador puede ver una tabla con todos los usuarios que hay registrados y editar la información, incluido el ROL de usuario.
Eliminar usuario: Un administrador puede eliminar cualquier usuario registrado en la plataforma.

# Casos de Uso Específicos y Diagramas de Flujo

## Requisitos y Diagrama de Casos de Uso

En la versión 1.0 de esta aplicación, se han identificado los casos de uso generales asociados a cada actor del sistema (usuarios, desarrolladores y administradores). Estos casos han sido representados mediante un **diagrama de casos de uso**, lo cual ofrece una visión global de las funcionalidades disponibles.

En esta sección detallamos de manera más concreta los procesos implicados en cada funcionalidad, incluyendo los flujos alternativos y la gestión de errores del sistema o del usuario.

---

## Casos de Uso Específicos

### 1. Registrar usuario

**Actor**: Usuario no registrado  
**Precondición**: El usuario no ha iniciado sesión

**Flujo principal**:
1. El usuario accede a la página de registro.
2. Introduce su nombre, apellidos, email y contraseña.
3. El sistema valida que los campos estén completos y que el email no esté registrado previamente.
4. El sistema crea el usuario y muestra un mensaje de confirmación.
5. Redirección a la página de inicio.

**Flujos alternativos**:
- 3a. El email ya está registrado: el sistema muestra un mensaje de error.

---

### 2. Recuperar contraseña

**Actor**: Usuario registrado  
**Precondición**: El usuario no ha iniciado sesión

**Flujo principal**:
1. El usuario navega a la página de registro.
2. Selecciona "Recuperar contraseña".
3. El sistema valida el email ingresado.
4. Se envía el correo de recuperación y se muestra mensaje de confirmación.

**Flujos alternativos**:
- 3a. El email no está registrado: el sistema muestra un mensaje de error.

---

### 3. Iniciar sesión

**Actor**: Usuario registrado  
**Precondición**: El usuario no ha iniciado sesión

**Flujo principal**:
1. El usuario accede a la página de login.
2. Introduce sus credenciales.
3. El sistema valida las credenciales y crea una sesión.
4. Redirección a la página principal.

**Flujos alternativos**:
- 3a. Credenciales incorrectas: se muestra mensaje de error.

---

### 4. Cerrar sesión

**Actor**: Usuario registrado  
**Precondición**: El usuario ha iniciado sesión

**Flujo principal**:
1. El usuario hace clic en "Cerrar sesión".
2. El sistema elimina la sesión.
3. Redirección a la página de inicio.

---

### 5. Ver/Editar perfil

**Actor**: Usuario registrado  
**Precondición**: El usuario ha iniciado sesión

**Flujo principal**:
1. El usuario accede a su perfil.
2. Edita nombre, apellidos o contraseña.
3. El sistema valida y actualiza los datos.
4. Se muestra mensaje de confirmación.

**Flujos alternativos**:
- 3a. Cambio de email: el sistema valida si ya existe.

---

### 6. Ver proyectos

**Actor**: Usuario registrado  
**Precondición**: Usuario ha iniciado sesión

**Flujo principal**:
1. Accede a la sección de proyectos.
2. El sistema muestra la lista de proyectos disponibles.
3. El usuario puede ver detalles y utilizar filtros.

---

### 7. Publicar proyecto

**Actor**: Usuario registrado con perfil desarrollador  
**Precondición**: Usuario autenticado con rol desarrollador

**Flujo principal**:
1. Accede al formulario de publicación.
2. Rellena los datos del proyecto.
3. El sistema valida y guarda el proyecto.
4. Se muestra mensaje de confirmación y redirección.

**Flujos alternativos**:
- 2a. El usuario cancela: se descarta la información y se muestra mensaje de cancelación.

---

### 8. Editar proyecto

**Actor**: Desarrollador  
**Precondición**: Usuario autenticado con proyecto previo

**Flujo principal**:
1. Accede a la sección de proyectos.
2. Selecciona "Editar".
3. Modifica los campos necesarios.
4. El sistema valida y guarda los cambios.
5. Confirmación de actualización.

---

### 9. Eliminar proyecto

**Actor**: Desarrollador  
**Precondición**: Usuario autenticado con proyecto previo

**Flujo principal**:
1. Selecciona "Eliminar proyecto".
2. El sistema pide confirmación.
3. El usuario confirma la acción.
4. El sistema elimina el proyecto y actualiza la lista.

---

### 10. Ver/Editar usuario

**Actor**: Administrador  
**Precondición**: Usuario autenticado con rol administrador

**Flujo principal**:
1. Accede a la sección de usuarios.
2. Visualiza y edita los datos.
3. El sistema valida y actualiza la información.
4. Se muestra confirmación de la edición.

---

### 11. Eliminar usuario

**Actor**: Administrador  
**Precondición**: Usuario autenticado con rol administrador

**Flujo principal**:
1. Accede a la lista de usuarios.
2. Selecciona el icono de eliminación.
3. El sistema muestra advertencia sobre pérdida de datos.
4. El administrador confirma.
5. El sistema elimina al usuario y actualiza la vista.

---

## Gestión de errores comunes

- **Error de conexión**:  
  El sistema no puede acceder a la base de datos.  
  _Mensaje sugerido_: "No se pudo conectar con la base de datos. Inténtalo de nuevo o contacta con soporte."

- **Error de validación**:  
  Datos ingresados no cumplen el formato esperado.  
  _Mensaje sugerido_: "El campo 'email' debe tener un formato válido."

- **Error de autenticación**:  
  Acceso denegado por falta de credenciales válidas.  
  _Mensaje sugerido_: "Usuario o contraseña incorrectos. Intenta nuevamente o recupera tu contraseña."

- **Error de autorización**:  
  El usuario intenta ejecutar una acción no permitida por su rol.  
  _Mensaje sugerido_: "No tienes permisos para realizar esta acción."

- **Error interno del servidor**:  
  Problemas inesperados del lado del servidor.  
  _Mensaje sugerido_: "Ha ocurrido un error inesperado. Intenta más tarde o contacta con soporte técnico."

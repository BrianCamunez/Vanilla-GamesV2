import { perfiles } from "../../bd/datosPrueba"
import { ls } from "../components/funciones"
import { header } from "../components/header"
import { User } from "../../bd/user.js"
import { Perfil } from "../../bd/perfil.js"

export const loginVista = {
    template: `
  <main>
        <div class="container">
            <h1 class="mt-5 text-center">Inicia sesión</h1>
            <div class="m-5 mx-auto" style="max-width: 400px">
                <!-- Formulario de inicio de sesión (login) -->
                <form novalidate action="" class="form border shadow-sm p-3" id="form-login">
                    <label for="email" class="form-label">Email:</label>
                    <input required name="email" type="email" class="form-control" />
                    <div class="invalid-feedback">
                        El formato del email no es correcto
                    </div>
                    <!-- Contraseña -->
                    <label for="pass" class="form-label mt-3">Contraseña:</label>
                    <input required name="password" minlength="6" id="pass" type="password" class="form-control" />
                    <div class="invalid-feedback">
                        La contraseña debe tener como mínimo 6 caracteres
                    </div>

                    <!-- Recordar contraseña -->
                    <div class="form-check mt-3">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                        <label class="form-check-label" for="flexCheckChecked">
                            Recordar sesión
                        </label>
                    </div>

                    <!-- Link a recordar contraseña -->
                    <a class="d-block text-end" href="#">¿Has olvidado tu contraseña?</a>

                    <!-- Botón Iniciar sesión -->
                    <input type="submit" class="btn btn-primary w-100 mt-3" value="Iniciar sesión" />
                </form>
                <a class="d-block mt-5 btn btn-secondary mx-auto" href="#">¿Eres nuevo? Regístrate</a>
            </div>
        </div>
    </main>

  `,
    script: () => {
        console.log("vista de login cargada");

        const formulario = document.querySelector("#form-login")
        //Detectamos su evento submit (enviar)
        formulario.addEventListener("submit", (event) => {
            event.preventDefault()
            event.stopPropagation()
            // Añade siempre la clase para mostrar feedback de Bootstrap
            formulario.classList.add('was-validated')
            if (!formulario.checkValidity()) {
                console.log('No valida')
            } else {
                enviarDatos(formulario)
            }
        });



        async function enviarDatos(formulario) {
      try {
        // login
        const user = {
          email: formulario.email.value,
          password: formulario.password.value
        }
        console.log('Datos del formulario', user)
        User.logout()
        const usuarioLogueado = await User.login(user)
        console.log('¡login correcto!', usuarioLogueado)
        // Ahora vamos a capturar los datos del perfil del usuario logueado
        console.log('usuarioLogueado', usuarioLogueado);
        const userId = usuarioLogueado.id
        console.log('userId', userId);
        const perfilLogueado = await Perfil.getById(userId)
        console.log('Perfil logueado', perfilLogueado);
        const usuario = {
           email: usuarioLogueado.email,
           rol: perfilLogueado.rol,
            avatar: perfilLogueado.avatar
        }
         console.log('perfil localstorage', usuario);
        // Guardamos datos de usaurio en localstorage
        ls.setUsuario(usuario)
        //  Cargamos página home
         window.location = '#/proyectos'
        // // Actualizamos el header para que se muestren los menús que corresponden al rol
         header.script()
      } catch (error) {
        console.log('Error al iniciar sesión', error)
        alert('El usuario no existe o la contraseña no es correcta', error)
      }
    }
    


}
}

export default loginVista

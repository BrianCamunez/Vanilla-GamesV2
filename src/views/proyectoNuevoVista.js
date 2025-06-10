import { proyectos } from "../../bd/datosPrueba.js";
import { ls } from "../components/funciones.js";

export default {
  template: `
    <div class="container mt-5">
      <h2>Subir nuevo proyecto</h2>
      <form id="formProyectoNuevo" novalidate>
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre</label>
          <input type="text" id="nombre" class="form-control" required />
          <div class="invalid-feedback">El nombre es obligatorio.</div>
        </div>
        <div class="mb-3">
          <label for="descripcion" class="form-label">Descripción</label>
          <textarea id="descripcion" class="form-control" rows="3" required></textarea>
          <div class="invalid-feedback">La descripción es obligatoria.</div>
        </div>
        <div class="mb-3">
          <label for="imagen" class="form-label">URL Imagen</label>
          <input type="text" id="imagen" class="form-control" placeholder="Opcional"/>
        </div>
        <div class="mb-3">
          <label for="enlace" class="form-label">Enlace</label>
          <input type="url" id="enlace" class="form-control" placeholder="https://..." />
        </div>
        <div class="mb-3">
          <label for="repositorio" class="form-label">Repositorio</label>
          <input type="url" id="repositorio" class="form-control" placeholder="https://..." />
        </div>
        <div class="mb-3">
          <label for="estado" class="form-label">Estado</label>
          <select id="estado" class="form-select">
            <option value="activo" selected>Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Crear proyecto</button>
      </form>
    </div>
  `,
  script: () => {

    // Validación bootstrap
    // Capturamos el formulario en una variable
    const formulario = document.querySelector('#formProyectoNuevo')
    // Detectamos su evento submit (enviar)
    formulario.addEventListener('submit', (event) => {
      // Detenemos el evento enviar (submit)
      event.preventDefault()
      event.stopPropagation()
      // Comprobamos si el formulario no valida
      if (!formulario.checkValidity()) {
      // Y añadimos la clase 'was-validate' para que se muestren los mensajes
        formulario.classList.add('was-validated')
      } else {
        enviaDatos()
      }
    })

    // Función para enviar datos a la base de datos
    function enviaDatos () {
      const proyectoEditado = {
        imagen: document.querySelector('#urlImagen').value,
        nombre: document.querySelector('#nombreJuego').value,
        descripcion: document.querySelector('#descripcion').value,
        fecha: document.querySelector('#fecha').value,
        estado: document.querySelector('#estado').value,
        enlace: document.querySelector('#enlace').value,
        repositorio: document.querySelector('#repositorio').value
      }
      alert('Enviando proyecto a la base de datos')
      console.log('Enviando a la base de datos ', proyectoEditado)
    }
  }
};
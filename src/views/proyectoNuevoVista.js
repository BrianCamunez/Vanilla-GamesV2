import { Proyecto } from "../../bd/proyecto.js";
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
    const form = document.getElementById("formProyectoNuevo");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      const usuario = ls.getUsuario();
      console.log("Usuario desde localStorage:", usuario);  // <-- Aquí chequeamos qué usuario hay

      if (!usuario || !usuario.user_id) {
        alert("Debe iniciar sesión para crear un proyecto.");
        window.location = "#/login";
        return;
      }

      const nombre = document.getElementById("nombre").value.trim();
      const descripcion = document.getElementById("descripcion").value.trim();
      const imagen = document.getElementById("imagen").value.trim() || "images/imagenVacia.png";
      const enlace = document.getElementById("enlace").value.trim();
      const repositorio = document.getElementById("repositorio").value.trim();
      const estado = document.getElementById("estado").value;

      const nuevoProyecto = {
        user_id: usuario.user_id,
        nombre,
        descripcion,
        imagen,
        enlace,
        repositorio,
        estado,
      };

      try {
        await Proyecto.create(nuevoProyecto);
        alert("Proyecto creado con éxito!");
        window.location = "#/proyectos";
      } catch (error) {
        alert("Error al crear el proyecto: " + error.message);
      }
    });
  },
};
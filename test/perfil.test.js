import { expect } from "chai";
import { Perfil } from "../bd/perfil.js";
import { supabase } from "../bd/supabase.js";

describe("************** Perfil: Crearemos 4 usuarios con diferentes rols. El último lo leerermos, modificaremos y borraremos", () => {
  let perfilesCreados = [];
  let perfilFinal = null;

  before(async () => {
    // Limpia todos los perfiles antes de los tests
    await supabase.from("perfiles").delete().neq("id", 0);
  });

  it("getAll() debería devolver un array de perfiles vacío", async () => {
    const perfiles = await Perfil.getAll();
    expect(perfiles).to.be.an("array");
    expect(perfiles.length).to.equal(0);
  });

  it("create() debería crear un nuevo perfil en la tabla \"perfiles\"", async () => {
    const roles = ["usuario", "desarrollador", "admin", "root"];

    for (const rol of roles) {
      const perfil = await Perfil.create({
        nombre: `Nombre ${rol}`,
        apellidos: `Apellido ${rol}`,
        avatar: "http://avatar.com",
        estado: "activo",
        rol: rol,
        user_id: null,
      });
      perfilesCreados.push(perfil);
    }

    const todos = await Perfil.getAll();
    expect(todos.length).to.equal(4);
  });

  it("getById() debería devolver el perfil con el ID correspondiente", async () => {
    perfilFinal = perfilesCreados[3];
    const perfil = await Perfil.getById(perfilFinal.id);
    expect(perfil).to.be.an.instanceOf(Perfil);
  });

  it("actualizarPerfil debería actualizar el nombre y apellido del perfil", async () => {
    perfilFinal.nombre = "Nombre Modificado";
    perfilFinal.apellidos = "Apellido Modificado";
    const actualizado = await perfilFinal.update();

    expect(actualizado.nombre).to.equal("Nombre Modificado");
    expect(actualizado.apellidos).to.equal("Apellido Modificado");
  });

  it("borraPerfil debería borrar el último perfil creado", async () => {
    await Perfil.deleteById(perfilFinal.id);
    const todos = await Perfil.getAll();
    expect(todos.length).to.equal(3);
  });
});

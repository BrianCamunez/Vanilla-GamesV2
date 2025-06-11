import { s as supabase } from "./main-CO28YoMC.js";
class Perfil {
  constructor({ id, nombre, apellidos, avatar, estado, rol, user_id }) {
    this.id = id;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.avatar = avatar;
    this.estado = estado;
    this.rol = rol;
    this.user_id = user_id;
  }
  static async getAll() {
    const { data: perfiles, error } = await supabase.from("perfiles").select("*");
    if (error) throw new Error(error.message);
    return perfiles.map((p) => new Perfil(p));
  }
  static async getById(id) {
    const { data, error } = await supabase.from("perfiles").select("*").eq("user_id", id).single();
    if (error) throw new Error(error.message);
    return new Perfil(data);
  }
  static async create({ nombre, apellidos, avatar, estado, rol, user_id }) {
    const { data, error } = await supabase.from("perfiles").insert([
      { nombre, apellidos, avatar, estado, rol, user_id }
    ]).select();
    if (error) throw new Error(error.message);
    return new Perfil(data[0]);
  }
  static async deleteById(id) {
    const { error } = await supabase.from("perfiles").delete().eq("id", id);
    if (error) throw new Error(error.message);
  }
  // Método de instancia para actualizar el perfil actual
  async update() {
    const { data, error } = await supabase.from("perfiles").update({
      nombre: this.nombre,
      apellidos: this.apellidos,
      avatar: this.avatar,
      estado: this.estado,
      rol: this.rol
    }).eq("id", this.id).select();
    if (error) {
      throw new Error(`Error actualizando perfil: ${error.message}`);
    }
    return data && data[0] ? new Perfil(data[0]) : null;
  }
}
export {
  Perfil as P
};

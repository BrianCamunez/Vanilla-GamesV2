import { supabase } from "./supabase.js";

export class User {
  constructor(id = null, email = null) {
    this.id = id;
    this.email = email;
  }

  static async create(userData) {
    const { data, error } = await supabase.auth.signUp(userData);
    if (error) throw new Error(error.message);
    return new User(data.user.id, data.user.email);
  }

  static async login(userData) {
    const { data, error } = await supabase.auth.signInWithPassword(userData);
    if (error) throw new Error(error.message);
    return new User(data.user.id, data.user.email);
  }

  static async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    return true;
  }

  static async getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) return new User(user.id, user.email);
    return null;
  }

  // Método estático para actualizar datos del usuario y perfil
  static async update(userData) {
    const { user_id, email, contraseña, ...otrosCampos } = userData;

    if (!user_id) {
      throw new Error("El user_id es obligatorio para actualizar un usuario.");
    }

    // Actualizar email y contraseña en auth (si vienen)
    if (email || contraseña) {
      const { error: authError } = await supabase.auth.updateUser({
        email: email,
        password: contraseña,
      });
      if (authError) {
        throw new Error(authError.message);
      }
    }

    // Actualizar otros campos en la tabla perfiles
    if (Object.keys(otrosCampos).length > 0) {
      const { error } = await supabase
        .from("perfiles")
        .update(otrosCampos)
        .eq("user_id", user_id);

      if (error) {
        throw new Error(error.message);
      }
    }

    return true;
  }
}
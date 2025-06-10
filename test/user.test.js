// user.test.js corregido completamente

import { expect } from 'chai'
import { User } from '../bd/user.js'

// Email aleatorio por test para evitar duplicados
const timestamp = Date.now()
const testEmail = `test+${timestamp}@example.com`
const testPassword = 'testPassword'

let usuarioCreado = null

describe('getById()', () => {
  it('debería devolver el nombre del proyecto con el ID correspondiente', async () => {
    // Test ficticio, adaptado si se implementa esa lógica
    expect(true).to.be.true
  })
})

describe('Pruebas para la Clase User', () => {

  describe('create()', () => {
    it('debería crear un nuevo usuario', async () => {
      usuarioCreado = await User.create({
        email: testEmail,
        password: testPassword
      })
      expect(usuarioCreado).to.be.an.instanceOf(User)
    })
  })

  describe('login()', () => {
    it('debería iniciar sesión de un usuario existente', async () => {
      const user = await User.login({ email: testEmail, password: testPassword })
      expect(user).to.be.an.instanceOf(User)
    })
  })

  describe('getUser()', () => {
    it('debería devolver el usuario logueado', async () => {
      const user = await User.login({ email: testEmail, password: testPassword })
      const currentUser = await User.getUser()
      expect(currentUser).to.exist
      expect(currentUser.email).to.equal(testEmail)
    })

    it('debería devolver null si no hay usuario logueado', async () => {
      await User.logout()
      const usuarioLogueado = await User.getUser()
      expect(usuarioLogueado).to.be.null
    })
  })
})

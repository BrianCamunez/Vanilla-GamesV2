// test/proyecto.test.js

import { expect } from 'chai'
import { Proyecto } from '../bd/proyecto.js'
import { supabase } from '../bd/supabase.js'

describe('Tests para la clase Proyecto', () => {
  let proyectoCreado = null

  const proyectoData = {
    user_id: '2c6a8cb1-24cb-4a0d-80c9-0f8289a6ea2f',
    nombre: 'Proyecto Test',
    descripcion: 'Descripción del proyecto de prueba',
    imagen: 'https://via.placeholder.com/150',
    enlace: 'https://proyecto.test',
    repositorio: 'https://github.com/test/proyecto',
    estado: 'activo'
  }

  before(async () => {
    // Limpia proyectos previos del usuario de prueba
    await supabase.from('proyectos').delete().eq('user_id', proyectoData.user_id)
  })

  it('create() debería crear un nuevo proyecto', async () => {
    proyectoCreado = await Proyecto.create(proyectoData)
    expect(proyectoCreado).to.be.an.instanceOf(Proyecto)
    expect(proyectoCreado.nombre).to.equal(proyectoData.nombre)
  })

  it('getById() debería devolver el proyecto creado por su ID', async () => {
    const proyecto = await Proyecto.getById(proyectoCreado.id)
    expect(proyecto).to.be.an.instanceOf(Proyecto)
    expect(proyecto.nombre).to.equal('Proyecto Test')
  })

  it('getByUserId() debería devolver el proyecto del user_id de prueba', async () => {
    const proyecto = await Proyecto.getByUserId(proyectoData.user_id)
    expect(proyecto).to.be.an.instanceOf(Proyecto)
    expect(proyecto.user_id).to.equal(proyectoData.user_id)
  })

  it('update() debería actualizar el nombre del proyecto', async () => {
    const nuevoNombre = 'Proyecto Actualizado'
    const actualizado = await Proyecto.update(proyectoCreado.id, { nombre: nuevoNombre })
    expect(actualizado).to.be.true

    const actualizadoDesdeBD = await Proyecto.getById(proyectoCreado.id)
    expect(actualizadoDesdeBD.nombre).to.equal(nuevoNombre)
  })

  it('delete() debería eliminar el proyecto creado', async () => {
    const eliminado = await Proyecto.delete(proyectoCreado.id)
    expect(eliminado).to.be.true

    const todos = await Proyecto.getAll()
    const encontrado = todos.find(p => p.id === proyectoCreado.id)
    expect(encontrado).to.be.undefined
  })
})

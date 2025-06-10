export const enrutador = {
  // Objeto (diccionario) con todas las rutas y su vista asociada
  rutas: {
    home: () => import('../views/homeVista.js'),
    // Usuarios
    admin: () => import('../views/adminVista.js'),
    registro: () => import('../views/registroVista.js'),
    login: () => import('../views/loginVista.js'),
    // Proyectos
    proyectos: () => import('../views/proyectosVista.js'),
    proyectoNuevo: () => import('../views/proyectoNuevoVista.js'),
    proyectoEditar: () => import('../views/proyectoEditarVista.js'),
    proyectoDetalle: () => import('../views/proyectoDetalleVista.js'),
    '404': () => import('../views/404.js')
  },

  // Método que obtiene la ruta del navegador
  router: async () => {
    // Capturamos el hash que ha cambiado en la url
    const pathCompleto = window.location.hash || '#/home'  // Si no hay hash, ponemos home por defecto
    // Separamos la ruta del posible parámetro
    const path = pathCompleto.split('/')[1] || 'home'
    const parametro = pathCompleto.split('/')[2] || null

    // Obtenemos la función de importación de la ruta
    const importarVista = enrutador.rutas[path]

    if (importarVista) {
      try {
        // Importamos el módulo dinámicamente
        const modulo = await importarVista()
        // Obtenemos el objeto del componente (export default)
        const vista = modulo.default

        // Inyectamos la plantilla en main
        document.querySelector('main').innerHTML = vista.template

        // Ejecutamos el script pasando el parámetro (puede ser null)
        if (vista.script) {
          vista.script(parametro)
        }
      } catch (error) {
        console.error('Error cargando la vista:', error)
        window.location.hash = '#/404'
      }
    } else {
      // Si la ruta no existe, redirigimos a 404
      window.location.hash = '#/404'
    }
  },

  // Capturamos los eventos
  observadorRutas: () => {
    document.body.addEventListener('click', event => {
      const link = event.target.closest('a.router-link')
      if (link) {
        event.preventDefault()
        const href = link.getAttribute('href')

        // Cambiamos la url y ejecutamos el router
        window.history.pushState({ path: href }, '', href)
        enrutador.router()
      }
    })

    // Detectamos cuando se usa el historial (botones adelante/atrás)
    window.addEventListener('popstate', () => {
      enrutador.router()
    })
  }
}
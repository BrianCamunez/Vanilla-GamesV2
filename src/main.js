import { header } from './components/header'
import { footer } from './components/footer'

// Import all of Bootstrap's JS
import 'bootstrap'

// Import our custom CSS
import './scss/styles.scss'


// Importamos la vista por defecto (que será home)
async function cargarVista () {
  const componente = await import('./views/registroVista')
  const vista = componente.default
  // Inyectamos la vista home
  document.querySelector('main').innerHTML = vista.template

  vista.script()

}
cargarVista()

//Inyectamos el componente header
document.querySelector('header').innerHTML = header.template

//Inyectamos el componente footer
document.querySelector('footer').innerHTML = footer.template
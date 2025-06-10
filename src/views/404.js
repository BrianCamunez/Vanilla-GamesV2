const error404 = {
  template: `
    <main>
      <div class="container text-center mt-5">
        <h1 class="display-1">404</h1>
        <p class="lead">Página no encontrada</p>
        <a href="#/home" class="btn btn-primary router-link">Volver al inicio</a>
      </div>
    </main>
  `,
  script: () => {
    // Aquí puedes poner lógica JS si lo necesitas, o dejarlo vacío
  }
}

export default error404
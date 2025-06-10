import { Perfil } from "../../bd/perfil"

export const homeVista = {
    template: `
  <main>
            <div class="container">
                <h1 class="mt-5 text-center fw-bold" style="font-size: 100px;">Vanilla Games</h1>
                <div class="m-5 mx-auto" style="max-width: 400px">
                    <img
                            src="./images/LogoVanilla.svg"
                            alt="fpllefia"
                            class="img-fluid"
                        />
                </div>
            </div>
        </main>

  `,
    script: async () => {
  console.log("Vista home cargada");

  try {
    const resultado = await Perfil.getAll();
    console.log("Resultado perfiles:", resultado, Array.isArray(resultado), resultado.length)

  } catch (err) {
    console.error("Error al obtener perfiles:", err);
  }
}

}

export default homeVista

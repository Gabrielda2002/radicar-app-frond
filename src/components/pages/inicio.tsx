import ExternalScriptComponent from "../ExternalScriptComponent"; // Asegúrate de que la ruta sea correcta

const Inicio = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center border-2 rounded-full border-rose-500">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 dark:text-gray-200">
            Bienvenidos a Nordvital
          </h1>
        </div>

        {/* Aquí es donde insertas el componente que carga el script externo */}
        <ExternalScriptComponent />

      </div>
    </section>
  );
};

export default Inicio;

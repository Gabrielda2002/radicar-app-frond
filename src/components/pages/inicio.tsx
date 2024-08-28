// import ExternalScriptComponent from "../ExternalScriptComponent";
const Inicio = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto">
        <div className="flex flex-col flex-wrap items-center w-full mb-20 text-center border-2 rounded-full border-rose-500">
          <h1 className="mb-2 text-2xl font-medium text-gray-900 sm:text-3xl title-font dark:text-gray-200">
            Bienvenidos a Nordvital
          </h1>
        </div>

        {/* Aquí es donde insertas el componente que carga el script externo */}
        {/* <ExternalScriptComponent /> */}
      </div>
    </section>
  );
};

export default Inicio;

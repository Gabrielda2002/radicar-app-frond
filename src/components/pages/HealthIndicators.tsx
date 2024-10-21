const healthData = [
  {
    id: 1,
    title: "Vacunación",
    value: "N/A",
    description: "Vacunación completada contra la influenza",
  },
  {
    id: 2,
    title: "Pasos diarios",
    value: "N/A",
    description: "Promedio de pasos diarios esta semana",
  },
  {
    id: 3,
    title: "IMC Promedio",
    value: "N/A",
    description: "Índice de Masa Corporal promedio",
  },
  {
    id: 4,
    title: "Presión Arterial",
    value: "N/A",
    description: "Presión arterial promedio",
  },
];

const HealthIndicators = () => {
  return (
    <section className="w-full h-full p-6 rounded-lg bg-gray-50 dark:bg-gray-700">
      <h2 className="mb-4 text-2xl font-bold text-center dark:text-white">Indicadores de Salud</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {healthData.map((item) => (
          <div key={item.id} className="p-4 text-center border rounded-lg shadow-md dark:shadow-indigo-500/40 dark:text-white">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-3xl font-bold text-green-500">{item.value}</p>
            <p className="text-gray-600 dark:text-white">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HealthIndicators;

import React from "react";
import { useFetchQuantity } from "../Hooks/useFetchQuantity";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface QuantityItemsStaticsProps {
  typeItem: "equipos" | "dispositivos-red" | "inventario/general";
}

const QuantityItemsStatics: React.FC<QuantityItemsStaticsProps> = ({
  typeItem,
}) => {
  const COLORS = [
    "#F1BB87",
    "#F78E69",
    "#5D675B",
    "#F7EF99",
    "#ABE188",
    "#E2D4B7",
    "#9C9583",
  ];

  const { quantity, loading, error } = useFetchQuantity(typeItem);

  const prepareChartData = () => {
    if (!quantity || quantity.length === 0) return [];

    return quantity.map((item) => {
      return {
        name: item.sedeName,
        value: parseInt(item.count, 10),
      };
    });
  };

  const chartData = prepareChartData();

  return (
    <>
      <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="p-4 text-red-500 bg-red-100 rounded-md dark:text-red-400 dark:bg-red-900/30">
            {error}
          </div>
        ) : quantity ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
          <div className="p-4 rounded-lg shadow-sm h-[295px] md:h-64 bg-gray-50 dark:bg-gray-700">
              <h2 className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">
                Distribución de Cantidad de {typeItem}
              </h2>
              <ResponsiveContainer
                width={"100%"}
                height={"85%"}
                maxHeight={215}
                minHeight={200}
              >
                <PieChart>
                  <Pie
                    data={chartData}
                    cx={"50%"}
                    cy={"50%"}
                    labelLine={false}
                    label={false}
                    outerRadius={67}
                    fill="#8884d8"
                    dataKey={"value"}
                  >
                    {quantity.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, _, props) => [
                      `${value} ${
                        typeItem === "equipos" ? "equipos" : "ítems"
                      }`,
                      props.payload.name,
                    ]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500 bg-gray-100 rounded-md dark:text-gray-400 dark:bg-gray-700/30">
            No hay datos disponibles para mostrar.
          </div>
        )}
      </div>
    </>
  );
};
export default QuantityItemsStatics;

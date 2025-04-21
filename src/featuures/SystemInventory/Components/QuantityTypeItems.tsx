import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import { useFetchQuantityTypeItems } from '../Hooks/useFetchQuantityTypeItems';
import { IQuantityTypeItems } from '../Models/IQuantityTypeItems';

interface QuantityTypeItensProps {
    typeItem: string;
}

const QuantityTypeItens: React.FC<QuantityTypeItensProps> = ({
    typeItem,
}) => {
    const { quantity, loading, error } = useFetchQuantityTypeItems(typeItem);

    // Colores para el gráfico circular
    const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28'];

    // Preparar datos para el gráfico circular
    const prepareChartData = () => {
        if (!quantity) return [];

        return quantity.map((item: IQuantityTypeItems) => ({
            name: item.typeEquipment,
            value: Number(item.count),
        }));
    };

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
    }: {
        cx: number;
        cy: number;
        midAngle: number;
        innerRadius: number;
        outerRadius: number;
        percent: number;
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
                fontWeight="bold"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const chartData = prepareChartData();

    console.log('chartData', chartData);

    return (
        <>
            <div className='flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800'>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <LoadingSpinner />
                    </div>
                ) : error ? (
                    <div className="p-4 text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/30 rounded-md">
                        {error}
                    </div>
                ) : quantity ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {/* Gráfico circular */}
                        <div className='h-64 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm'>
                            <h2 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Distribución de Items</h2>
                            <ResponsiveContainer width="100%" height="90%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {chartData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [`${value} items`, 'Cantidad']} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Tarjetas con información detallada */}
                        <div className='grid grid-cols-2 gap-4'>
                            {quantity.map((item: IQuantityTypeItems, index: number) => (
                                <div key={index} className='bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg shadow-sm'>
                                    <h3 className='text-sm font-medium text-gray-600 dark:text-gray-400'>{item.typeEquipment}</h3>
                                    <p className='text-2xl font-bold text-gray-800 dark:text-gray-200'>{item.count}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
};

export default QuantityTypeItens;

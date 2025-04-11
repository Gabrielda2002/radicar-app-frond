import React from 'react'
import { useFetchItemsWithLock } from '../Hooks/useFetchItemsWithLock'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ItemsWithLockStaticsProps {
    typeItem: "equipos" | "dispositivos-red" | "inventario/general";
}

const ItemsWithLockStatics: React.FC<ItemsWithLockStaticsProps> = ({
    typeItem,
}) => {
    const { withLock, loading, error } = useFetchItemsWithLock(typeItem);
    
    // Colores para el gráfico circular
    const COLORS = ['#FF8042', '#0088FE']; // Naranja para bloqueados, Azul para desbloqueados
    
    // Preparar datos para el gráfico circular
    const prepareChartData = () => {
        if (!withLock || typeof withLock !== 'object') return [];
        
        // Asumiendo que withLock tiene la estructura { blocked: number, total: number, percentage: number }
        const blocked = withLock.withLock || 0;
        const total = withLock.total || 0;
        const unblocked = total - blocked;
        
        return [
            { name: 'Bloqueados', value: blocked },
            { name: 'Desbloqueados', value: unblocked }
        ];
    };
    
    // Renderizar etiquetas personalizadas en el gráfico
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
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
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
    
    // Obtener el porcentaje para mostrarlo como título
    const getBlockedPercentage = () => {
        if (!withLock || typeof withLock !== 'object') return "0%";
        return `${withLock.percentage ? parseInt(withLock.percentage).toFixed(1) : 0}%`;
    };
    
    return (
        <>
            <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <LoadingSpinner />
                    </div>
                ) : error ? (
                    <div className="p-4 text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/30 rounded-md">
                        {error}
                    </div>
                ) : withLock ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Gráfico circular */}
                        <div className="h-64 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                            <h2 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">
                                Distribución de Candado
                            </h2>
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
                                    <Tooltip 
                                        formatter={(value) => [`${value} ${typeItem === "equipos" ? "equipos" : "ítems"}`, 'Cantidad']} 
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        
                        {/* Tarjetas con información detallada */}
                        <div className="grid grid-cols-2 gap-4 h-64">
                            <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg shadow-sm">
                                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Bloqueados</h3>
                                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{withLock.withLock || 0}</p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    {getBlockedPercentage()} del total
                                </p>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg shadow-sm">
                                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</h3>
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{withLock.total || 0}</p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    {typeItem === "equipos" ? "Equipos" : "Ítems"} registrados
                                </p>
                            </div>
                            <div className="col-span-2 bg-green-50 dark:bg-green-900/30 p-4 rounded-lg shadow-sm">
                                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Sin Candado</h3>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {(withLock.total || 0) - (withLock.withLock || 0)}
                                </p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    {(100 - (parseInt(withLock.percentage) || 0)).toFixed(1)}% del total
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    )
}

export default ItemsWithLockStatics
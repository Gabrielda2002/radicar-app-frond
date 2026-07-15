import React from 'react'

interface SummaryCardProps {
    label: string
    value: number
    variant: 'default' | 'success' | 'error' | 'warning' | 'info'
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, variant }) => {

    const variantClasses: Record<SummaryCardProps['variant'], string> = {
        default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
        success: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        error: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        warning: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        info: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    }

    return (
        <>
            <div className={`rounded-lg p-4 text-center ${variantClasses[variant]}`}>
                <p className='text-2xl font-bold'>{value}</p>
                <p className='mt-1 text-xs font-medium'>{label}</p>
            </div>
        </>
    )
}

export default SummaryCard

import ProfileField from './ProfileField'
import { VscError } from "react-icons/vsc";
import { useFetchMyBalance } from '../hooks/useFetchMyBalance';
import { MdDateRange } from 'react-icons/md';
import { FormatDate } from '@/utils/FormatDate';
import { FaRegCheckCircle } from 'react-icons/fa';

const UserBalanceVacations = () => {

    const { data } = useFetchMyBalance();

    return (
        <div className='grid md:grid-cols-2 grid-cols-1 gap-6 p-6'>
            {data?.data.periodos.map((p, index) => (
                <div
                    key={index}
                >
                    <h2 className={`text-xl font-semibold ${p.vencido ? "text-rose-600" : "text-gray-900 dark:text-white"} mb-6`}>
                        Periodo #{index + 1}
                    </h2>
                    <ProfileField
                        icon={MdDateRange}
                        label={`Fecha Inicio ${index + 1}:`}
                        value={FormatDate(p.fechaInicio, false)}
                        title={`Fecha de Inicio del Periodo ${index + 1}`}
                    />
                    <ProfileField
                        icon={MdDateRange}
                        label={`Fecha Fin ${index + 1}:`}
                        value={FormatDate(p.fechaFin, false)}
                        title={`Fecha de Fin del Periodo ${index + 1}`}
                    />
                    <ProfileField
                        icon={parseInt(p.diasDisponibles) > 0 ? FaRegCheckCircle : VscError}
                        label={`Dias disponibles ${index + 1}:`}
                        value={p.diasDisponibles}
                        title={`Días disponibles del Periodo ${index + 1}`}
                    />
                </div>
            ))}
        </div>
    )
}

export default UserBalanceVacations

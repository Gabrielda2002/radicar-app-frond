import HeaderPage from '@/components/common/HeaderPage/HeaderPage'
import Card from '../components/Card'
import { REPORT_CONFIG } from '../config/reportConfig'
import { useState } from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Input from '@/components/common/Ui/Input';
import { ArrowLeft } from 'lucide-react';
import Button from '@/components/common/Ui/Button';
import { useGeneratePreview } from '../hook/useGeneratePreview';
import TableReportPreview from '../components/TableReportPreview';

const Reports = () => {

    const [selectedReport, setSelectedReport] = useState<string | null>(null);

    const { dataPreview, generatePreview } = useGeneratePreview();

    const validationSchema = Yup.object({
        dateStart: Yup.date().required('La fecha de inicio es requerida'),
        dateEnd: Yup.date().optional(),
        cupsCode: Yup.string().optional(),
        estadoCups: Yup.string().optional(),
        headquarter: Yup.number().optional(),
        convenio: Yup.number().optional(),
    })

    const formik = useFormik({
        initialValues: {
            dateStart: '',
            dateEnd: '',
            cupsCode: '',
            estadoCups: '',
            headquarter: 0,
            convenio: 0,
        },
        validationSchema,
        onSubmit: async (values) => {
            await generatePreview(values.dateStart, values.dateEnd, values.cupsCode, values.estadoCups);
        }
    })

    const handleCardClick = (reportId: string) => {
        setSelectedReport(reportId);
    }

    return (
        <>
            <HeaderPage
                breadcrumb={[
                    { label: "Inicio", path: "/home" },
                    { label: "Reportes", path: "" },
                ]}
                title="Reportes"
            />
            <div className=' p-5 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40'>
                {selectedReport === null ? (
                    <div className='grid grid-cols-3 gap-4 p-5'>
                        {REPORT_CONFIG.map((r) => (
                            <div key={r.id}>
                                <Card
                                    title={r.title}
                                    description={r.description}
                                    icon={r.icon}
                                    onClick={() => handleCardClick(r.id)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        {/* arrow for come back */}
                        <button type='button' onClick={() => setSelectedReport(null)} className=' flex items-center text-blue-500 hover:text-blue-700 font-medium mb-4'>
                            <ArrowLeft className='w-5 h-5' />
                            Atras
                        </button>
                        <div className='grid grid-cols-3 gap-4'>
                            {/* form fields */}
                            <form onSubmit={formik.handleSubmit}>
                                <div className='grid grid-cols-1 gap-4 p-2 border'>
                                    <Input
                                        type='date'
                                        label='Fecha de Inicio'
                                        name='dateStart'
                                        value={formik.values.dateStart}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.dateStart && formik.errors.dateStart ? formik.errors.dateStart : undefined}
                                        touched={formik.touched.dateStart}
                                    />
                                    <Input
                                        type='date'
                                        label='Fecha de Fin'
                                        name='dateEnd'
                                        value={formik.values.dateEnd}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.dateEnd && formik.errors.dateEnd ? formik.errors.dateEnd : undefined}
                                        touched={formik.touched.dateEnd}
                                    />
                                    {selectedReport === 'radicacion' && (
                                        <>
                                            <Input
                                                type='text'
                                                label='Código CUPS'
                                                name='cupsCode'
                                                value={formik.values.cupsCode}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.cupsCode && formik.errors.cupsCode ? formik.errors.cupsCode : undefined}
                                                touched={formik.touched.cupsCode}
                                            />
                                            {/* reeplazar por select*/}
                                            <Input
                                                type='text'
                                                label='Estado CUPS'
                                                name='estadoCups'
                                                value={formik.values.estadoCups}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.estadoCups && formik.errors.estadoCups ? formik.errors.estadoCups : undefined}
                                                touched={formik.touched.estadoCups}
                                            />
                                            <Button
                                                type='submit'
                                            >
                                                Generar Reporte
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </form>

                            {/* information for the selected report */}
                            <div className='border col-span-2'>
                                <TableReportPreview
                                    data={dataPreview}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div >
        </>
    )
}

export default Reports

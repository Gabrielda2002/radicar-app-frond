import HeaderPage from '@/components/common/HeaderPage/HeaderPage'
import Card from '../components/Card'
import { REPORT_CONFIG } from '../config/reportConfig'
import { Suspense, useState, useMemo, useEffect } from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Input from '@/components/common/Ui/Input';
import Select from '@/components/common/Ui/Select';
import { ArrowDownToLine, ArrowLeft } from 'lucide-react';
import Button from '@/components/common/Ui/Button';
import { useGeneratePreview } from '../hook/useGeneratePreview';
import TableReportPreview from '../components/TableReportPreview';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import { useDownloadReport } from '@/featuures/Reports/hook/UseDownloadReport';
import { AnimatePresence } from 'framer-motion';
import { ReportStrategyFactory } from '../strategies/ReportStrategy';
import { useAuth } from '@/context/authContext';
import InputAutocompletado from '@/components/common/InputAutoCompletado/InputAutoCompletado';

const Reports = () => {

    const { rol } = useAuth();

    const [selectedReport, setSelectedReport] = useState<string | null>(null);
    const [filteredReports, setFilteredReports] = useState<typeof REPORT_CONFIG>([]);

    const { dataPreview, generatePreview, isLoading, error, clearPreview } = useGeneratePreview();

    useEffect(() => {
        if (rol) {
            const filtered = REPORT_CONFIG.filter(r => r.roles.includes(String(rol)));
            setFilteredReports(filtered);
        } else {
            setFilteredReports([]);
        }
    }, [rol]);

    const { downloadReport, error: dError, loading: dLoading } = useDownloadReport();

    // Get the strategy for the selected report
    const strategy = useMemo(() => {
        if (!selectedReport) return null;
        try {
            return ReportStrategyFactory.getStrategy(selectedReport);
        } catch (error) {
            console.error(error);
            return null;
        }
    }, [selectedReport]);

    // Generate dynamic validation schema based on selected report
    const validationSchema = useMemo(() => {
        const baseSchema = Yup.object({
            dateStart: Yup.date().required('La fecha de inicio es requerida'),
            dateEnd: Yup.date().optional(),
        });

        if (!strategy) return baseSchema;

        // Merge with strategy-specific validation
        return baseSchema.concat(strategy.getValidationSchema());
    }, [strategy]);

    // Generate initial values dynamically based on selected report
    const initialValues = useMemo(() => {
        const baseValues: Record<string, any> = {
            dateStart: '',
            dateEnd: '',
        };

        if (!strategy) return baseValues;

        // Add extra filter fields from strategy
        strategy.getFilterFields().forEach(field => {
            baseValues[field.name] = field.type === 'number' ? 0 : '';
        });

        return baseValues;
    }, [strategy]);

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            if (!strategy) return;

            const payload = strategy.buildPayload(values);
            const previewEndpoint = strategy.getPreviewEndpoint();

            await generatePreview(previewEndpoint, payload);
        }
    })

    // Clear preview when report type changes
    useEffect(() => {
        if (selectedReport !== null) {
            clearPreview();
        }
    }, [selectedReport]);

    const handleCardClick = (reportId: string) => {
        setSelectedReport(reportId);
    }

    const handleDownloadReport = async () => {
        if (!strategy) return;

        try {
            const downloadEndpoint = strategy.getDownloadEndpoint();
            const payload = strategy.buildPayload(formik.values);

            await downloadReport({
                dateStart: payload.dateStart,
                dateEnd: payload.dateEnd,
                cupsCode: payload.cupsCode,
                statusCups: payload.statusCups,
                headquarter: payload.headquarter,
                convenio: payload.convenio,
                specialty: payload.specialty,
            },
                downloadEndpoint
            );
        } catch (error) {
            console.error("Error al descargar reporte:", error);
        }
    };

    const handleGoBack = () => {
        setSelectedReport(null);
        formik.resetForm();
        clearPreview();
    }
    return (
        <>
            <HeaderPage
                breadcrumb={[
                    { label: "Inicio", path: "/home" },
                    { label: "Reportes", path: "" },
                ]}
                title="Generación de Reportes"
                description='Aquí tendrás acceso a los diferentes reportes disponibles en el sistema dependiendo de tu rol. Selecciona un reporte para configurar los filtros y generar una vista previa antes de descargarlo.'
            />
            <div className='p-5 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40'>
                {selectedReport === null ? (
                    <>
                        {!rol ? (
                            <div className='flex items-center justify-center p-10'>
                                <LoadingSpinner />
                            </div>
                        ) : filteredReports.length === 0 ? (
                            <div className='flex flex-col items-center justify-center p-10 text-gray-500 dark:text-gray-400'>
                                <p className='text-lg font-semibold'>No tienes acceso a ningún reporte</p>
                                <p className='text-sm'>Contacta al administrador si crees que esto es un error</p>
                            </div>
                        ) : (
                            <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-4 p-5'>
                                {filteredReports.map((r) => (
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
                        )}
                    </>
                ) : (
                    <div>
                        {/* arrow for come back */}
                        <button type='button' onClick={handleGoBack} className='cursor-pointer flex items-center text-blue-500 hover:text-blue-700 font-medium mb-4'>
                            <ArrowLeft className='w-5 h-5' />
                            Atras
                        </button>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            {/* form fields */}
                            <form onSubmit={formik.handleSubmit} className='col-span-1 p-4'>
                                <div className='mb-4 text-gray-800 dark:text-gray-100'>
                                    <h3 className='text-xl font-bold my-4 text-gray-800 dark:text-gray-100'>
                                        Filtros para el reporte de {REPORT_CONFIG.find(r => r.id === selectedReport)?.title}:
                                    </h3>
                                </div>
                                <div className='grid grid-cols-1 gap-4'>
                                    {/* Common filters: dateStart and dateEnd */}
                                    <Input
                                        type='date'
                                        label='Fecha de Inicio'
                                        name='dateStart'
                                        value={formik.values.dateStart}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.dateStart && formik.errors.dateStart ? String(formik.errors.dateStart) : undefined}
                                        touched={!!formik.touched.dateStart}
                                        required
                                    />
                                    <Input
                                        type='date'
                                        label='Fecha de Fin'
                                        name='dateEnd'
                                        value={formik.values.dateEnd}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.dateEnd && formik.errors.dateEnd ? String(formik.errors.dateEnd) : undefined}
                                        touched={!!formik.touched.dateEnd}
                                        required
                                    />

                                    {/* Dynamic extra filters from strategy */}
                                    {strategy?.getFilterFields().map((field) => {
                                        if (field.type === 'select') {
                                            return (
                                                <Select
                                                    key={field.name}
                                                    label={field.label}
                                                    name={field.name}
                                                    value={formik.values[field.name]}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.touched[field.name] && formik.errors[field.name] ? String(formik.errors[field.name]) : undefined}
                                                    touched={!!formik.touched[field.name]}
                                                    options={field.options || []}
                                                />
                                            );
                                        }
                                        if (field.type === 'autocomplete' && field.endpoint) {
                                            return (
                                                <InputAutocompletado
                                                    label={field.label}
                                                    onInputChanged={(value) => formik.setFieldValue(field.name, value)}
                                                    apiRoute={field.endpoint}
                                                    error={formik.touched[field.name] && formik.errors[field.name] ? String(formik.errors[field.name]) : undefined}
                                                    touched={!!formik.touched[field.name]}
                                                    placeholder='Ingrese para buscar...'
                                                />
                                            )
                                        }

                                        return (
                                            <Input
                                                key={field.name}
                                                type={field.type}
                                                label={field.label}
                                                name={field.name}
                                                value={formik.values[field.name]}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched[field.name] && formik.errors[field.name] ? String(formik.errors[field.name]) : undefined}
                                                touched={!!formik.touched[field.name]}
                                            />
                                        );
                                    })}

                                    <Button
                                        type='submit'
                                        disabled={!formik.isValid || formik.isSubmitting}
                                    >
                                        {isLoading ? 'Generando Preview...' : 'Generar Preview'}
                                    </Button>

                                    <AnimatePresence>
                                        {error && (
                                            <div>
                                                <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
                                                    {error}
                                                </div>
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </form>

                            {/* preview report */}
                            <div className='col-span-2'>
                                <div className='flex items-center justify-between p-4 mb-4 text-gray-800 dark:text-gray-100'>
                                    <h3 className='text-xl font-bold'>Preview del Reporte</h3>
                                    <Button
                                        type='button'
                                        disabled={dataPreview.total === 0}
                                        icon={<ArrowDownToLine className='w-4 h-4' />}
                                        onClick={handleDownloadReport}
                                        isLoading={dLoading}
                                    >
                                        Descargar Reporte
                                    </Button>
                                </div>
                                <AnimatePresence>
                                    {dError && (
                                        <div>
                                            <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
                                                {dError}
                                            </div>
                                        </div>
                                    )}
                                </AnimatePresence>
                                <Suspense fallback={<LoadingSpinner />}>
                                    {strategy && (
                                        <TableReportPreview
                                            data={dataPreview}
                                            columns={strategy.getColumns()}
                                            getRowKey={strategy.getRowKey}
                                            searchFields={strategy.getSearchFields()}
                                        />
                                    )}
                                </Suspense>
                            </div>
                        </div>
                    </div>
                )}
            </div >
        </>
    )
}

export default Reports

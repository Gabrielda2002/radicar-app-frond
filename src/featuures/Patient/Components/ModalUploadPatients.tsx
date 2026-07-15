import Button from '@/components/common/Ui/Button'
import FormModal from '@/components/common/Ui/FormModal'
import Input from '@/components/common/Ui/Input'
import { useFormik } from 'formik'
import { CheckCircle, UploadIcon, XCircle } from 'lucide-react'
import { useState } from 'react'
import * as Yup from 'yup'
import { useStoreUploadPatients } from '../store/useStoreUploadPatients'
import { ColumnConfig, DataTable } from '@/components/common/ReusableTable'
import { Row } from '../types/UploadData'
import { toast } from 'react-toastify'
import SummaryCard from './SummaryCard'

const MAX_FILE_SIZE = 5 * 1024 * 1024

const CSV_MIME_TYPES: readonly string[] = [
  'text/csv',
  'application/vnd.ms-excel',
  'application/csv',
]

type StepType = 'upload' | 'confirm'

const validationSchema = Yup.object({
  file: Yup.mixed<File>()
    .required('El archivo es requerido')
    .test('fileFormat', 'El archivo debe ser un .CSV', (value) => {
      if (!value || !(value instanceof File)) {
        return true
      }

      return CSV_MIME_TYPES.includes(value.type)
    })
    .test('fileSize', `El archivo no debe superar los ${MAX_FILE_SIZE / 1024 / 1024}MB`, (value) => {
      if (!value || !(value instanceof File)) {
        return true
      }

      return value.size <= MAX_FILE_SIZE
    }),
})

const ModalUploadPatients = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [step, setStep] = useState<StepType>('upload')
  const { validationFile, confirmUpload, error, isLoading, previewData, resetPreview, uploadResult } = useStoreUploadPatients()

  const formik = useFormik({
    initialValues: { file: null as File | null },
    validationSchema,
    onSubmit: async (values) => {
      if (step === 'upload') {
        await validationFile(values, () => {
          setStep('confirm')
          toast.success('Validacion exitosa.')
        })
      } else {
        await confirmUpload(values, () => {
          toast.success('Cargue exitoso.')
          formik.resetForm()
        });
      }
    },
  })

  const handleClose = () => {
    setIsOpen(false)
    resetPreview()
    formik.resetForm()
    setStep('upload');
  }

  const showResults = Boolean(previewData)

  const canConfirm = previewData !== null && previewData.validRows === previewData.totalRows;

  const columns: ColumnConfig<Row>[] = [
    {
      key: 'row',
      header: '#',
      size: 'xs' as const,
      render: (item: Row) => item.row,
    },
    {
      key: 'numero_documento',
      header: 'Documento',
      size: 'md' as const,
      render: (item: Row) => item.data.numero_documento,
    },
    {
      key: 'nombre_completo',
      header: 'Nombre',
      size: 'md' as const,
      render: (item: Row) => item.data.nombre_completo,
    },
    {
      key: 'celular',
      header: 'Celular',
      size: 'sm' as const,
      render: (item: Row) => item.data.celular,
    },
    {
      key: 'celular_2',
      header: 'Celular 2',
      size: 'sm' as const,
      render: (item: Row) => item.data.celular_2,
    },
    {
      key: 'telefono_fijo',
      header: 'Teléfono Fijo',
      size: 'sm' as const,
      render: (item: Row) => item.data.telefono_fijo,
    },
    {
      key: 'email',
      header: 'Email',
      size: 'md' as const,
      render: (item: Row) => item.data.email,
    },
    {
      key: 'direccion',
      header: 'Dirección',
      size: 'md' as const,
      render: (item: Row) => item.data.direccion,
    },
    {
      key: 'convenio',
      header: 'Convenio',
      size: 'sm' as const,
      render: (item: Row) => item.data.convenio,
    },
    {
      key: 'ips_primaria',
      header: 'IPS',
      size: 'sm' as const,
      render: (item: Row) => item.data.ips_primaria,
    },
    {
      key: 'estado',
      header: 'Estado',
      size: 'xs' as const,
      render: (item: Row) => (item.valid ? <CheckCircle className='h-5 w-5 text-green-500' /> : <XCircle className='h-5 w-5 text-red-500' />),
    },
    {
      key: 'errores',
      header: 'Errores',
      size: 'lg' as const,
      render: (item: Row) => (
        <ul className='list-disc pl-5'>
          {item.errors.map((error, index) => (
            <li key={index} className='text-sm text-red-500 mb-2'>
              {error.message}
            </li>
          ))}
        </ul>
      ),
    }
  ]

  return (
    <>
      <Button onClick={() => setIsOpen(true)} icon={<UploadIcon className='h-4 w-4' />}>
        Cargar Pacientes
      </Button>

      <FormModal
        size='full'
        isOpen={isOpen}
        onClose={handleClose}
        title='Cargar Pacientes'
        onSubmit={formik.handleSubmit}
        submitText={step === 'upload' ? 'Validar' : 'Confirmar'}
        isValid={step === 'upload' ? formik.isValid && formik.dirty : canConfirm}
        isSubmitting={isLoading}
      >
        <div className='flex flex-col gap-4 p-4'>
          <Input
            label='Archivo'
            type='file'
            id='file'
            onChange={(event) => {
              const file = event.currentTarget.files ? event.currentTarget.files[0] : null
              formik.setFieldValue('file', file)
            }}
            onBlur={formik.handleBlur}
            name='file'
            accept='.csv'
            error={formik.touched.file && formik.errors.file ? formik.errors.file : undefined}
            touched={formik.touched.file}
          />

          {showResults && previewData && (
            <>
              <div className='mb-6 grid grid-cols-2 gap-3 md:grid-cols-5'>
                <SummaryCard label='Total' value={previewData.totalRows} variant='default' />
                <SummaryCard label='Válidas' value={previewData.validRows} variant='success' />
                <SummaryCard label='Inválidas' value={previewData.invalidRows} variant='error' />
                <SummaryCard label='Duplicadas' value={previewData.duplicateRows.length} variant='warning' />
                <SummaryCard label='Ya existen' value={previewData.alreadyExistsRows.length} variant='info' />
              </div>

              <DataTable
                data={previewData.rows}
                columns={columns}
                getRowKey={(row) => row.row.toString()}
                loading={isLoading}
                error={error}
              />

            </>
          )}
          {uploadResult && (
            <p className='dark:text-gray-50 text-gray-800 dark:bg-green-600 bg-green-500 p-2'>
              {uploadResult?.message}
            </p>
          )}
          {error && <p className='dark:text-gray-50 text-gray-800 dark:bg-red-500 p-2 bg-red-600'>{error}</p>}
        </div>
      </FormModal>
    </>
  )
}

export default ModalUploadPatients;
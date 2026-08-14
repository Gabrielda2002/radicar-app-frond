import { useFormik } from "formik";
import * as Yup from "yup";
import { Paperclip, Send, X } from "lucide-react";
import { toast } from "react-toastify";
import Button from "@/components/common/Ui/Button";
import Textarea from "@/components/common/Ui/Textarea";
import { useStoreComments } from "@/featuures/Pqrsdf/store/useStoreComments";

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 3 * 1024 * 1024;

const FILE_TYPE_ERROR =
  "Solo se permiten archivos PDF o imágenes (JPG, JPEG, PNG, WEBP).";
const FILE_SIZE_ERROR = "El archivo no puede superar 3 MB.";

interface CommentFormValues {
  comment: string;
  file: File | null;
}

const validationSchema = Yup.object({
  comment: Yup.string()
    .trim("El comentario no puede estar vacío")
    .required("El comentario es requerido"),
  file: Yup.mixed<File>()
    .nullable()
    .test(
      "fileType",
      FILE_TYPE_ERROR,
      (value) => !value || ALLOWED_MIME_TYPES.includes(value.type)
    )
    .test("fileSize", FILE_SIZE_ERROR, (value) => !value || value.size <= MAX_FILE_SIZE),
});

interface CommentFormProps {
  pqrsdfId: number;
  onCreated: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ pqrsdfId, onCreated }) => {
  const { createComment, isCreating } = useStoreComments();

  const formik = useFormik<CommentFormValues>({
    initialValues: { comment: "", file: null },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { resetForm }) => {
      const trimmed = values.comment.trim();
      if (!trimmed) return;

      await createComment(
        pqrsdfId,
        { comment: trimmed, file: values.file },
        () => {
          toast.success("Comentario agregado exitosamente");
          resetForm();
          onCreated();
        }
      );
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    e.target.value = "";

    if (!selected) {
      formik.setFieldValue("file", null);
      formik.setFieldError("file", undefined);
      formik.setFieldTouched("file", true);
      return;
    }

    if (!ALLOWED_MIME_TYPES.includes(selected.type)) {
      formik.setFieldValue("file", null);
      formik.setFieldError("file", FILE_TYPE_ERROR);
      formik.setFieldTouched("file", true);
      return;
    }

    if (selected.size > MAX_FILE_SIZE) {
      formik.setFieldValue("file", null);
      formik.setFieldError("file", FILE_SIZE_ERROR);
      formik.setFieldTouched("file", true);
      return;
    }

    formik.setFieldValue("file", selected);
    formik.setFieldError("file", undefined);
    formik.setFieldTouched("file", true);
  };

  const handleRemoveFile = () => {
    formik.setFieldValue("file", null);
    formik.setFieldError("file", undefined);
    formik.setFieldTouched("file", true);
  };

  const fileError =
    formik.touched.file && formik.errors.file ? formik.errors.file : undefined;

  return (
    <form onSubmit={formik.handleSubmit} className="w-full space-y-2">
      {formik.values.file && (
        <div className="flex items-center justify-between p-2 text-sm bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-700 dark:border-gray-600">
          <span className="flex items-center gap-2 min-w-0 truncate">
            <Paperclip className="w-4 h-4 shrink-0" />
            <span className="truncate">{formik.values.file.name}</span>
          </span>
          <button
            type="button"
            onClick={handleRemoveFile}
            aria-label="Quitar archivo adjunto"
            className="text-gray-500 hover:text-red-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {fileError && <p className="text-xs text-red-500">{fileError}</p>}

      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Textarea
            name="comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.comment}
            touched={formik.touched.comment}
            placeholder="Escribe un comentario..."
            autoResize
            minRows={1}
            maxRows={5}
            disabled={isCreating}
          />
        </div>
        <label
          htmlFor="pqrsdf-comment-file"
          className="flex items-center justify-center w-10 h-10 text-gray-500 border-2 border-gray-300 rounded-md cursor-pointer hover:text-blue-500 hover:border-blue-500 dark:text-gray-300 dark:border-gray-600"
          title="Adjuntar archivo"
          aria-label="Adjuntar archivo"
        >
          <Paperclip className="w-5 h-5" />
        </label>
        <input
          id="pqrsdf-comment-file"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          icon={<Send className="w-4 h-4" />}
          iconPosition="right"
          isLoading={isCreating}
          disabled={!formik.values.comment.trim() || isCreating}
        >
          Enviar
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;

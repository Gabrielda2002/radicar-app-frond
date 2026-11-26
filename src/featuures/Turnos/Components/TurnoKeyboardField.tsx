import { useId, useRef, type ComponentProps } from "react";
import { ChevronDown, Delete, Keyboard } from "lucide-react";
import Input from "@/components/common/Ui/Input";

interface TurnoKeyboardFieldProps extends ComponentProps<typeof Input> {
  keyboard: "numeric" | "text";
  label: string;
  value: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onValueChange: (value: string) => void;
}

const DIGITS = "123456789";
const LETTERS = "QWERTYUIOPASDFGHJKLÑZXCVBNMÁÉÍÓÚÜ";
const KEY_CLASS =
  "flex items-center justify-center min-h-11 rounded-lg border border-slate-300 bg-white px-1 text-sm font-semibold text-slate-800 hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus-visible:outline-teal-300";

const TurnoKeyboardField = ({
  keyboard,
  open,
  onOpenChange,
  onValueChange,
  value,
  label,
  readOnly,
  inputMode,
  maxLength,
  onFocus,
  ...inputProps
}: TurnoKeyboardFieldProps) => {
  const panelId = useId();
  const toggle = useRef<HTMLButtonElement>(null);
  const numeric = keyboard === "numeric";

  const close = () => {
    onOpenChange(false);
    toggle.current?.focus();
  };

  const append = (key: string) => {
    if (maxLength !== undefined && value.length >= maxLength) return;
    onValueChange(value + key);
  };

  return (
    <div
      onKeyDown={(event) => {
        if (event.key !== "Escape" || !open) return;
        event.stopPropagation();
        close();
      }}
    >
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <Input
            {...inputProps}
            label={label}
            value={value}
            readOnly={readOnly}
            inputMode={open ? "none" : inputMode}
            maxLength={maxLength}
            onFocus={(event) => {
              if (!open) onOpenChange(false);
              onFocus?.(event);
            }}
          />
        </div>
        {!readOnly ? (
          <button
            ref={toggle}
            type="button"
            className={`${KEY_CLASS} mt-6 min-w-12 gap-1 px-2`}
            aria-label={`${open ? "Cerrar" : "Abrir"} teclado para ${label.toLowerCase()}`}
            aria-expanded={open}
            aria-controls={open ? panelId : undefined}
            onClick={() => {
              if (open) return close();
              if (document.activeElement instanceof HTMLInputElement) {
                document.activeElement.blur();
              }
              toggle.current?.focus();
              onOpenChange(true);
            }}
          >
            <Keyboard className="h-5 w-5" aria-hidden="true" />
            <ChevronDown className={`h-4 w-4 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {open && !readOnly ? (
        <div id={panelId} role="group" aria-label={`Teclado para ${label.toLowerCase()}`} className="mt-2 space-y-2">
          <div className={`grid gap-1 ${numeric ? "grid-cols-3" : "grid-cols-5 sm:grid-cols-8"}`}>
            {(numeric ? DIGITS : LETTERS).split("").map((key) => (
              <button key={key} type="button" className={KEY_CLASS} onClick={() => append(key)}>
                {key}
              </button>
            ))}
            {numeric ? (
              <button type="button" className={`${KEY_CLASS} col-start-2`} onClick={() => append("0")}>0</button>
            ) : null}
            <button type="button" className={KEY_CLASS} aria-label={`Borrar ${numeric ? "último dígito" : "último carácter"}`} onClick={() => onValueChange(value.slice(0, -1))}>
              <Delete className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {!numeric ? (
              <button type="button" className={`${KEY_CLASS} flex-1 px-3`} onClick={() => append(" ")}>Espacio</button>
            ) : null}
            <button type="button" className={`${KEY_CLASS} ml-auto px-4`} onClick={close}>Listo</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TurnoKeyboardField;

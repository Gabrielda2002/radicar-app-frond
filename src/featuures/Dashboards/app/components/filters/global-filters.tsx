import { Filter, RefreshCw } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dash/components/ui/select';
import Button from '@/components/common/Ui/Button';

export interface FilterOption {
  value: string;
  label: string;
}

/** Ciudad (sede_grupo) con sus sedes fisicas (nombre_sede) anidadas. */
interface SedeJerarquiaOption {
  value: string;
  label: string;
  citas: number;
  sedes: Array<{ value: string; label: string; citas: number }>;
}

/** Grupo comercial (convenio_grupo) con sus convenios (nombre_convenio) anidados. */
interface ConvenioJerarquiaOption {
  value: string;
  label: string;
  citas: number;
  convenios: Array<{ value: string; label: string; citas: number }>;
}

interface GlobalFiltersProps {
  periodos: FilterOption[];
  sedeJerarquia: SedeJerarquiaOption[];
  convenios: FilterOption[];
  convenioJerarquia?: ConvenioJerarquiaOption[];
  modalidades: FilterOption[];
  regimenes: FilterOption[];
  especialidades: FilterOption[];
  selectedPeriodo: string;
  selectedSedeGrupo: string;
  selectedSede: string;
  selectedConvenio: string;
  selectedConvenioDetalle?: string;
  selectedModalidad: string;
  selectedRegimen: string;
  selectedEspecialidad: string;
  onPeriodoChange: (value: string) => void;
  /** Recibe la ciudad (sede_grupo) y la sede fisica (nombre_sede). '' = todas. */
  onSedeChange: (sedeGrupo: string, sede: string) => void;
  onConvenioChange: (convenio: string, convenioDetalle?: string) => void;
  onModalidadChange: (value: string) => void;
  onRegimenChange: (value: string) => void;
  onEspecialidadChange: (value: string) => void;
  onRefresh?: () => void;
  onOpenAdvanced?: () => void;
}

/**
 * GlobalFilters: barra de filtros transversal de los dashboards.
 * Dimensiones (single-select): Periodo, Sede (agrupada), Convenio, Modalidad,
 * Regimen. La sede usa el agrupador `sede_grupo` (nombres cortos).
 * Los valores se sincronizan con la URL en page-level.
 */
export function GlobalFilters({
  periodos,
  sedeJerarquia,
  convenios,
  convenioJerarquia,
  modalidades,
  regimenes,
  especialidades,
  selectedPeriodo,
  selectedSedeGrupo,
  selectedSede,
  selectedConvenio,
  selectedConvenioDetalle,
  selectedModalidad,
  selectedRegimen,
  selectedEspecialidad,
  onPeriodoChange,
  onSedeChange,
  onConvenioChange,
  onModalidadChange,
  onRegimenChange,
  onEspecialidadChange,
  onRefresh,
  onOpenAdvanced,
}: GlobalFiltersProps) {
  return (
    <section className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-outline-variant bg-card px-4 py-2 shadow-sm">
        <FilterItem
          label="Periodo"
          value={selectedPeriodo}
          onChange={onPeriodoChange}
          options={periodos}
          placeholder="Seleccione periodo"
        />
        <Divider />
        <SedeFilterItem
          jerarquia={sedeJerarquia}
          selectedSedeGrupo={selectedSedeGrupo}
          selectedSede={selectedSede}
          onChange={onSedeChange}
        />
        <Divider />
        {convenioJerarquia && convenioJerarquia.length > 0 ? (
          <ConvenioFilterItem
            jerarquia={convenioJerarquia}
            selectedConvenio={selectedConvenio}
            selectedConvenioDetalle={selectedConvenioDetalle ?? ''}
            onChange={(c, d) => onConvenioChange(c, d)}
          />
        ) : (
          <FilterItem
            label="Convenio"
            value={selectedConvenio}
            onChange={onConvenioChange}
            options={convenios}
            placeholder="Todos los convenios"
          />
        )}
        <FilterItem
          label="Modalidad"
          value={selectedModalidad}
          onChange={onModalidadChange}
          options={modalidades}
          placeholder="Todas"
        />
        <FilterItem
          label="Régimen"
          value={selectedRegimen}
          onChange={onRegimenChange}
          options={regimenes}
          placeholder="Todos"
        />
        <Divider />
        <FilterItem
          label="Especialidad"
          value={selectedEspecialidad}
          onChange={onEspecialidadChange}
          options={especialidades}
          placeholder="Todas"
        />
      </div>
      <div className="flex gap-2">
        {onOpenAdvanced && (
          <Button variant="outline" onClick={onOpenAdvanced} icon={<Filter className="h-4 w-4" />}>
            Filtros Avanzados
          </Button>
        )}
        {onRefresh && (
          <Button variant="primary" onClick={onRefresh} icon={<RefreshCw className="h-4 w-4" />}>
            Actualizar Datos
          </Button>
        )}
      </div>
    </section>
  );
}

function Divider() {
  return <div className="mx-2 h-8 w-px bg-outline-variant" />;
}

interface FilterItemProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  placeholder: string;
}

function FilterItem({ label, value, onChange, options, placeholder }: FilterItemProps) {
  return (
    <div className="flex flex-col">
      <span className="text-label-md text-on-surface-variant">{label}</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-auto p-0">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// Separador interno entre ciudad y sede en el value del select jerarquico.
const SEP = '\u0001';

// Quita el prefijo corporativo redundante de las sedes fisicas (el value
// original se conserva intacto; solo se limpia el texto mostrado).
const sedeLabel = (s: string) => s.replace(/^NORDVITAL IPS\s*-?\s*/i, '');

interface SedeFilterItemProps {
  jerarquia: SedeJerarquiaOption[];
  selectedSedeGrupo: string;
  selectedSede: string;
  onChange: (sedeGrupo: string, sede: string) => void;
}

/**
 * Filtro de Sede jerarquico (Ciudad -> Sede fisica). Una sola lista:
 *  - "Todas las sedes" limpia ambos filtros.
 *  - Cada ciudad es seleccionable (filtra la ciudad completa).
 *  - Las ciudades con varias sedes (Cucuta) muestran sus sedes fisicas
 *    indentadas debajo. Devuelve (sedeGrupo, sede) al page-level.
 */
function SedeFilterItem({ jerarquia, selectedSedeGrupo, selectedSede, onChange }: SedeFilterItemProps) {
  const value = selectedSede
    ? `s${SEP}${selectedSedeGrupo}${SEP}${selectedSede}`
    : selectedSedeGrupo
      ? `g${SEP}${selectedSedeGrupo}`
      : 'all';

  function handleChange(v: string) {
    if (v === 'all') return onChange('', '');
    const parts = v.split(SEP);
    if (parts[0] === 'g') return onChange(parts[1], '');
    if (parts[0] === 's') return onChange(parts[1], parts[2]);
  }

  return (
    <div className="flex flex-col">
      <span className="text-label-md text-on-surface-variant">Sede</span>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className="h-auto p-0">
          <SelectValue placeholder="Todas las sedes" />
        </SelectTrigger>
        <SelectContent className="max-h-88">
          <SelectItem value="all">Todas las sedes</SelectItem>
          {jerarquia.map((ciudad) => (
            <SelectGroup key={ciudad.value}>
              <SelectItem value={`g${SEP}${ciudad.value}`} className="font-semibold">
                {ciudad.label}
              </SelectItem>
              {ciudad.sedes.length > 1 &&
                ciudad.sedes.map((s) => (
                  <SelectItem key={s.value} value={`s${SEP}${ciudad.value}${SEP}${s.value}`} className="pl-12">
                    {sedeLabel(s.label)}
                  </SelectItem>
                ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface ConvenioFilterItemProps {
  jerarquia: ConvenioJerarquiaOption[];
  selectedConvenio: string;
  selectedConvenioDetalle: string;
  onChange: (convenio: string, convenioDetalle: string) => void;
}

/**
 * Filtro de Convenio jerarquico (Grupo comercial -> Convenio). Mismo patron
 * que SedeFilterItem: "Todos los convenios" limpia ambos; cada grupo es
 * seleccionable y los grupos con varios convenios muestran sus convenios
 * indentados. Devuelve (convenio_grupo, convenio) al page-level.
 */
function ConvenioFilterItem({
  jerarquia,
  selectedConvenio,
  selectedConvenioDetalle,
  onChange,
}: ConvenioFilterItemProps) {
  const value = selectedConvenioDetalle
    ? `d${SEP}${selectedConvenio}${SEP}${selectedConvenioDetalle}`
    : selectedConvenio && selectedConvenio !== 'all'
      ? `g${SEP}${selectedConvenio}`
      : 'all';

  function handleChange(v: string) {
    if (v === 'all') return onChange('', '');
    const parts = v.split(SEP);
    if (parts[0] === 'g') return onChange(parts[1], '');
    if (parts[0] === 'd') return onChange(parts[1], parts[2]);
  }

  return (
    <div className="flex flex-col">
      <span className="text-label-md text-on-surface-variant">Convenio</span>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className="h-auto p-0">
          <SelectValue placeholder="Todos los convenios" />
        </SelectTrigger>
        <SelectContent className="max-h-88">
          <SelectItem value="all">Todos los convenios</SelectItem>
          {jerarquia.map((grupo) => (
            <SelectGroup key={grupo.value}>
              <SelectItem value={`g${SEP}${grupo.value}`} className="font-semibold">
                {grupo.label}
              </SelectItem>
              {grupo.convenios.length > 1 &&
                grupo.convenios.map((cv) => (
                  <SelectItem key={cv.value} value={`d${SEP}${grupo.value}${SEP}${cv.value}`} className="pl-12">
                    {cv.label}
                  </SelectItem>
                ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

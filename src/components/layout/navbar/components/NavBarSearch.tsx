import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SIDEBAR_CONFIG } from "@/components/layout/sidebar/config/sidebarConfig";
import { useSidebarPermissions } from "@/components/layout/sidebar/hooks/useSidebarPermissions";
import type { MenuItem, SidebarSection } from "@/components/layout/sidebar/types/sidebar.types";
import { USER_CARD } from "@/featuures/Administrator/config/UserManagementCard";
import { HELP_DESK_CARDS } from "@/featuures/HelpDesk/config/HelpDeskCards";
import { flatTableMap } from "@/featuures/Configuration/config/tableRegistry";

interface SearchAction {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  roles?: number[];
  onSelect: () => void;
}

interface SearchOption {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  path?: string;
  roles?: number[];
  onSelect?: () => void;
}

interface NavBarSearchProps {
  actions: SearchAction[];
}

const ROUTE_KEYWORDS: Record<string, string[]> = {
  "/tabla-radicacion": ["radicado", "radicados", "radicacion", "servicios", "pacientes"],
  "/carta-recobro": ["recobro", "solicitar recobro"],
  "/tabla-auditoria": ["auditar", "auditoria de servicios"],
};

const normalizeText = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();

const collectOptions = (sections: SidebarSection[]): SearchOption[] => {
  const options: SearchOption[] = [];
  const visit = (items: MenuItem[], parents: string[] = []) => {
    items.forEach((item) => {
      const hierarchy = [...parents, item.title];
      if (item.path) {
        options.push({
          id: item.id,
          title: item.title,
          description: hierarchy.slice(0, -1).join(" · ") || "Módulo",
          keywords: [...hierarchy, ...(ROUTE_KEYWORDS[item.path] ?? [])],
          path: item.path,
        });
      }
      if (item.children) visit(item.children, hierarchy);
    });
  };
  sections.forEach((section) => visit(section.items, section.title ? [section.title] : []));
  return options;
};

const NavBarSearch = ({ actions }: NavBarSearchProps) => {
  const navigate = useNavigate();
  const { filterSectionsByPermissions, hasPermission } = useSidebarPermissions();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const options = useMemo(() => {
    const visibleSections = filterSectionsByPermissions(SIDEBAR_CONFIG);
    const sidebarOptions = collectOptions(visibleSections);
    const cardOptions = [...USER_CARD, ...HELP_DESK_CARDS]
      .filter((item): item is typeof item & { path: string } => hasPermission(item.roles) && Boolean(item.path))
      .map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        keywords: [item.title, item.description],
        path: item.path.toLowerCase(),
      }));
    const uniqueCardOptions = cardOptions.filter((item) =>
      !sidebarOptions.some((option) => option.path === item.path),
    );
    const configurationOptions = Object.values(flatTableMap)
      .filter((table) => hasPermission(table.rols))
      .map((table) => ({
        id: `configuration-${table.id}`,
        title: table.label,
        description: `Configuración · ${table.moduleLabel} · ${table.description}`,
        keywords: [table.label, table.moduleLabel, table.description, "configuración", "tabla"],
        path: `/configuration?tabla=${table.id}`,
      }));
    const visibleActions = actions
      .filter((action) => hasPermission(action.roles))
      .map((action) => ({
        id: action.id,
        title: action.title,
        description: action.description,
        keywords: action.keywords,
        onSelect: action.onSelect,
      }));
    return [...sidebarOptions, ...uniqueCardOptions, ...configurationOptions, ...visibleActions];
  }, [actions, filterSectionsByPermissions, hasPermission]);

  const results = useMemo(() => {
    const normalizedQuery = normalizeText(query.trim());
    const terms = normalizedQuery.split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return options
      .map((option) => {
        const searchable = normalizeText([option.title, option.description, ...option.keywords].join(" "));
        const matchedTerms = terms.reduce((total, term) => total + (searchable.includes(term) ? 1 : 0), 0);
        const normalizedTitle = normalizeText(option.title);
        const titleScore = normalizedTitle === normalizedQuery ? 2 : normalizedTitle.startsWith(normalizedQuery) ? 1 : 0;
        return { option, matchedTerms, score: matchedTerms + titleScore };
      })
      .filter(({ matchedTerms }) => matchedTerms === terms.length)
      .sort((a, b) => b.score - a.score || a.option.title.localeCompare(b.option.title, "es"))
      .slice(0, 7)
      .map(({ option }) => option);
  }, [options, query]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectOption = (option: SearchOption) => {
    setQuery("");
    setActiveIndex(0);
    setIsOpen(false);
    if (option.onSelect) option.onSelect();
    else if (option.path) navigate(option.path);
    requestAnimationFrame(() => {
      document.getElementById("main-content")?.scrollTo({ top: 0, left: 0, behavior: "instant" });
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
    if (event.key === "ArrowDown" && results.length) {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    }
    if (event.key === "ArrowUp" && results.length) {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + results.length) % results.length);
    }
    if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      selectOption(results[activeIndex]);
    }
  };

  return (
    <div className="relative mx-2 min-w-0 flex-1 md:mx-auto md:max-w-xl" ref={containerRef}>
      <form
        className="flex h-10 overflow-hidden rounded-full border border-gray-300 bg-gray-50 transition focus-within:border-[#008d93] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#008d93]/15 dark:border-gray-700 dark:bg-gray-800 dark:focus-within:bg-gray-900"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          if (results[activeIndex]) selectOption(results[activeIndex]);
        }}
      >
        <Search className="my-auto ml-3 h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar módulos y acciones"
          aria-label="Buscar módulos y acciones"
          aria-expanded={isOpen && Boolean(query.trim())}
          aria-controls="navbar-search-results"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent px-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-gray-100"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(""); setActiveIndex(0); inputRef.current?.focus(); }}
            className="mr-2 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-100"
            aria-label="Limpiar búsqueda"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {isOpen && query.trim() && (
        <div
          id="navbar-search-results"
          className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-2xl border border-gray-200 bg-white py-2 shadow-[0_16px_45px_rgba(15,40,45,0.18)] dark:border-gray-700 dark:bg-gray-900"
          role="listbox"
          aria-label="Resultados de búsqueda"
        >
          {results.length ? results.map((option, index) => (
            <button
              key={option.id}
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => selectOption(option)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${index === activeIndex ? "bg-[#effbfb] dark:bg-gray-800" : "hover:bg-gray-50 dark:hover:bg-gray-800"}`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#effbfb] text-[#008d93] dark:bg-teal-950 dark:text-teal-300">
                <Search className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-gray-800 dark:text-gray-100">{option.title}</span>
                <span className="block truncate text-xs text-gray-500 dark:text-gray-400">{option.description}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
            </button>
          )) : (
            <p className="px-4 py-5 text-center text-sm text-gray-500 dark:text-gray-400">No hay opciones que coincidan con “{query}”.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBarSearch;
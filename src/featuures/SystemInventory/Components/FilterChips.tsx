interface FilterChipsProps {
  selectedFilters: string[];
  onRemoveFilter: (filter: string) => void;
  maxWidth?: string;
}

const FilterChips: React.FC<FilterChipsProps> = ({
  selectedFilters,
  onRemoveFilter,
  maxWidth = "max-w-40",
}) => {
  if (selectedFilters.length === 0) return null;

  return (
    <>
      <div className="flex flex-wrap gap-1 mt-2">
        {selectedFilters.map((a) => (
          <span
            key={a}
            className={`flex items-center px-2 py-1 ${maxWidth} text-sm text-pretty bg-gray-200 rounded-full dark:bg-gray-900 dark:text-white hover:bg-gray-700 hover:text-white  dark:hover:bg-gray-500 transition-colors duration-300 overflow-hidden text-ellipsis whitespace-pre-line`}
            title={a} // Tooltip to show full text on hover
          >
            {a}
            <button
              type="button"
              className="ml-1 text-black dark:text-white hover:text-red-300"
              onClick={() => onRemoveFilter(a)}
              title="Eliminar filtro"
            >
              <span className="flex items-center">&times;</span>
            </button>
          </span>
        ))}
      </div>
    </>
  );
};

export default FilterChips;

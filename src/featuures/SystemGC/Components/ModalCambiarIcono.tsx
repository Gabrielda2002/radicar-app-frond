import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";

import Button from "@/components/common/Ui/Button";
import FormModal from "@/components/common/Ui/FormModal";
import Input from "@/components/common/Ui/Input";

import { ICON_CATALOG, ICON_GROUPS, IconGroupId } from "../constants/iconCatalog";
import useFileManagerStore from "../Store/useFileManagerStore";
import { ModalCambiarIconoProps } from "../Types/IFileManager";
import IconPreview from "./IconPreview";



const ModalCambiarIcono: React.FC<ModalCambiarIconoProps> = ({
  standOpen,
  toggleModal,
  itemId,
  folderName,
  currentIcon,
}) => {
  const { updateFolderIcon, error, isLoading } = useFileManagerStore();

  const [selectedIcon, setSelectedIcon] = useState<string | null>(currentIcon);
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<"all" | IconGroupId>("all");

  const filteredIcons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return ICON_CATALOG.filter((entry) => {
      if (activeGroup !== "all" && entry.group !== activeGroup) return false;
      if (!query) return true;
      return (
        entry.label.toLowerCase().includes(query) ||
        entry.id.toLowerCase().includes(query)
      );
    });
  }, [activeGroup, search]);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    await updateFolderIcon(
      itemId,
      selectedIcon,
      () => {
        toast.success("Icono actualizado con éxito!");
        toggleModal();
      },
    );
  };

  const hasChanges = selectedIcon !== currentIcon;
  const showRemoveButton = currentIcon !== null;
  const selectedLabel = selectedIcon
    ? ICON_CATALOG.find((e) => e.id === selectedIcon)?.label
    : null;

  return (
    <FormModal
      isOpen={standOpen}
      onClose={toggleModal}
      title={`Cambiar icono de "${folderName}"`}
      onSubmit={handleSubmit}
      isSubmitting={isLoading}
      isValid={hasChanges}
      submitText="Guardar"
      cancelText="Cancelar"
      size="xl"
    >
      <div className="space-y-4 p-4">
        <div className="flex items-center gap-4 p-3 rounded-md bg-gray-50 dark:bg-gray-700/40">
          <div className="flex items-center justify-center w-16 h-16 border-2 border-gray-200 rounded-md dark:border-gray-600 bg-white dark:bg-gray-800">
            <IconPreview iconId={selectedIcon} className="w-10 h-10 text-gray-700 dark:text-gray-200" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Vista previa
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {selectedLabel ?? "Sin icono personalizado (se usará el icono por defecto)"}
            </p>
          </div>
          {showRemoveButton && (
          <div className="flex justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setSelectedIcon(null)}
              size="sm"
            >
              Quitar icono personalizado
            </Button>
          </div>
        )}
        </div>

        <Input
          type="text"
          placeholder="Buscar icono por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<MagnifyingGlassIcon className="w-5 h-5" />}
          iconPosition="left"
        />

        <div className="flex flex-wrap gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => setActiveGroup("all")}
            className={clsx(
              "px-3 py-1.5 text-sm rounded-md transition-colors font-medium",
              activeGroup === "all"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600",
            )}
          >
            Todos
          </button>
          {ICON_GROUPS.map((group) => (
            <button
              key={group.id}
              type="button"
              onClick={() => setActiveGroup(group.id)}
              className={clsx(
                "px-3 py-1.5 text-sm rounded-md transition-colors font-medium",
                activeGroup === group.id
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600",
              )}
            >
              {group.label}
            </button>
          ))}
        </div>

        <div className="max-h-80 overflow-y-auto p-2 border border-gray-200 dark:border-gray-700 rounded-md">
          {filteredIcons.length === 0 ? (
            <div className="flex items-center justify-center p-8 text-gray-500 dark:text-gray-400">
              <p className="text-sm">No se encontraron iconos</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
              {filteredIcons.map((entry) => {
                const isSelected = selectedIcon === entry.id;
                const Icon = entry.Component;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setSelectedIcon(entry.id)}
                    className={clsx(
                      "flex flex-col items-center justify-center p-2 rounded-md border-2 transition-all aspect-square",
                      isSelected
                        ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-400"
                        : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-700",
                    )}
                    title={`${entry.label} (${entry.id})`}
                    aria-label={entry.label}
                    aria-pressed={isSelected}
                  >
                    <Icon className="w-7 h-7 text-gray-700 dark:text-gray-200" />
                    <span className="mt-1 text-[10px] text-center text-gray-600 dark:text-gray-400 truncate w-full px-1">
                      {entry.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <AnimatePresence>
          {error && (
            <div className="p-3 text-sm text-white bg-red-500 rounded-md">
              {error}
            </div>
          )}
        </AnimatePresence>
      </div>
    </FormModal>
  );
};

export default ModalCambiarIcono;

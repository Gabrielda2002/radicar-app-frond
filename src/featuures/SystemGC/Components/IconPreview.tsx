import React from "react";
import { ICON_CATALOG } from "../constants/iconCatalog";

type IconPreviewProps = {
    iconId:  string | null;
    className: string;
}

const IconPreview: React.FC<IconPreviewProps> = ({
  iconId,
  className,
}) => {
  const entry = ICON_CATALOG.find((e) => e.id === iconId);
  if (!entry) {
    return (
      <span className="text-xs text-gray-400 dark:text-gray-500 p-2">
        Por defectoz
      </span>
    );
  }
  return React.createElement(entry.Component, { className });
};

export default IconPreview;
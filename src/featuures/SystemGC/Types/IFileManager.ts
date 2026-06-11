export interface FileItem {   
  id: string;
  name: string;
  size: number;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
  path: string;
}

export interface Folder {
  id: string | number;
  name: string;
  path: string;
  parentId: string | number | null;
  idDepartment: string | number;
  icon?: string | null;
  createdAt: string;
  updatedAt: string;
  departmentRelation: {
    id: number;
    name: string;
    code: string | null;
    createdAt: string;
    updatedAt: string;
  }
}

export interface FolderContents {
  files: FileItem[];
  folders: Folder[];
}

export interface FolderListProps {
  folders: Folder[];
  onFolderClick: (folderId: string, folderName: string) => void;
  onDelete: (id: string, type: "carpetas" | "archivo") => void;
  renameItem: (
    id: string,
    newName: string,
    type: "carpetas" | "archivo"
  ) => void;
  isInFolder: boolean;
  section: string;
  currentFolderId: string;
  handleRefresh: () => void;
}

export interface FileListProps {
  files: FileItem[];
  onDelete: (id: string, type: "carpetas" | "archivo") => void;
  onDownload: (id: string, fileName: string) => void;
  renameItem: (
    id: string,
    newName: string,
    type: "carpetas" | "archivo"
  ) => void;
  currentFolderId: string;
  section: string;
  handleRefresh?: () => void;
}

export interface ItemManuProps {
  onDelete: () => void;
  renameItem: (newName: string) => void;
  itemName: string;
  itemType: "carpetas" | "archivos";
  currentFolderId: string;
  section: string;
  itemId: string;
  handleRefresh: () => void;
  nameItemOld: string;
  currentIcon?: string | null;
}


export interface ModalCrearCarpetaProps  {
  standOpen: boolean;
  toggleModal: () => void;
};

export interface ModalMoveItemsProps {
  isOpen: boolean;
  onClose: () => void;
  section: string;
  currentFolderId: string | null;
  itemNameToMove: string;
  itemType: "carpetas" | "archivo";
  itemId: string;
}

export interface ModalRenombrarItemProps {
  standOpen: boolean;
  toggleModal: () => void;
  nameItemOld: string;
  itemId: string;
  typeItem: "carpetas" | "archivo";
};

export interface ModalCambiarIconoProps {
  standOpen: boolean;
  toggleModal: () => void;
  itemId: string;
  folderName: string;
  currentIcon: string | null;
};

export interface FileUploaderProps {
  stadopen: boolean;
  toggleModal: () => void;
}

export interface DropDownManuProps {
  currentFolderId: string;
  uploadNewFile: (formData: FormData, id: string | number) => Promise<void>;
  createNewFolder: (name: string) => void;
  isInFolder: boolean;
}

export interface breadcrumbProps {
  path: { id: string; name: string }[];
  onNavigate: (id: string) => void;
}
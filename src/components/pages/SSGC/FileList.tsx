import React from "react";

interface File {
    id: string;
    name: string;
    size: number;
}

interface FileListProps {
    files: File[];
    onDelete: (id: string, type: "carpetas" | "archivo") => void;
    onDownload: (id: string, fileName: string) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onDelete, onDownload }) => {
    return (
        <div>
            {files.map((file) => (
                <div key={file.id}>
                    <span>{file.name} ({(file.size / 1024).toFixed(2)} KB)</span>
                    <button onClick={() => onDownload(file.id, file.name)}>Descargar</button>
                    <button onClick={() => onDelete(file.id, "archivo")}>Eliminar</button>
                </div>
            ))}
        </div>
    );
};

export default FileList;

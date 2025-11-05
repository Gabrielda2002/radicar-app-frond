export const CheckFilesFormat = (file: unknown): boolean => {
    if (!file) return false;
    
    // Type guard para verificar que es un File
    if (!(file instanceof File)) return false;

    const validFormats = ['application/pdf'];

    return validFormats.includes(file.type);
}

export const CheckFilesSize = (file: unknown): boolean => {
    if (!file) return false;
    
    // Type guard para verificar que es un File
    if (!(file instanceof File)) return false;

    const size = file.size / 1024 / 1024; // size in MB
    return size <= 5; // 5 MB
}
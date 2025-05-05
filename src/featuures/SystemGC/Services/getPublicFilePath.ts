export const getPublicFilePath = (filePath: string) => {
  const idx = filePath.indexOf("/uploads/");

  if (idx !== -1) {
    return filePath.substring(idx);
  }

  //soporte para backslash
  const idxWin = filePath.indexOf("\\uploads\\");
  if (idxWin !== -1) {
    return filePath.substring(idxWin).replace(/\\/g, "/");
  }

  return filePath;
};

export const isValidImage = function (img) {
  const fileSize = img.size / 1024 / 1024;

  const fileType = img.type;

  if (fileSize <= 10) {
    if (
      fileType === "image/jpeg" ||
      fileType === "image/png" ||
      fileType === "image/jpg"
    )
      return true;
  }
  return false;
};

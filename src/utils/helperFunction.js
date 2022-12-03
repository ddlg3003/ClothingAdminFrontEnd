export const isValidImage = (img) => {
    const fileSize = img.files[0].size / 1024 / 1024;

    const fileType = img.files[0].type;

    return fileSize <= 10 && fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg';
}
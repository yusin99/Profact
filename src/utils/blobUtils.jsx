/**
 * Converts a base64 string to a Blob.
 * @param {string} base64 - The base64 string.
 * @param {string} mime - The MIME type.
 * @returns {Blob} - The resulting Blob.
 */
export const base64ToBlob = (base64, mime) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
  
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
  
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mime });
};
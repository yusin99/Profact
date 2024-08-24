/* eslint-disable no-unused-vars */

import { base64ToBlob } from "./blobUtils";

/**
 * The function `hasEmptyFields` checks if any fields in a form data object are empty.
 * @returns The function `hasEmptyFields` returns `true` if any value in the `formData` object is empty
 * (after trimming whitespace), otherwise it returns `false`.
 */
export const hasEmptyFields = (formData) => {
    for (let [key, value] of formData.entries()) {
      if (!value.trim()) {
        return true;
      }
    }
    return false;
  };



  /**
   * Converts an object with base64 strings to FormData.
   * @param {Object} data - The data object.
   * @returns {FormData} - The FormData object.
   */
  export const objectToFormData = (data) => {
    const formData = new FormData();
  
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string' && value.startsWith('data:image/')) {
        const [header, base64String] = value.split(',');
        const mimeType = header.match(/:(.*?);/)[1];
        const extension = mimeType.split('/')[1];
        const blob = base64ToBlob(base64String, mimeType);
        formData.append(key, blob, `${key}.${extension}`);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    }
  
    return formData;
  };
/* eslint-disable no-unused-vars */
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
  
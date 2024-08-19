export const hasEmptyFields = (formData) => {
    for (let [key, value] of formData.entries()) {
      if (!value.trim()) {
        return true;
      }
    }
    return false;
  };
  
import { openDB } from 'idb';

/**
 * The function `updateFormDataWithCheckoutInfo` updates the checkout information in stored form data
 * using IndexedDB in a JavaScript React application.
 * @returns The function `updateFormDataWithCheckoutInfo` returns the updated `storedData` object after
 * adding the checkout information for the customer. If there is no stored data found, it throws an
 * error.
 */
export const updateFormDataWithCheckoutInfo = async (sessionData) => {
  const db = await openDB('formDataDB', 1);
  let storedData = await db.get('formDataStore', 'formData');


  if (storedData) {
    storedData.data.checkout = {
      "sessionId": sessionData.id,
    };

    await db.put('formDataStore', storedData, 'formData');

    return storedData;
  }
  throw new Error('No stored data found');
};

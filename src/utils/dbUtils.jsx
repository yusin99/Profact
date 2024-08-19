import { openDB } from 'idb';

export const updateFormDataWithCheckoutInfo = async (sessionData) => {
  const db = await openDB('formDataDB', 1);
  let storedData = await db.get('formDataStore', 'formData');

  if (storedData) {
    storedData.checkout = {
      customer: sessionData.customer,
    };

    await db.put('formDataStore', storedData, 'formData');
    console.log("Updated formData saved to IndexedDB:", storedData);

    return storedData;
  }
  throw new Error('No stored data found');
};
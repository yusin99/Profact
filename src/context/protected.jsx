/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
/**
 * The `ProtectedRoute` function checks if a checkout process is in progress and renders the provided
 * element or navigates to the home page accordingly.
 * @returns The `ProtectedRoute` component returns the `element` if there is a checkout in progress
 * (based on the value retrieved from `sessionStorage.getItem('checkoutInProgress')`), otherwise it
 * returns a `<Navigate to="/" />` component.
 */

const ProtectedRoute = ({ element }) => {
  const checkoutInProgress = sessionStorage.getItem('checkoutInProgress');

  return checkoutInProgress ? element : <Navigate to="/" />;
};

export default ProtectedRoute;

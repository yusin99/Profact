/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const checkoutInProgress = sessionStorage.getItem('checkoutInProgress');

  return checkoutInProgress ? element : <Navigate to="/" />;
};

export default ProtectedRoute;

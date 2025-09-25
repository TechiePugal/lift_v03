

import NotFoundPage from "../../../pages/notfound";


const PrivateRouteCustomers = ({ children,currentUser, ...rest }) => {

    

  const isOwner = () => {
    // Access user data (e.g., from Redux store) to determine if Pro user
   
    return currentUser.role?.startsWith("Admin"); // Adjust based on your Pro user identifier
  };
  
  return isOwner() ? (
    children // Render component if user is Pro
  ) : (
    // <Navigate to="/login" state={{ from: location }} replace /> // Redirect to login
    <NotFoundPage />
  );
};

export default PrivateRouteCustomers;
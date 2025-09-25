import { useCallback, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../../api/auth/user";
import {
  cleanupUserSettings,
  userSettings,
} from "../../../store/slice/auth-slice";
import FullScreeeSpinner from "../../common/loading/FullScreee";
import { getHospitalInfo } from "../../../api/settings/Settings";
import { setHospitalData } from "../../../store/slice/hospital-info-slice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const token = localStorage.getItem("token");
  const navigation = useNavigate();

  const redirect = useCallback(() => {
    navigation("/login");
  }, []);

  /** Get Hospital Info */
  const getHospitalInfoData = (companyId) => {
    /** pass company id */
    if (companyId)
      getHospitalInfo(companyId)
        .then((response) => {
          dispatch(setHospitalData(response?.data?.data));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
  };

  // /me api call
  const checkAuthentication = async () => {
    if (token && !currentUser.loggedIn) {
      getUserProfile()
        .then((response) => {
          const userInfo = {
            ...response.data,
            // token: response.data.user_token,
            token: token,
          };
          dispatch(userSettings(userInfo));
          getHospitalInfoData(userInfo?.company_id);
        })
        .catch((error) => {
          dispatch(cleanupUserSettings());
          redirect();
          console.log("error");
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (currentUser.loggedIn) {
      getHospitalInfoData(currentUser?.companyId);
      setLoading(false);
    } else {
      redirect();
    }
    if (token && currentUser.loggedIn) {
    }
  };
  useEffect(() => {
    checkAuthentication();
  }, []);

  if (loading) {
    // Loading state while checking authentication
    return <FullScreeeSpinner />;
  } else if (!currentUser.loggedIn) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render protected content
  return children;
};

export default ProtectedRoute;

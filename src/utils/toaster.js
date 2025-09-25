import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showSuccessToast = (message, customToastId) => {
  if (!toast.isActive(customToastId)) {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: customToastId,
    });
  }
};

/** Only pass the full error, the condition will check and show the proper error */
/** For error the customToastId is "error" */
/** We can add customError for custom errors  eg: showErrorToast({customError:"Custom Error"}); */

export const showErrorToast = (error, customToastId, top) => {
  console.log({ error }, "error log");
  if (!toast.isActive(customToastId)) {
    toast.error(getErrorMessage(error), {
      position: top ? toast.POSITION.TOP_RIGHT : toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: customToastId,
    });
  }
};

const getErrorMessage = (error) => {
  if (error?.response?.data?.errorCode) {
    // Check for specific error codes and return corresponding messages
    switch (error.response.data.errorCode) {
      case "INVALID_INPUT":
        return "Invalid input. Please check your input data.";
      case "AUTHENTICATION_FAILED":
        return "Authentication failed. Please log in again.";
      case "UNAUTHORIZED":
        return "Unauthorized access. Please log in.";
      case "TOKEN_EXPIRED":
        return "Your session has expired. Please log in again.";
      // Add more error codes and messages as needed
      default:
        return "Something went wrong.";
    }
  } else if (error?.response?.data?.error) {
    // If there's a general error message in the response, use it
    return error?.response?.data?.error;
  } else if (error?.customError) {
    // If there's a general error message in the response, use it
    return error?.customError;
  } else {
    // Fallback to a common error message for unexpected errors
    return "Something went wrong.";
  }
};

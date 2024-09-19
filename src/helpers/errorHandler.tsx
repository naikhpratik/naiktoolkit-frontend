import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    var err = error.response;
    if (Array.isArray(err?.data.errors)) {
      for (let val of err?.data.errors) {
        toast.warning(val.description);
      }
    } else if (typeof err?.data.errors === "object") {
      for (let e in err?.data.errors) {
        toast.warning(err.data.errors[e][0]);
      }
    } else if (err?.data) {
      toast.warning(err.data);
    } else if (err?.status == 401) {
      toast.warning("Please login");
      window.history.pushState({}, "LoginPage", "/login");
    } else if (err) {
      toast.warning(err?.data);
    }
  }
};

// Add this function to handle custom error messages
export const getErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'INVALID_CREDENTIALS':
      return 'Invalid email or password';
    case 'USER_NOT_FOUND':
      return 'User not found';
    case 'ACCOUNT_LOCKED':
      return 'Account is locked. Please contact support';
    case 'USER_EXISTS':
      return 'User Already Exist. Please Try to Login or Use Different Email.';
    // Add more cases as needed
    default:
      return 'An unexpected error occurred';
  }
};
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userEmailSlice";
import { setHcpValidation } from "../../store/getValidatedUserSlice";

const StorageListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStorageChange = () => {
      dispatch(setUser({
        opUserEmail: localStorage.getItem('opuseremail'),
        userName: localStorage.getItem('opuser'),
        userProfession: localStorage.getItem('opprofession'),
        userID: localStorage.getItem("userID"),
      }));

      // Sync HCP validation state
      const storedHcpValidation = localStorage.getItem("IsGetHcpValidationEnabled");
      dispatch(setHcpValidation(storedHcpValidation === "1"));
    };

    // Listen for changes in localStorage (cross-tab updates)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  return null; // This component does not render anything
};

export default StorageListener;

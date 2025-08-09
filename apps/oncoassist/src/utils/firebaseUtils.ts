
import { analytics } from "../config/firebaseConfig";
import { logEvent } from "firebase/analytics";
import { config } from "@oncoassist/shared/constants";

export const logFirebaseEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
    if (!analytics) {
      console.error("Firebase Analytics is not initialized.");
      return;
    }
  

    try {
      
      localStorage.setItem('debug', `${config.firebaseDebugMode}`);
      logEvent(analytics, eventName, eventParams);
     
    } catch (error) {
      console.error(" Error Logging Firebase Event:", error);
    }
  };
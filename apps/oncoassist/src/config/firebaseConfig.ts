import { initializeApp } from "firebase/app";
import { getAnalytics,isSupported,setAnalyticsCollectionEnabled  } from "firebase/analytics";
import { config } from "@oncoassist/shared/constants";

const firebaseConfig = {
  apiKey: `${config.firebaseApiKey}`,
  authDomain: `${config.firebaseAuthDomain}`,
  projectId: `${config.firebaseProjectId}`,
  storageBucket: `${config.firebaseStorageBucket}`,
  messagingSenderId: `${config.firebaseMessagingSenderId}`,
  appId: `${config.firebaseAppId}`,
  measurementId:`${config.firebaseMeasurementId}`
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


(window as any).gtag?.("config", `${config.firebaseMeasurementId}`, { debug_mode: true });

export { analytics };
export default app;

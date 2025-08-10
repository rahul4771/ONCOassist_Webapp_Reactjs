import './app.module.scss';
import { Provider,useSelector } from "react-redux";
import { store } from "../store/store";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { IntercomProvider } from "react-use-intercom";
import { Footer } from '@oncoassist/shared/ui';
import styles from './app.module.scss';

import { Layout } from '../containers';
import { Dashboard, Formula, Signin, Favorites, PrognosticScore, 
        AdjuvantTool, AjccTnmStaging, ToxicityGrading, NccnProtocol, 
        DrugInfo, DrugInteractionChecker, AbcTool, OncoVideos, IoToxicityTool, 
        AboutUs,Profile,FeedBack,
        HcpValidation,
        ProductServices,McrpcProstateCancer
      } from '../pages';
import { i18n, LanguageSwitcher } from "@oncoassist/localization";
import { I18nextProvider } from "react-i18next";
import { UserState} from "../store/userEmailSlice";
import StorageListener from '../components/StorageListener/storageListener';
import { config } from '@oncoassist/shared/constants';
import MobileRedirect from "../components/MobileRedirect/mobileRedirect";
import { useEffect, useState } from 'react';

const INTERCOM_APP_ID = config.intercomAppId;

function AppContent() {
   const opuseremail = useSelector((state: { userEmail: UserState }) => state.userEmail.opUserEmail);
   const [showPopup, setShowPopup] = useState(false);

   const isMobileDevice = (): boolean => {
    if (typeof navigator !== "undefined") {
      return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }
    return false;
  };
  
  useEffect(() => {
    const hidePopup = localStorage.getItem("hideMobilePopup");
    console.log("Checking mobile device and localStorage:", isMobileDevice(), hidePopup);
    if (isMobileDevice() && hidePopup !== "true") {
      setShowPopup(true);
    }
  }, []);
  
  return (
    <I18nextProvider i18n={i18n}> 
    <IntercomProvider appId={INTERCOM_APP_ID}>  
        <Router>
          <div className={styles.appContainer}>
          {/* <LanguageSwitcher /> */}
            <StorageListener />
            <Layout />
            <div className={`${styles.contentContainer} ${
                    opuseremail ? styles.contentContainerFullHeight : styles.contentContainerReducedHeight
                }`}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/home" element={<Dashboard />} />
                <Route path="/landing" element={<Dashboard />} />
                <Route path="/formula" element={<Formula />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signin />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/prognostic_score" element={<PrognosticScore />} />
                <Route path="/adjuvant_tool" element={<AdjuvantTool />} />
                <Route path="/ajcc_tnm_staging" element={<AjccTnmStaging />} />
                <Route path="/toxicity_grading" element={<ToxicityGrading />} />
                <Route path="/nccn_protocol" element={<NccnProtocol />} />
                <Route path="/drug_info" element={<DrugInfo />} />
                <Route path="/drug_interaction_checker" element={<DrugInteractionChecker />} />
                <Route path="/abc_tool" element={<AbcTool />} />
                <Route path="/oncovideos" element={<OncoVideos />} />
                <Route path="/io_toxicity" element={<IoToxicityTool />} />
                <Route path="/about_oncoassist" element={<AboutUs />} />
                <Route path="/feedback" element={<FeedBack />} />
                <Route path="/hcpvalidation" element={<HcpValidation />} />
                <Route path="/productservices" element={<ProductServices />} />
                <Route path="/mcrpc_prostate" element={<McrpcProstateCancer />} />
              </Routes>
            </div>
            {(!opuseremail || opuseremail === 'null') && <Footer />}
          </div>
          {showPopup && <MobileRedirect onClose={() => setShowPopup(false)} />}
        </Router>    
        </IntercomProvider>   
    </I18nextProvider>
  );
}

function App() {
  return (
    <Provider store={store}> 
      <AppContent />
    </Provider>
  );
}
export default App;

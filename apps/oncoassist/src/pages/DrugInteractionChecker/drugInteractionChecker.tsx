import React from 'react';
import { useLocation, Navigate} from 'react-router-dom';
import IframeLoader from '../../components/IframeLoader/iFrameLoader';
import { config } from "@oncoassist/shared/constants";

export function DrugInteractionChecker() {
  const location = useLocation();
  const iframeSrc = location.state?.iframeSrc ? `${config.webappURL}${location.state.iframeSrc}` : '';
  
  // Redirect to Dashboard if iframeSrc is missing,on copy paste url
  if (!iframeSrc) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <IframeLoader iframeSrc={iframeSrc} />;
}

export default DrugInteractionChecker;

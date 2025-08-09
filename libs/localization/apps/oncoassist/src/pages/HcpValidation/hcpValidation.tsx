import React from 'react';
import { useLocation } from 'react-router-dom';
import IframeLoader from '../../components/IframeLoader/iFrameLoader';
import { config } from "@oncoassist/shared/constants";

export function HcpValidation() {
  const location = useLocation();
  const iframeSrc = location.state?.iframeSrc ? `${config.webappURL}${location.state.iframeSrc}` : '';

  return <IframeLoader iframeSrc={iframeSrc} />;
}

export default HcpValidation;

import React, { useState, useEffect, useRef } from 'react';
import styles from './iFrameLoader.module.scss';
import { Loader } from '@oncoassist/shared/ui';
import { UserState } from "../../store/userEmailSlice";
import { useSelector } from "react-redux";

interface IframeLoaderProps {
  iframeSrc: string;
}

export function IframeLoader({ iframeSrc }: IframeLoaderProps) {
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isAuthenticated = useSelector((state: { userEmail: UserState }) => state.userEmail.opUserEmail);

//   useEffect(() => {
//     if (!iframeSrc) return;

//     const preloadIframe = document.createElement("iframe");
//     preloadIframe.src = iframeSrc;
//     preloadIframe.style.display = "none";
    
//     preloadIframe.onload = () => {
//       setLoading(false);
//       if (iframeRef.current) {
//         iframeRef.current.src = preloadIframe.src;
//       }
//       document.body.removeChild(preloadIframe);
//     };

//     document.body.appendChild(preloadIframe);

//     return () => {
//       if (document.body.contains(preloadIframe)) {
//         document.body.removeChild(preloadIframe);
//       }
//     };
//   }, [iframeSrc]);

  return (
    <div className={styles.toolsPage}>
      {loading && <Loader />}
      <iframe
        ref={iframeRef}
        id="tools-iframe"
        title="Tools Page"
        className={`${styles.toolsIframe} ${isAuthenticated ? styles.fullHeight : styles.reducedHeight}`}
        src={iframeSrc} // Ensure the iframe loads the provided src
        // loading="lazy"
        onLoad={() => setLoading(false)} // Hide loader when iframe loads
      ></iframe>
    </div>
  );
}

export default IframeLoader;

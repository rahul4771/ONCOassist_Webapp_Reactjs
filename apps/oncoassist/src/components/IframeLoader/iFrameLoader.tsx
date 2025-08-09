import React, { useState, useEffect, useRef, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './iFrameLoader.module.scss';
import { Loader } from '@oncoassist/shared/ui';
import { UserState } from "../../store/userEmailSlice";

interface IframeLoaderProps {
  iframeSrc: string;
}

export function IframeLoader({ iframeSrc }: IframeLoaderProps) {
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isAuthenticated = useSelector((state: { userEmail: UserState }) => state.userEmail.opUserEmail);

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

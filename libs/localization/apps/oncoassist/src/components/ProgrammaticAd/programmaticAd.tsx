import React, { useEffect, useRef, useState } from 'react';
import styles from './programmaticAd.module.scss'; 
import classNames from 'classnames';
import { logFirebaseEvent } from "../../utils/firebaseUtils";
import { PROD_MODE } from '@oncoassist/shared/constants';

interface AdPlatform {
  id: number;
  programmatic_ad_id: number;
  platform_code: string;
  platform_title: string;
  doc_size: string;
  doc_position: string;
  doc_unit_id: string;
  doc_slot_id: number;
  display_order: number;
  doc_os: number;
  doc_ad_code: string;
}

interface ProgrammaticAdProps {
  ad: {
    id: string;
    ad_position: number;
    inline_banner_index: number;
    inline_banner_height: number;
    ad_platform: AdPlatform[];
    type: string;
  };
  userData: {
    HCP_Registration_Id: string;
    Profession: string;
    primarySpecialityName: string;
  } | null;
}

const ProgrammaticAd: React.FC<ProgrammaticAdProps> = ({ ad, userData }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [shouldRender, setShouldRender] = useState(true);

  const platform = ad.ad_platform.find(p => p.platform_code === '3');

  useEffect(() => {
    if (!platform?.doc_ad_code || !iframeRef.current) return;

    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) return;

    const userNpi = userData?.HCP_Registration_Id || '';
    const updatedDocAdCode = appendNpiToScript(platform.doc_ad_code, userNpi);

    iframeDoc.open();
    iframeDoc.write(`
      <html>
        <head><meta charset="UTF-8"></head>
        <body style="margin:0;padding:0;">
          ${updatedDocAdCode}
        </body>
      </html>
    `);
    iframeDoc.close();

    const handleLoad = () => {
      setTimeout(() => {
        try {
          const innerDoc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document;
          const googletagFound = checkIfGoogletagFound(innerDoc);
          setShouldRender(!googletagFound);

          const eventName = googletagFound
            ? 'Inline_Programmatic_Failed'
            : 'Inline_Programmatic_Impression';

          logFirebaseEvent(eventName, {
            profession: userData?.Profession || '',
            primary_speciality: userData?.primarySpecialityName || '',
            banner_id: ad.id,
            banner_location: 'news',
            banner_platform: platform?.platform_title,
          });

        } catch (err) {
          console.error('Error during googletag detection:', err);
        }
      }, 600);
    };

    iframe.addEventListener('load', handleLoad);

    return () => {
      iframe.removeEventListener('load', handleLoad);
    };
  }, [platform?.doc_ad_code]);

  if (!platform || !shouldRender) return null;

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames('card', 'mb-3', styles.cardContainer)}>
        <div className="row g-0">
          <div className={classNames(styles.mainContent)}>
            <iframe
              ref={iframeRef}
              className={styles.responsiveIframe} 
              width="100%"
              height={ad.inline_banner_height}
              frameBorder="0"
              scrolling="no"
              style={{ border: 'none' }}
              title={`Programmatic Ad ${ad.id}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function appendNpiToScript(doc_ad_code: string, npi: string): string {
  const npiAttribute = PROD_MODE === "local" ? "testNPI" : "npi";
  return doc_ad_code.replace(
    /<script[^>]*>/,
    (match) => `${match.slice(0, -1)} ${npiAttribute}="${npi}">`
  );
}

function checkIfGoogletagFound(doc: Document | null): boolean {
  if (!doc) return false;

  try {
    const iframes = doc.querySelectorAll('iframe');
    for (const iframe of iframes) {
      if (iframe.src.includes('googletag.html')) return true;
      const nestedDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (checkIfGoogletagFound(nestedDoc)) return true;
    }
  } catch (err) {
    console.warn('Iframe access error:', err);
  }
  return false;
}

export default ProgrammaticAd;

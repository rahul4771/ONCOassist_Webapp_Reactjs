import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import styles from "./trialPopup.module.scss";
import { MdOutlineDoubleArrow } from "react-icons/md";


type PSAData = {
  title: string;
  psaResponseRate: string;
  timeToPSAProgression: string;
  objectiveDiseaseProgression: string;
};

type DrugCombination = {
  subTitle: string;
  dataPSA: PSAData[];
};

type HazardRatio = {
  title: string;
  hazardRatio: number;
  lowerCI: number;
  upperCI: number;
};

type TrialDisplayItem = {
  combinations: any[];
  description: string;
  infoPSA: string;
  drugCombinations: DrugCombination[];
  hazardRatioTitle?: string;
  hazardRatios: HazardRatio[];
  id: string;
  overallHR?: any;
  references?: string;
  title: string;
  subtitle: string;
  note?: string;
  leftHazardTitle: string;
  rightHazardTitle: string;
};

type TrialPopupProps = {
  trials: TrialDisplayItem[];
  onClose: () => void;
};
function TrialPopup({ trials, onClose }: TrialPopupProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trial = trials[currentIndex];
  const psaList = trial.drugCombinations[0]?.dataPSA || [];

  const handleSwipeLeft = () => {
    if (currentIndex < trials.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleSwipeRight = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    trackMouse: true,
  });

  return (
    <div className={styles.popupOverlay} {...handlers}>
      <div className={styles.popupContent}>
        <div className={styles.popupHeader}>
          Results
          <button onClick={onClose} className={styles.closeBtn}>
            ×
          </button>
        </div>
        <div className={styles.trialTitleContainer}>
          <span className={styles.trialTitle}>{trial.title}</span>
        </div>
        <div className={styles.popupBody}>
          <div className={`${styles.leftPanel} ${
                (!trial.hazardRatios || trial.hazardRatios.length === 0) ? styles.noHazard : ''
            }`}>
            <div className={styles.psaResponse}>
              <div className={styles.card}>
                <h3 className={styles.psaHeader}>PSA Response Rate</h3>
                <span className={styles.psaDescription}>{trial.infoPSA}</span>
                <div className={styles.psaScrollWrapper}>
                {psaList.map((item, idx) => (
                  <div key={idx} className={styles.psaRow}>
                    <div className={styles.psaProgressHeader}>
                      <strong className={styles.psaProgressTitle}>
                        {item.title}
                      </strong>
                      <p className={styles.psaProgressValue}>
                        {item.psaResponseRate}%
                      </p>
                    </div>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progress}
                        style={{ width: `${item.psaResponseRate}%` }}
                      />
                      
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>
            <div className={styles.psaProgression}>
              <div className={styles.card}>
                <h3 className={styles.psaHeader}>Time to PSA Progression</h3>
                <div className={styles.psaProgressionScrollWrapper}>
                {psaList.map((item, idx) => (
                  <div key={idx} className={styles.psaProgressionRow}>
                    <span className={styles.psaTitleNormal}>{item.title}</span>
                    <span className={styles.psaProgressionValue}>
                      {item.timeToPSAProgression}
                    </span>
                  </div>
                ))}
                </div>
              </div>
            </div>
            <div className={styles.references}>
              <div className={styles.card}>
                <h3 className={styles.psaHeader}>References</h3>
                <div className={styles.referenceItemsScrollArea}>
                  {trial.references?.split('\n').map((ref, idx) => {
                    const parts = ref.split(/(https?:\/\/[^\s]+)/g);
                    return (
                      <p key={idx} className={styles.referenceItem}>
                        {parts.map((part, i) =>
                          part.startsWith('http') ? (
                            <a
                              key={i}
                              href={part}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.referenceLink}
                            >
                              {part}
                            </a>
                          ) : (
                            <span key={i}>{part}</span>
                          )
                        )}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {trial.hazardRatios && trial.hazardRatios.length > 0 && (
          <div className={styles.hazardPanel}>
            <div className={styles.card}>
              <h3 className={styles.psaHeader}>{trial.hazardRatioTitle}</h3>
              <div className={styles.hazardSubheading}>
                <span className={styles.hazardSubHeadingTitle}>{trial.leftHazardTitle}</span>
                <span className={styles.hazardSubHeadingTitle}>{trial.rightHazardTitle}</span>
              </div>

              <div className={styles.hazardScaleHeader}>
                <span className={styles.hazardRatioLabel}>Hazard Ratio</span>
                <span className={styles.ciLabel}>95% CI</span>
              </div>

              <div className={styles.hazardGuideWrapper}>
                <div className={styles.hazardLabels}>
                  <span>0</span>
                  <span>0.25</span>
                  <span>0.5</span>
                  <span>0.75</span>
                  <span>1</span>
                  <span>1.25</span>
                  <span>1.5</span>
                  <span>1.75</span>
                  <span>2</span>
                </div>

                <div className={styles.hazardGuideLine} />

                <div className={styles.hazardScrollWrapper}>
                  <div className={styles.verticalReferenceLine}></div>
                  <div className={styles.hazardItemsScrollArea}>
                    {trial.hazardRatios.map((hr, idx) => {
                      const min = 0;
                      const max = 2;
                      const range = max - min;

                      const lowerCI = Math.max(min, hr.lowerCI);
                      const upperCI = Math.min(max, hr.upperCI); // Clamp at 2

                      const startPercent = ((lowerCI - min) / range) * 100;
                      const widthPercent = ((upperCI - lowerCI) / range) * 100;
                      const dotPercent = ((hr.hazardRatio - min) / range) * 100;

                      return (
                        <div key={idx} className={styles.hazardItem}>
                          <div className={styles.hazardTopInfo}>
                            <span className={styles.hazardTitle}>
                              {hr.title}
                            </span>
                            <span className={styles.hazardValueAtCenter}>
                              {hr.hazardRatio.toFixed(2)}
                            </span>
                            <span className={styles.hazardCI}>
                              {hr.lowerCI} - {hr.upperCI}
                            </span>
                          </div>
                          <div className={styles.hazardBar}>
                            <div
                              className={styles.hazardLine}
                              style={{
                                left: `${startPercent}%`,
                                width: `${widthPercent}%`,
                              }}
                            />
                            <div
                              className={styles.hazardDot}
                              style={{
                                left: `${dotPercent}%`,
                              }}
                            />
                          </div>
                          <div className={styles.hazardBottomLine} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}
          <div className={`${styles.graphPanel} ${
                (!trial.hazardRatios || trial.hazardRatios.length === 0) ? styles.noHazard : ''
            }`}>
            <div className={styles.graphCardWrapper}>
                {trial.drugCombinations[0]?.figures?.map((figure, index) => (
                <div key={index} className={styles.graphCard}>
                    <h3 className={styles.graphHeader}>{figure.caption}</h3>
                    <div className={styles.graphSection}>
                    <img
                        src={`/assets/graphs/${figure.image}.png`}
                        alt={figure.caption}
                        className={styles.graphImage}
                    />
                    {figure.description && (
                        <p className={styles.graphDescription}>{figure.description}</p>
                    )}
                    </div>
                </div>
                ))}
            </div>
            </div>


        </div>

        {trials.length > 1 && (
        <div className={styles.trialSwipeNav} {...handlers}>
            {currentIndex > 0 && (
            <div className={styles.swipeSide} onClick={handleSwipeRight}>
                <div className={styles.trialLabel}>
                {trials[currentIndex - 1]?.title}
                </div>
                <MdOutlineDoubleArrow className={`${styles.arrowIcon} ${styles.leftArrow}`} />
                
            </div>
            )}

            {currentIndex < trials.length - 1 && (
            <div className={styles.swipeSide} onClick={handleSwipeLeft}>
                
                <MdOutlineDoubleArrow className={`${styles.arrowIcon} ${styles.rightArrow}`} />
                <div className={styles.trialLabel}>
                {trials[currentIndex + 1]?.title}
                </div>
            </div>
            )}
        </div>
        )}
      </div>
    </div>
  );
};

export default TrialPopup;

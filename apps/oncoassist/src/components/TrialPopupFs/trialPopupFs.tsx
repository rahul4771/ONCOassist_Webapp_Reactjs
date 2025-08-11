import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import styles from "./trialPopupFs.module.scss";
import { MdOutlineDoubleArrow } from "react-icons/md";
import trialData from '../../utils/FongScore.json';
import { useTranslation } from 'react-i18next';



type TrialPopupProps = {
  trials: {
    score: string,
    riskLevel: string,
    survivalRate: string,
  };
  onClose: () => void;
};
function TrialPopup({ trials, onClose }: TrialPopupProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();
  console.log("trialResults", trials);

 


  return (
    <div className={styles.popupOverlay} >
      <div className={styles.popupContent}>
        <div className={styles.popupHeader}>
          Results
          <button onClick={onClose} className={styles.closeBtn}>
            ×
          </button>
        </div>



        <div className={styles.popupBody}>
          <div className="">
            <div className={styles.scoreCircleContainer}>
              <div className={styles.scoreCircle}>
                <span className={styles.scoreNumber}>{trials.score}</span>
              </div>
              <div className={styles.scoreText}>
                <div className={styles.riskLevel}>{trials.riskLevel} Risk</div>
                <div className={styles.survivalRate}>5-year Overall Survival: {trials.survivalRate}</div>
              </div>
            </div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Score</th>
                    <th>Risk Groups</th>
                    <th>5-year overall survial %</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>0,1</td>
                    <td>Low</td>
                    <td>57-67 %</td>
                  </tr>
                  <tr>
                    <td>2,3</td>
                    <td>Moderate</td>
                    <td>40-44 %</td>
                  </tr>
                  <tr>
                    <td>4,5</td>
                    <td>High</td>
                    <td>31-38 %</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={styles.formWrapper}>
              <div className={styles.formContainer}>
                <h5>Info</h5>
                <p className={styles.descriptionText}>
                  {t('FONG_SCORE_PROSTATE_INFO')}
                  <div className={styles.referenceWrapper}>
                    <span className={styles.referenceTitle}>References:</span>
                    {trialData.map((item) => (
                      <div className={styles.referenceSection}>
                        <span className={styles.referenceToolTitle}>{item.title}</span>
                        <span className={styles.referenceItem}>
                          {item.references.split('\n').map((line, idx) => {
                            const urlMatch = line.match(/https?:\/\/[^\s]+/);

                            if (urlMatch) {
                              const url = urlMatch[0];
                              const [before, after] = line.split(url);

                              return (
                                <React.Fragment key={idx}>
                                  {before}
                                  <a href={url} target="_blank" rel="noopener noreferrer">
                                    {url}
                                  </a>
                                  {after}
                                  <br />
                                </React.Fragment>
                              );
                            }

                            return (
                              <React.Fragment key={idx}>
                                {line}
                                <br />
                              </React.Fragment>
                            );
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </p>
              </div>
            </div>
            <div className={styles.psaResponse}>
              {/* <div className={styles.card}>
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
              </div> */}
            </div>
            {/* <div className={styles.psaProgression}>
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
            </div> */}
            {/* <div className={styles.references}>
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
            </div> */}
          </div>
          {/* {trial.hazardRatios && trial.hazardRatios.length > 0 && (
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
          )} */}
          {/* <div className={`${styles.graphPanel} ${
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
            </div> */}


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
    </div >
  );
};

export default TrialPopup;

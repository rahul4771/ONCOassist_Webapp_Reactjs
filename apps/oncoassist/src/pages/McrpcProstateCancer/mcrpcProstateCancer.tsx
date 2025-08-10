import React, { useEffect, useState } from 'react';
import styles from './mcrpcProstateCancer.module.scss';
import AppStoreButtons from '../../components/AppStoreButton/appStorebutton';
import ToggleButton from '../../components/ToggleButton/toggleButton';
import TrialPopup from '../../components/TrialPopup/trialPopup';
import { useTranslation } from 'react-i18next';
import { config, SOCIAL_MEDIA_LINKS } from '@oncoassist/shared/constants';
import mcrpcInput from '../../utils/McrpcInput.json';
import trialData from '../../utils/ProstateResults.json';


export const McrpcProstateCancer = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPopup, setShowPopup] = useState(false);
  const [trialResults, setTrialResults] = useState([]);
  const [formValues, setFormValues] = useState<Record<string, boolean | undefined>>(
    Object.fromEntries(mcrpcInput.map((item) => [item.analyticsKey, undefined]))
  );

  const { t } = useTranslation();
  

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden'; // Lock scroll
    } else {
      document.body.style.overflow = ''; // Restore scroll
    }
  
    return () => {
      document.body.style.overflow = ''; // Cleanup on unmount
    };
  }, [showPopup]);
  

  const handleChange = (key: string, value: boolean) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [key]: '',
    }));
  };


function processDrugCombinations(
  trialsList,
  bRCASelection,
  hRRSelection,
  msiHighSelection,
  tmbHighSelection
) {
  trialsList.forEach((mcrpcResultItem) => {
    const combinationsList = mcrpcResultItem.drugCombinations;
    const defaultCombination = combinationsList.some(
      (item) => item.condition === 0
    );
    const conditionsList = combinationsList.map((item) => item.condition);
    let drugCombinationToShow = null;

    if (defaultCombination && combinationsList.length === 1) {
      drugCombinationToShow = combinationsList.find(
        (item) => item.condition === 0
      );
    } else {
      let satisfiedCondition = -1;

      if (
        conditionsList.includes(6) &&
        msiHighSelection === true &&
        tmbHighSelection === true
      ) {
        satisfiedCondition = 6;
      } else if (
        conditionsList.includes(7) &&
        msiHighSelection === true &&
        tmbHighSelection !== true
      ) {
        satisfiedCondition = 7;
      } else if (
        conditionsList.includes(8) &&
        msiHighSelection !== true &&
        tmbHighSelection === true
      ) {
        satisfiedCondition = 8;
      } else if (
        conditionsList.includes(5) &&
        bRCASelection === undefined &&
        hRRSelection === true
      ) {
        satisfiedCondition = 5;
      } else if (
        conditionsList.includes(4) &&
        bRCASelection === true &&
        hRRSelection === undefined
      ) {
        satisfiedCondition = 4;
      } else if (
        conditionsList.includes(3) &&
        bRCASelection === true &&
        hRRSelection === true
      ) {
        satisfiedCondition = 3;
      } else if (
        conditionsList.includes(2) &&
        bRCASelection === false &&
        hRRSelection === true
      ) {
        satisfiedCondition = 2;
      } else if (
        conditionsList.includes(1) &&
        bRCASelection === true &&
        hRRSelection === false
      ) {
        satisfiedCondition = 1;
      } else if (conditionsList.includes(0)) {
        satisfiedCondition = 0;
      }

      if (satisfiedCondition !== -1) {
        drugCombinationToShow = combinationsList.find(
          (item) => item.condition === satisfiedCondition
        );
      }
    }

    if (drugCombinationToShow) {
      mcrpcResultItem.drugCombinations = [drugCombinationToShow];
    }
  });

  return trialsList;
}


function filterHazardRatios(inputsBasedFiltered, inputList) {
  const updatedTrials = inputsBasedFiltered.map((trial) => {
    const hazardRatioList = [];

    if (Array.isArray(trial.hazardRatios) && trial.hazardRatios.length > 0) {
      // ✅ Clone first
      const allRatios = [trial.overallHR, ...trial.hazardRatios];

      allRatios.forEach((hazardRatioItem) => {
        const displayConditions = hazardRatioItem.displayConditions;

        if (Array.isArray(displayConditions) && displayConditions.length > 0) {
          const itemFound = displayConditions.some((condition) =>
            inputList.some(
              (input) =>
                Number(input.id) === condition.item &&
                input.selected === condition.selection
            )
          );
          if (itemFound) {
            hazardRatioList.push(hazardRatioItem);
          }
        } else {
          hazardRatioList.push(hazardRatioItem);
        }
      });
    }

    return {
      ...trial,
      hazardRatios: hazardRatioList,
    };
  });

  return updatedTrials;
}

function filterHazardRatios(inputsBasedFiltered, inputList) {
  inputsBasedFiltered.forEach((trial) => {
    const hazardRatioList = [];

    if (Array.isArray(trial.hazardRatios) && trial.hazardRatios.length > 0) {
      // Add overallHR at index 0
      trial.hazardRatios.unshift(trial.overallHR);

      trial.hazardRatios.forEach((hazardRatioItem) => {
        const displayConditions = hazardRatioItem.displayConditions;

        if (Array.isArray(displayConditions) && displayConditions.length > 0) {
          const itemFound = displayConditions.some((condition) =>
            inputList.some(
              (input) => Number(input.id) === condition.item && input.selected === condition.selection
            )
          );
          if (itemFound) {
            hazardRatioList.push(hazardRatioItem);
          }
        } else {
          hazardRatioList.push(hazardRatioItem);
        }
      });
    }

    // Add the filtered hazard ratio list to the trial object (or update as needed)
    trial.hazardRatios = hazardRatioList;
  });

  return inputsBasedFiltered;
}


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const values = formValues;

    const PROpel_ID = 0;
    const TALAPRO_1_ID = 1;
    const TALAPRO_2_ID = 2;
    const PROfound_ID = 3;
    const KEYNOTE_199_ID = 4;
    const INSPIRE_ID = 5;
    const COU_AA_302_ID = 6;
    const PREVAIL_ID = 7;
    const TERRAIN_ID = 8;
    const PEACE_III_ID = 9;
    const TAX_327_ID = 10;
    const SWOG_9916_ID = 11;
    const IMPACT_ID = 12;
    const MAGNITUDE_ID = 14;
    const ALSYMPCA_ID = 15;
    const COU_AA_301_ID = 16;
    const AFFIRM_ID = 17;
    const TROPIC_ID = 18;
    const NCT01505868_ID = 19;
    const TRITON3_ID = 20;
    const CARD_ID = 21;
    const PROSELICA_ID = 22;
    const TRITON2_ID = 23;
    const VISION_ID = 24;
    const PROSTY_ID = 25;
    const PSMAfore_ID = 26;
    const THERA_P_ID = 27;

    const priorDocetaxel = values['prior_docetaxel_treatment'];
    const priorARPi = values['prior_ARPi_use'];
    const brcaMutation = values['brca_mutation'];
    const NonBrcaMutation = values['non_brca_ddr_mutation'];
    const boneOnlyMetastatic = values['bone_only_metastatic_disease'];
    const msiHigh = values['msi_high'];
    const tmbHigh = values['tmb_high'];
    const psmaPositiveTumor = values['psma_positive_tumor'];

    const inputList = mcrpcInput.map((item) => {
      const val = values[item.analyticsKey];
      return {
        id: item.id,
        selected: val === true ? 1 : val === false ? 0 : undefined,
      };
    });

    console.log(inputList);

    // Ensure values are defined before proceeding
    if (priorDocetaxel === undefined || priorARPi === undefined) {
      console.warn('Required fields are not selected');
      return;
    }

    // Compute combination key (0 to 3)
    const combinationKey = (priorDocetaxel ? 1 : 0) + (priorARPi ? 1 : 0) * 2;
    console.log('Computed Combination:', combinationKey);

    // Define custom sort orders
    const sortOrderById: Record<number, number[]> = {
      0: [
        PROpel_ID,
        MAGNITUDE_ID,
        TALAPRO_2_ID,
        COU_AA_302_ID,
        PREVAIL_ID,
        TERRAIN_ID,
        PEACE_III_ID,
        TAX_327_ID,
        SWOG_9916_ID,
        PROSTY_ID,
        ALSYMPCA_ID,
        IMPACT_ID,
        INSPIRE_ID,
        KEYNOTE_199_ID,
      ],
      1: [
        PROpel_ID,
        MAGNITUDE_ID,
        TALAPRO_1_ID,
        TALAPRO_2_ID,
        COU_AA_301_ID,
        AFFIRM_ID,
        PEACE_III_ID,
        TROPIC_ID,
        PROSELICA_ID,
        NCT01505868_ID,
        ALSYMPCA_ID,
        IMPACT_ID,
        INSPIRE_ID,
        KEYNOTE_199_ID,
      ],
      2: [
        TAX_327_ID,
        PSMAfore_ID,
        TRITON3_ID,
        PROfound_ID,
        ALSYMPCA_ID,
        NCT01505868_ID,
        IMPACT_ID,
        INSPIRE_ID,
        KEYNOTE_199_ID,
      ],
      3: [
        VISION_ID,
        THERA_P_ID,
        PROfound_ID,
        TRITON3_ID,
        TRITON2_ID,
        CARD_ID,
        NCT01505868_ID,
        PROSELICA_ID,
        ALSYMPCA_ID,
        INSPIRE_ID,
        KEYNOTE_199_ID,
      ],
    };

    // Filter trials that contain this combination
    const matchedTrials = trialData.filter((trial) =>
      trial.combinations.includes(combinationKey)
    );

    let sortedTrials = matchedTrials.sort((a, b) => {
      const sortIds = sortOrderById[combinationKey] || [];

      const indexA = sortIds.indexOf(a.id);
      const indexB = sortIds.indexOf(b.id);

      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

    //Filter list based on Input values
    //For Condition 0
    const idsToRemove = new Set<number>();
    switch (combinationKey) {
      case 0: {
        // Conditions to determine which trial IDs to exclude
        if (brcaMutation === false) {
          idsToRemove.add(PROpel_ID).add(MAGNITUDE_ID);
        }

        if (brcaMutation === false && NonBrcaMutation === false) {
          idsToRemove.add(PROpel_ID).add(TALAPRO_2_ID);
        }

        if (boneOnlyMetastatic === false) {
          idsToRemove.add(COU_AA_302_ID).add(PEACE_III_ID).add(IMPACT_ID);
        }

        if (msiHigh === false && tmbHigh === false) {
          idsToRemove.add(KEYNOTE_199_ID).add(INSPIRE_ID);
        }

        // Apply the filtering once
        sortedTrials = sortedTrials.filter(
          (trial) => !idsToRemove.has(trial.id)
        );
        break;
      }
      case 1: {
        // Conditions to determine which trial IDs to exclude
        if (brcaMutation === false) {
          idsToRemove.add(PROpel_ID).add(MAGNITUDE_ID);
        }

        if (brcaMutation === false && NonBrcaMutation === false) {
          idsToRemove.add(PROpel_ID).add(TALAPRO_2_ID);
        }

        if (boneOnlyMetastatic === false) {
          idsToRemove.add(ALSYMPCA_ID).add(IMPACT_ID).add(PEACE_III_ID);
        }

        if (msiHigh === false && tmbHigh === false) {
          idsToRemove.add(KEYNOTE_199_ID).add(INSPIRE_ID);
        }

        // Apply the filtering once
        sortedTrials = sortedTrials.filter(
          (trial) => !idsToRemove.has(trial.id)
        );
        break;
      }
      case 2: {
        // Conditions to determine which trial IDs to exclude
        if (brcaMutation === false) {
          idsToRemove.add(TRITON3_ID);
        }

        if (brcaMutation === false && NonBrcaMutation === false) {
          idsToRemove.add(PROfound_ID).add(TALAPRO_2_ID);
        }

        if (boneOnlyMetastatic === false) {
          idsToRemove.add(ALSYMPCA_ID).add(IMPACT_ID);
        }

        if (psmaPositiveTumor === false) {
          idsToRemove.add(PSMAfore_ID);
        }

        if (msiHigh === false && tmbHigh === false) {
          idsToRemove.add(KEYNOTE_199_ID).add(INSPIRE_ID);
        }

        // Apply the filtering once
        sortedTrials = sortedTrials.filter(
          (trial) => !idsToRemove.has(trial.id)
        );
        break;
      }

      case 3: {
        // Conditions to determine which trial IDs to exclude
        if (brcaMutation === false) {
          idsToRemove.add(TRITON3_ID).add(TALAPRO_2_ID);
        }

        if (brcaMutation === false && NonBrcaMutation === false) {
          idsToRemove.add(PROfound_ID);
        }

        if (boneOnlyMetastatic === false) {
          idsToRemove.add(ALSYMPCA_ID);
        }

        if (psmaPositiveTumor === false) {
          idsToRemove.add(VISION_ID).add(THERA_P_ID);
        }

        if (msiHigh === false && tmbHigh === false) {
          idsToRemove.add(KEYNOTE_199_ID).add(INSPIRE_ID);
        }

        // Apply the filtering once
        sortedTrials = sortedTrials.filter(
          (trial) => !idsToRemove.has(trial.id)
        );
        break;
      }
    }

    const trialsAfterDrugFilter = processDrugCombinations(
      sortedTrials,
      brcaMutation,
      NonBrcaMutation,
      msiHigh,
      tmbHigh
    );
    const finalTrials = filterHazardRatios(trialsAfterDrugFilter, inputList);

    const resultDisplayList = [];

    finalTrials.forEach((trial) => {
      const hazardRatioList = trial.hazardRatios ?? [];
      const combination = trial.drugCombinations?.[0];
      const dataPSA0 = combination?.dataPSA?.[0];
      const dataPSA1 = combination?.dataPSA?.[1];

      resultDisplayList.push({
        combinations: trial.combinations,
        description: trial.description,
        infoPSA: trial.infoPSA,
        drugCombinations: trial.drugCombinations,
        hazardRatioTitle: trial.hazardRatioTitle,
        hazardRatios: hazardRatioList,
        id: trial.id,
        overallHR: trial.overallHR,
        references: trial.references,
        title: trial.title,
        subtitle: combination?.subTitle || '',
        note: trial.note,
        leftHazardTitle:
          dataPSA0?.title?.length > 0 ? `Favours ${dataPSA0.title}` : '',
        rightHazardTitle:
          dataPSA1?.title?.length > 0 ? `Favours ${dataPSA1.title}` : '',
      });
    });

    setTrialResults(resultDisplayList);
    setShowPopup(true);
  };


  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    mcrpcInput.forEach((item) => {
      if (item.isMandatory && formValues[item.analyticsKey] === undefined) {
        newErrors[item.analyticsKey] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleClose = () => {
    setShowPopup(false);
    setTrialResults([]);
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.contentSection}>
        <div className={styles.formHeadingWrapper}>
          <span className={styles.formHeading}>{t('MCRPC_TOOL_HEADING')}</span>
        </div>
        <div className={styles.rowWrapper}>
          <div className={styles.toolSection}>
           
            <div className={styles.formWrapper}>
              <div className={styles.formContainer}>
                <p className={styles.descriptionText}>{t('MCRPC_PROSTATE_DESC')}</p>

                <form onSubmit={handleSubmit}>
                  {mcrpcInput.map((item) => (
                    <div key={item.id} className={styles.toggleGroup}>
                      <label className={styles.toggleLabel} htmlFor={item.analyticsKey}>
                        {t(item.title)}
                        {item.isMandatory && <span style={{ color: 'red' }}> *</span>}
                      </label>

                      <ToggleButton
                        id={item.id}
                        name={item.analyticsKey}
                        value={formValues[item.analyticsKey]}
                        onChange={(val) => handleChange(item.analyticsKey, val)}
                        noLabel={
                          ['brca_mutation', 'non_brca_ddr_mutation'].includes(item.analyticsKey)
                            ? 'No/Unknown'
                            : 'No'
                        }
                        yesLabel="Yes"
                        className={
                          ['brca_mutation', 'non_brca_ddr_mutation'].includes(item.analyticsKey)
                            ? styles.toggleWide
                            : styles.toggleNarrow
                        }
                      />

                      {errors[item.analyticsKey] && (
                        <div className={styles.errorText}>{errors[item.analyticsKey]}</div>
                      )}
                    </div>
                  ))}

                  <p className={styles.requiredNote}>*Required fields</p>

                  <div className={styles.buttonWrapper}>
                    <button type="submit" className={styles.submitButton}>
                      View Results
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className={styles.newsSection}>
          <div className={styles.formWrapper}>
            <div className={styles.formContainer}>
              <h5>Info</h5>
              <p className={styles.descriptionText}>
                {t('MCRPC_PROSTATE_INFO')}
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
        </div>
          </div>
         
          <div className={styles.reviewSection}>
                <div className={styles.reviewCarousel}>
                  <div className={styles.socialIcons}>
                    {SOCIAL_MEDIA_LINKS.map(({ icon: Icon, url, name }, index) => (
                      <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={name}
                      >
                        <Icon className={styles.icon} />
                      </a>
                    ))}
                  </div>
                  <AppStoreButtons />
                  <p className={styles.footer}>&copy; {new Date().getFullYear()} ONCOassist</p>
                </div>
              </div>
         
      </div>
    
        </div>
        {showPopup && (
        <div className={styles.popupSection}>
          <TrialPopup trials={trialResults} onClose={handleClose} />
        </div>
      )}
    </div>
  );
};

export default McrpcProstateCancer;

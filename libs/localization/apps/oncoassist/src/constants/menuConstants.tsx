import {
  FaHome,
  FaSearch,
  FaHeart,
  FaUserCircle,
  FaAccessibleIcon
} from 'react-icons/fa';

import { RiShoppingBag4Fill } from 'react-icons/ri';
import { useTranslation } from "react-i18next";

export const useMenuItems = () => {
  const { t } = useTranslation();

  const SUB_SUB_ITEMS = {
    formulas : [      
      {
        name: t('BODY_MASS_INDEX'),
        link: 'public/index.php/formula/body_mass_index',
        iFrameLink: 'formula',
        id: 'bmi',
        keywords: ['body_mass_index','bmi'],
        description : "bmi"
      },
      {
        name: t('BODY_SURFACE_AREA'),
        link: 'public/index.php/formula/body_surface_area',
        iFrameLink: 'formula',
        id: 'bsa',
        keywords: ['body_surface_area', 'bsa'],
        description : "Body Surface Area / Chemotherapy Dose Calculator is the measured or calculated surface of a human body used to help Oncologists decide what chemotherapy dose to prescribe for give the patient."
      },
      {
        name: t('CARBOPLATIN_DOSAGE_CG'),
        link: 'public/index.php/formula/carboplatin_dosage_cg',
        iFrameLink: 'formula',
        id: 'cdc cgq',
        keywords: ['carboplatin_dosage_cg'],
        description : "Carboplatin Dose Calculator (using Cockroft-Gault Equation for GFR) calculates the dose of a specific chemotherapeutic agent called Carboplatin using a patients serum creatinine(a blood test result), age, weight, gender and dose intensity (AUC) as decided by the oncologist. "
      },
      {
        name: t('CARBOPLATIN_DOSAGE_WRI'),
        link: 'public/index.php/formula/carboplatin_dosage_wri',
        iFrameLink: 'formula',
        id: 'cdc we',
        keywords: ['carboplatin_dosage_wri'],
        description: 'Carboplatin Dose Calculator (using Wright Equation for GFR) calculates the dose of a specific chemotherapeutic agent called Carboplatin using a patients serum creatinine(a blood test result), age, weight,height, gender and dose intensity (AUC) as decided by the oncologist.'
      },
      {
        name: t('FONG_SCORE'),
        link: 'public/index.php/formula/body_mass_index',
        iFrameLink: 'formula',
        id: 'fs',
        keywords: ['body_mass_index','bmi'],
        description : "bmi"
      },
      {
        name: t('CHILD_PUGH_SCORE'),
        link: 'public/index.php/formula/child_pugh_score',
        iFrameLink: 'formula',
        id: 'cps',
        keywords: ['child_pugh_score'],
        description: 'The Child-Pugh score is used to assess the prognosis of chronic liver disease, mainly cirrhosis.'
      },
      {
        name: t('CORRECTED_CALCIUM'),
        link: 'public/index.php/formula/corrected_calcium',
        iFrameLink: 'formula',
        id: 'cc',
        keywords: ['corrected_calcium'],
        description: 'Derives a corrected calcium level when the albumin is abnormal. This is to make up for the change in total calcium due to the change in albumin-bound calcium, and gives an estimate of what the calcium level would be if the albumin were within normal ranges. '
      },
      {
        name: t('CORRECTED_QT_INTERVALS'),
        link: 'public/index.php/formula/corrected_qt_interval',
        iFrameLink: 'formula',
        id: 'cqi',
        keywords: ['corrected_qt_interval'],
        description: 'corrected_qt_interval'
      },
      {
        name: t('CREATINE_CLEARENCE_CG'),
        link: 'public/index.php/formula/cockcroft_gault_equation',
        iFrameLink: 'formula',
        id: 'cge',
        keywords: ['cockcroft_gault_equation'],
        description: 'Creatinine Clearance (GFR) using Cockroft-Gault Equation is a method of estimating Glomerular filtration rate (GFR) from serum creatinine, age and weight used in calculating the dose of chemotherapy to administer'
      },
      {
        name: t('CREATINE_CLEARENCE_WRI'),
        link: 'public/index.php/formula/wright_equation',
        iFrameLink: 'formula',
        id: 'we',
        keywords: ['wright_equation'],
        description: 'Creatinine Clearance (GFR) using Wright Equation is a method of estimating Glomerular filtration rate (GFR) from serum creatinine, age and body surface area using the Dubois equation, used in calculating the dose of chemotherapy to administer'
      },
      {
        name: t('ECOG_PERFORMANCE'),
        link: 'public/index.php/formula/ecog_performance_score',
        iFrameLink: 'formula',
        id: 'ecog',
        keywords: ['ecog_performance_score'],
        description: "ECOG Performance score provides scales and criteria that are used by doctors and researchers to assess how a patient's disease is progressing, assess how the disease affects the daily living abilities of the patient, and determine appropriate treatment and prognosis. "
      },
      {
        name: t('GLASGOW_COMA_SCALE'),
        link: 'public/index.php/formula/glasgow_coma_scale',
        iFrameLink: 'formula',
        id: 'gcs',
        keywords: ['glasgow_coma_scale'],
        description: 'The Glasgow Coma Scale or GCS is a neurological scale that aims to give a reliable, objective way of recording the conscious state of a person for initial as well as subsequent assessment.'
      },
      {
        name: t('IBW_ABW_FORMULA'),
        link: 'public/index.php/formula/ibw_abw_formula',
        iFrameLink: 'formula',
        id: 'ibwabw',
        keywords: ['ibw_abw_formula'],
        description: 'ibw_abw_formula'
      },
      {
        name: t('KARNOFSKY_PERFORMANCE'),
        link: 'public/index.php/formula/karnofsky_performance_score',
        iFrameLink: 'formula',
        id: 'kps',
        keywords: ['karnofsky_performance_score'],
        description: 'The Karnofsky Performance Scale Index allows patients to be classified as to their functional impairment.'
      },
      {
        name: t('KHORANA_SCORE'),
        link: 'public/index.php/formula/khorana_score',
        iFrameLink: 'formula',
        id: 'ks',
        keywords: ['khorana_score'],
        description: 'The Khorana model is a validated predictive model that stratifies blood clot risk in cancer patients receiving chemotherapy.'
      },
      {
        name: t('MASCC_RISK_INDEX'),
        link: 'public/index.php/formula/mascc_risk_index',
        iFrameLink: 'formula',
        id: 'mascc',
        keywords: ['mascc_risk_index'],
        description: 'The Multinational Association for Supportive Care in Cancer (MASCC) Risk Index can be used to identify low-risk patients (score ≥ 21 points) for serious complications of febrile neutropenia (including death, intensive care unit admission, confusion, cardiac complications, respiratory failure, renal failure, hypotension, bleeding, and other serious medical complications).'
      },
      {
        name: t('OPIATE_ANALGESIC_CONVERTER'),
        link: 'public/index.php/formula/opiate_analgesic_converter',
        iFrameLink: 'formula',
        id: 'oac',
        keywords: ['opiate_analgesic_converter'],
        description: 'Opiate Analgesic Converter calculates equivalent or adjusted dosing for patients on one or more opioid analgesics based on standardized charts.'
      },
      {
        name: t('PSA_DOUBLING_TIME'),
        link: 'public/index.php/formula/psa_doubling_time',
        iFrameLink: 'formula',
        id: 'psadt',
        keywords: ['psa_doubling_time'],
        description: 'This tool can be used to calculate the rate of rise of PSA, expressed as the velocity in nano grams/mL/year, or the PSA doubling time, in months or years.'
      },
      {
        name: t('SMOKING_PACK_YEARS'),
        link: 'public/index.php/formula/smoking_pack_years',
        iFrameLink: 'formula',
        id: 'spy',
        keywords: ['smoking_pack_years'],
        description: 'Smoking Pack Years calculator helps to produce a numerical value of lifetime tobacco exposure called pack years.'
      },
      {
        name: t('STEROID_EQUIVALENCE_CONVERTER'),
        link: 'public/index.php/formula/steroid_equivalence_converter',
        iFrameLink: 'formula',
        id: 'sqc',
        keywords: ['steroid_equivalence_converter'],
        description: 'Steroid Equivalence Converter calculates equivalent or adjusted steroid dosing for patients based on standardized charts'
      },
      {
        name: t('UPPER_LIMB_VEINS'),
        link: 'public/index.php/formula/upper_limb_veins',
        iFrameLink: 'formula',
        id: 'ulv',
        keywords: ['upper_limb_veins'],
        description: 'The Upper Limb Veins section shows the user the location of the main limb veins of a patients arm. '
      },
      {
        name: t('WELLS_SCORE_DVT'),
        link: 'public/index.php/formula/wells_score_dvt',
        iFrameLink: 'formula',
        id: 'wsd',
        keywords: ['wells_score_dvt'],
        description: 'Wells Score gives oncologists a high, moderate or low risk of probability of having DVT based on the Oncologists inputting in a number of variables, this is a validated scoring system. '
      },
      {
        name: t('WELLS_SCORE_PE'),
        link: 'public/index.php/formula/wells_score_pe',
        iFrameLink: 'formula',
        id: 'wsp',
        keywords: ['wells_score_pe'],
        description: 'Wells Score for pulmonary embolism gives a scoring of likely or unlikely regarding the likelihood of a lung blood clot developing. '
      },
      
    ],
    prognosticScores: [
      {
        name: t('MYELOFIBROSIS_SCORING_TOOL'),
        link: 'public/index.php/prognostic_scores/myelofibrosis_scoring_tool',
        iFrameLink: 'prognostic_score',
        id: 'mftool',
        keywords: ['myelofibrosis_scoring_tool'],
        description: 'Myelofibrosis scoring tool takes inputs from users and provide them with multiple myelofibrosis scoring results including IPSS, DIPSS, DIPSS-Plus, MIPSS70 and MIPSS70-Plus. '
      },
      
      {
        name: t('ASSURE_RCC'),
        link: 'public/index.php/prognostic_scores/assure_rcc_prognostic_score',
        iFrameLink: 'prognostic_score',
        id: 'assure',
        keywords: ['assure_rcc_prognostic_score', 'assure'],
        description: 'assure_rcc_prognostic_score'
      },
      {
        name: t('CARG_SCORE'),
        link: 'public/index.php/prognostic_scores/carg_prognostic_score',
        iFrameLink: 'prognostic_score',
        id: 'carg',
        keywords: ['carg_prognostic_score', 'carg'],
        description: 'carg_prognostic_score'
      },
      {
        name: t('CTS5'),
        link: 'public/index.php/prognostic_scores/cts5_prognostic_score',
        iFrameLink: 'prognostic_score',
        id: 'cts5',
        keywords: ['cts5_prognostic_score', 'cts5'],
        description: 'Prediction of Late Distant Recurrence in Patients With Estrogen Receptor–Positive Breast Cancer Treated With 5 Years of Endocrine Therapy: CTS5'
      },
      {
        name: t('CMML'),
        link: 'public/index.php/prognostic_scores/cmml_prognostic_score',
        iFrameLink: 'prognostic_score',
        id: 'cmml',
        keywords: ['cmml_prognostic_score', 'cmml'],
        description: 'Chronic myelomonocytic leukaemia (CMML) is a form of leukaemia featuring monocytosis. The CMML prognostic score used to give an indication of the median survival time of a patient depending on four factors '
      },
      {
        name: t('CPS_EG_BREAST_CANCER'),
        link: 'public/index.php/prognostic_scores/cps_prognostic_score',
        iFrameLink: 'prognostic_score',
        id: 'cpseg',
        keywords: ['cps_prognostic_score', 'cpseg'],
        description: 'Prognostic score for patients who have received neoadjuvant chemotherapy followed by curative intent surgery.'
      },
      {
        name: t('EUTOS'),
        link: 'public/index.php/prognostic_scores/eutos_prognostic_score',
        iFrameLink: 'prognostic_score',
        id: 'eutos',
        keywords: ['eutos_prognostic_score', 'eutos'],
        description: 'Chronic myelogenous (or myeloid) leukaemia (CML), also known as chronic granulocytic leukaemia (CGL), is a cancer of the white blood cells.'
      },
      {
        name: t('FLIPI'),
        link: 'public/index.php/prognostic_scores/flipi',
        iFrameLink: 'prognostic_score',
        id: 'flipi',
        keywords: ['flipi'],
        description: "Follicular lymphoma is the most common of the indolent non-Hodgkin's lymphomas, and the second-most-common form of non-Hodgkin's lymphomas overall.  The Follicular Lymphoma International Prognostic Index (FLIPI) is able to separate 3 risk groups clear differentiation of long-term prognosis based on 5 factors."
      },
      {
        name: t('FLIPI2'),
        link: 'public/index.php/prognostic_scores/flipi2',
        iFrameLink: 'prognostic_score',
        id: 'flipi2',
        keywords: ['flipi2'],
        description: 'The Follicular Lymphoma International Prognostic Index-2 (FLIPI2) , unlike the original FLIPI , which measures survival from diagnosis, the FLIPI2 is applied at the time of treatment for follicular lymphoma.'
      },
      {
        name: t('GEREATRIC_ASSESSMENT'),
        link: 'public/index.php/prognostic_scores/g8_geriatric_assessment_tool',
        iFrameLink: 'prognostic_score',
        id: 'g8',
        keywords: ['g8_geriatric_assessment_tool'],
        description: 'g8_geriatric_assessment_tool'
      },
      {
        name: t('GERMAN_HODGKIN_LYMPHOMA'),
        link: 'public/index.php/prognostic_scores/german_hodgkin_lymphoma',
        iFrameLink: 'prognostic_score',
        id: 'german_hodgk',
        keywords: ['german_hodgkin_lymphoma'],
        description: 'Developed by the German Hodgkin Lymphoma Study Group it is used by oncologists to aid in predicting the prognosis of patients.'
      },
      {
        name: t('IMDC'),
        link: 'public/index.php/prognostic_scores/heng_score',
        iFrameLink: 'prognostic_score',
        id: 'heng_score',
        keywords: ['heng_score'],
        description: 'The International Metastatic Renal Cell Carcinoma Database Consortium(IMDC) prognostic score (otherwise known as the Heng Score) is used to calculate the survival of a patient with metastatic renal cell cancer treated with VEG-F targeted therapy depending on six parameters.'
      },
      {
        name: t('CLL_IPI'),
        link: 'public/index.php/prognostic_scores/cll_ipi',
        iFrameLink: 'prognostic_score',
        id: 'cllipi',
        keywords: ['cll_ipi'],
        description: 'cll_ipi'
      },
      {
        name: t('IPI_AHL'),
        link: 'public/index.php/prognostic_scores/ipi_advanced_hodgkin_lymphoma',
        iFrameLink: 'prognostic_score',
        id: 'ipi',
        keywords: ['ipi_advanced_hodgkin_lymphoma'],
        description: 'The International Prognostic Index (IPI) is used by oncologists to aid in predicting the prognosis of patients depending on how many of the six factors apply to them, as determined by the oncologist. '
      },
      {
        name: t('LIPS3'),
        link: 'public/index.php/prognostic_scores/lips3_prognostic_score',
        iFrameLink: 'prognostic_score',
        id: 'lips3',
        keywords: ['lips3_prognostic_score'],
        description: 'The LIPS-3 score was developed in a multi-centre retrospective analysis of 201 patients (training cohort) and 583 patients (validation cohort) who were treated with first line Pembrolizumab for advanced NSCLC.'
      },
      {
        name: t('MANCHESTER_SCORE'),
        link: 'public/index.php/prognostic_scores/manchester_score',
        iFrameLink: 'prognostic_score',
        id: 'manchester',
        keywords: ['manchester_score'],
        description: 'Manchester score is the prognostic survival indicator for small cell lung cancer. '
      },
      {
        name: t('MDS'),
        link: 'public/index.php/prognostic_scores/mds_prognostic_score',
        iFrameLink: 'prognostic_score',
        id: 'mds',
        keywords: ['mds_prognostic_score', 'mds'],
        description: 'mds_prognostic_score'
      },
      {
        name: t('MGUS'),
        link: 'public/index.php/prognostic_scores/mgus_prognostic_score',
        iFrameLink: 'prognostic_score',
        id: 'mgus',
        keywords: ['mgus_prognostic_score', 'mgus'],
        description: 'mgus_prognostic_score'
      },
      {
        name: t('MSKCC'),
        link: 'public/index.php/prognostic_scores/motzer_score_interferon',
        iFrameLink: 'prognostic_score',
        id: 'mskcc',
        keywords: ['motzer_score_interferon'],
        description: 'Similar to Motzer Score for Advanced Renal Cell Carcinoma other then it gives the overall median survival based on Interferon treatment depending on how many of the five factors apply to them, as determined by the oncologist. . '
      },
      {
        name: t('RISS'),
        link: 'public/index.php/prognostic_scores/r_iss_prognostic_score',
        iFrameLink: 'prognostic_score',
        id: 'riss',
        keywords: ['r_iss_prognostic_score'],
        description: 'r_iss_prognostic_score'
      },
      {
        name: t('IPSSR'),
        link: 'public/index.php/prognostic_scores/lpssr_prognostic_score',
        iFrameLink: 'prognostic_score',
        id: 'lpssr',
        keywords: ['lpssr_prognostic_score', 'ipssr'],
        description: 'lpssr_prognostic_score'
      },
      {
        name: t('RISK_BONE_MARROW'),
        link: 'public/index.php/prognostic_scores/risk_bone_marrow',
        iFrameLink: 'prognostic_score',
        id: 'bone_marrow',
        keywords: ['risk_bone_marrow'],
        description: 'risk_bone_marrow'
      },
      {
        name: t('RISK_STRATIFICATION'),
        link: 'public/index.php/prognostic_scores/risk_stratification',
        iFrameLink: 'prognostic_score',
        id: 'risk_stratisfication',
        keywords: ['risk_stratification'],
        description: 'risk_stratification'
      },
      {
        name: t('SINS'),
        link: 'public/index.php/prognostic_scores/sins_prognostic_score',
        iFrameLink: 'prognostic_score',
        id: 'sins',
        keywords: ['sins_prognostic_score', 'sins'],
        description: 'sins_prognostic_score'
      },
      {
        name: t('SSIGN'),
        link: 'public/index.php/prognostic_scores/ssign_prognostic_score',
        iFrameLink: 'prognostic_score',
        id: 'ssign',
        keywords: ['ssign_prognostic_score','ssign'],
        description: 'ssign_prognostic_score'
      },
    ],    
    adjuvantTools : [
      {
        name: t('BREAST_CANCER'),
        link: 'public/index.php/adjuvant_tools/breast_cancer_survival',
        iFrameLink: 'adjuvant_tool',
        id: "bc",
        keyword: ["breast_cancer_survival"],
        description: "The tool is designed to give prognostication and treatment benefit to help clinicians and patients make informed decisions about treatment following breast cancer surgery. "
      },
      {
        name: t('COLON_CANCER'),
        link: 'public/index.php/adjuvant_tools/colon_cancer',
        iFrameLink: 'adjuvant_tool',
        id: "cc",
        keyword: "colon_cancer",
        description: "The adjuvant tool for Colon Cancer allows the Oncologists to see the five-year survival rate of a patient without chemotherapy and the advantage of have chemotherapy."
      },
      {
        name: t('GIST'),
        link: 'public/index.php/adjuvant_tools/gist',
        iFrameLink: 'adjuvant_tool',
        id: "gist",
        keyword: "gist",
        description: "The calculator gives the risk of reoccurrence in patients with completely resected GIST based on tumour rupture, site, size and mitotic count ."
      },
      {
        name: t('MELANOMA_TOOL'),
        link: 'public/index.php/adjuvant_tools/melanoma_tool',
        iFrameLink: 'adjuvant_tool',
        id: "melanoma",
        keyword: "melanoma_tool",
        description: "Adjuvant Melanoma tool allows users to input patient variables (e.g. age,  etc) and quantify the benefit of various existing drugs being used. "
      },
    ],
  };

  const TOOLS_SUB_ITEMS = [
    {
      name: t('FORMULAS'),
      link: 'public/index.php/formula',
      subSubItems: SUB_SUB_ITEMS.formulas,
      id: 'formula',
      keyword: 'formula',
      description: 'formula',
    },
    {
      name: t('FONG_SCORE'),
      link: '',
      iFrameLink: 'fong',
      id: 'fs',
      keywords: ['body_mass_index','bmi'],
      description : "bmi"
    },
    {
      name: t('PROGNOSTIC_SCORES'),
      link: 'public/index.php/prognostic_scores',
      subSubItems: SUB_SUB_ITEMS.prognosticScores,
      id: 'prognostic_scores',
      keyword: 'prognostic_scores',
      description: 'prognostic_scores',
    },
    {
      name: t('AJCC_TNM_STAGING'),
      link: 'public/index.php/ajcc',
      iFrameLink: 'ajcc_tnm_staging',
      id: 'ajcc',
      keyword: 'ajcc',
      description: 'ajcc',
    },
    {
      name: t('TOXICITY_GRADING'),
      link: 'public/index.php/ctcae_v5',
      iFrameLink: 'toxicity_grading',
      id: 'ctcae_v5',
      keyword: 'ctcae_v5',
      description: 'ctcae_v5',
    },
    {
      name: t('NCCN_TREATMENT_PROTOCOLS'),
      link: 'public/index.php/nccn_treatment',
      iFrameLink: 'nccn_protocol',
      id: 'nccn_treatment',
      keyword: 'nccn_treatment',
      description: 'nccn_treatment',
    },
    {
      name: t('DRUG_INFO'),
      link: 'public/index.php/spc_drug_info',
      iFrameLink: 'drug_info',
      id: 'spc_drug_info',
      keyword: 'spc_drug_info',
      description: 'spc_drug_info',
    },
    {
      name: t('DRUG_INTERACTION_CHECKER'),
      link: 'public/index.php/drug_interaction_checker',
      iFrameLink: 'drug_interaction_checker',
      id: 'drug_interaction_checker',
      keyword: 'drug_interaction_checker',
      description: 'drug_interaction_checker',
    },
    {
      name: t('ADJUVANT_TOOLS'),
      link: '#',
      subSubItems: SUB_SUB_ITEMS.adjuvantTools,
      iFrameLink: 'adjuvant_tool',
      id: 'adjuvant_tools',
      keyword: 'adjuvant_tools',
      description: 'adjuvant_tools',
    },
    {
      name: t('ADVANCED_BREAST_CANCER_TOOL'),
      link: 'public/index.php/advanced_breast_cancer_tool',
      iFrameLink: 'abc_tool',
      id: 'advanced_breast_cancer_tool',
      keyword: 'advanced_breast_cancer_tool',
      description: 'advanced_breast_cancer_tool',
    },
    {
      name: t('ONCOVIDEOS'),
      link: 'public/index.php/audio_video',
      iFrameLink: 'oncovideos',
      id: 'audio_video',
      keyword: 'audio_video',
      description: 'audio_video',
    },
    {
      name: t('IO_TOXICITY_TOOL'),
      link: 'public/index.php/io_toxicity_tool',
      iFrameLink: 'io_toxicity',
      id: 'io_toxicity_tool',
      keyword: 'io_toxicity_tool',
      description: 'io_toxicity_tool',
    },
    {
      name: t('PRODUCT_SERVICES'),
      link: 'public/index.php/cmf',
      iFrameLink: 'productservices',
      id: 'cmf',
      keyword: 'cmf',
      description: 'cmf',
    },
  ];
  

  const MENU_ITEMS = [
    { name: t('HOME'), icon: 'home', link: '/dashboard' },
    { name: t('SEARCH'), icon: 'search', link: '#' },
    { name: t('TOOLS'), icon: 'tool', link: '#', subItems: TOOLS_SUB_ITEMS },
    {
      name: t('FAVORITES'),
      icon: 'favorites',
      link: 'public/index.php/favourite',
      iFrameLink: 'favorites',
    },
    {
      name: t('PROFILE'),
      icon: 'profile',
      openType: 'dropdown', 
      link: '#'
    }
  ];
  return MENU_ITEMS;
};


export const useBottomMenuItems = () => {
  const { t } = useTranslation();

const BOTTOM_MENU_ITEMS = [
  { 
    name: t('ABOUT_US'), 
    link: 'public/index.php/about/oncoassist', 
    iFrameLink: 'about_oncoassist'
  },
  { 
    name: t('FEEDBACK'), 
    link: 'public/index.php/feedback', 
    iFrameLink: 'feedback'
  },
  { 
    name: t('TERMS_OF_USE'), 
    link: 'https://oncoassist-files.s3.eu-west-1.amazonaws.com/onco/assets/ONCOassist_TermsConditions.pdf', 
  },
  { 
    name: t('PRIVACY_POLICY'), 
    link: 'https://oncoassist-files.s3.eu-west-1.amazonaws.com/onco/assets/ONCOassist_PrivacyPolicy.pdf', 
  }
];
return BOTTOM_MENU_ITEMS
}


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
      },
      {
        name: t('BODY_SURFACE_AREA'),
        link: 'public/index.php/formula/body_surface_area',
        iFrameLink: 'formula',
      },
      {
        name: t('CARBOPLATIN_DOSAGE_CG'),
        link: 'public/index.php/formula/carboplatin_dosage_cg',
        iFrameLink: 'formula',
      },
      {
        name: t('CARBOPLATIN_DOSAGE_WRI'),
        link: 'public/index.php/formula/carboplatin_dosage_wri',
        iFrameLink: 'formula',
      },
      {
        name: t('CHILD_PUGH_SCORE'),
        link: 'public/index.php/formula/child_pugh_score',
        iFrameLink: 'formula',
      },
      {
        name: t('CORRECTED_CALCIUM'),
        link: 'public/index.php/formula/corrected_calcium',
        iFrameLink: 'formula',
      },
      {
        name: t('CORRECTED_QT_INTERVALS'),
        link: 'public/index.php/formula/corrected_qt_interval',
        iFrameLink: 'formula',
      },
      {
        name: t('CREATINE_CLEARENCE_CG'),
        link: 'public/index.php/formula/cockcroft_gault_equation',
        iFrameLink: 'formula',
      },
      {
        name: t('CREATINE_CLEARENCE_WRI'),
        link: 'public/index.php/formula/wright_equation',
        iFrameLink: 'formula',
      },
      {
        name: t('ECOG_PERFORMANCE'),
        link: 'public/index.php/formula/ecog_performance_score',
        iFrameLink: 'formula',
      },
      {
        name: t('GLASGOW_COMA_SCALE'),
        link: 'public/index.php/formula/glasgow_coma_scale',
        iFrameLink: 'formula',
      },
      {
        name: t('IBW_ABW_FORMULA'),
        link: 'public/index.php/formula/ibw_abw_formula',
        iFrameLink: 'formula',
      },
      {
        name: t('KARNOFSKY_PERFORMANCE'),
        link: 'public/index.php/formula/karnofsky_performance_score',
        iFrameLink: 'formula',
      },
      {
        name: t('KHORANA_SCORE'),
        link: 'public/index.php/formula/khorana_score',
        iFrameLink: 'formula',
      },
      {
        name: t('MASCC_RISK_INDEX'),
        link: 'public/index.php/formula/mascc_risk_index',
        iFrameLink: 'formula',
      },
      {
        name: t('OPIATE_ANALGESIC_CONVERTER'),
        link: 'public/index.php/formula/opiate_analgesic_converter',
        iFrameLink: 'formula',
      },
      {
        name: t('PSA_DOUBLING_TIME'),
        link: 'public/index.php/formula/psa_doubling_time',
        iFrameLink: 'formula',
      },
      {
        name: t('SMOKING_PACK_YEARS'),
        link: 'public/index.php/formula/smoking_pack_years',
        iFrameLink: 'formula',
      },
      {
        name: t('STEROID_EQUIVALENCE_CONVERTER'),
        link: 'public/index.php/formula/steroid_equivalence_converter',
        iFrameLink: 'formula',
      },
      {
        name: t('UPPER_LIMB_VEINS'),
        link: 'public/index.php/formula/upper_limb_veins',
        iFrameLink: 'formula',
      },
      {
        name: t('WELLS_SCORE_DVT'),
        link: 'public/index.php/formula/wells_score_dvt',
        iFrameLink: 'formula',
      },
      {
        name: t('WELLS_SCORE_PE'),
        link: 'public/index.php/formula/wells_score_pe',
        iFrameLink: 'formula',
      },
    ],
    prognosticScores : [
      {
        name: t('MYELOFIBROSIS_SCORING_TOOL'),
        link: 'public/index.php/prognostic_scores/myelofibrosis_scoring_tool',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('CARG_SCORE'),
        link: 'public/index.php/prognostic_scores/carg_prognostic_score',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('CTS5'),
        link: 'public/index.php/prognostic_scores/cts5_prognostic_score',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('CMML'),
        link: 'public/index.php/prognostic_scores/cmml_prognostic_score',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('CPS_EG_BREAST_CANCER'),
        link: 'public/index.php/prognostic_scores/cps_prognostic_score',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('EUTOS'),
        link: 'public/index.php/prognostic_scores/eutos_prognostic_score',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('FLIPI'),
        link: 'public/index.php/prognostic_scores/flipi',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('FLIPI2'),
        link: 'public/index.php/prognostic_scores/flipi2',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('FONG_SCORE'),
        link: 'public/index.php/prognostic_scores/fongscore',
        iFrameLink: 'fongscore',
      },
      {
        name: t('GEREATRIC_ASSESSMENT'),
        link: 'public/index.php/prognostic_scores/g8_geriatric_assessment_tool',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('GERMAN_HODGKIN_LYMPHOMA'),
        link: 'public/index.php/prognostic_scores/german_hodgkin_lymphoma',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('IMDC'),
        link: 'public/index.php/prognostic_scores/heng_score',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('CLL_IPI'),
        link: 'public/index.php/prognostic_scores/cll_ipi',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('IPI_AHL'),
        link: 'public/index.php/prognostic_scores/ipi_advanced_hodgkin_lymphoma',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('LIPS3'),
        link: 'public/index.php/prognostic_scores/lips3_prognostic_score',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('MANCHESTER_SCORE'),
        link: 'public/index.php/prognostic_scores/manchester_score',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('MDS'),
        link: 'public/index.php/prognostic_scores/mds_prognostic_score',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('MGUS'),
        link: 'public/index.php/prognostic_scores/mgus_prognostic_score',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('MSKCC'),
        link: 'public/index.php/prognostic_scores/motzer_score_interferon',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('RISS'),
        link: 'public/index.php/prognostic_scores/r_iss_prognostic_score',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('IPSSR'),
        link: 'public/index.php/prognostic_scores/lpssr_prognostic_score',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('RISK_BONE_MARROW'),
        link: 'public/index.php/prognostic_scores/risk_bone_marrow',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('RISK_STRATIFICATION'),
        link: 'public/index.php/prognostic_scores/risk_stratification',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('SINS'),
        link: 'public/index.php/prognostic_scores/sins_prognostic_score',
        iFrameLink: 'prognostic_score',
      },
      {
        name: t('SSIGN'),
        link: 'public/index.php/prognostic_scores/ssign_prognostic_score',
        iFrameLink: 'prognostic_score',
      },
    ],
    adjuvantTools : [
      {
        name: t('BREAST_CANCER'),
        link: 'public/index.php/adjuvant_tools/breast_cancer_survival',
        iFrameLink: 'adjuvant_tool',
      },
      {
        name: t('COLON_CANCER'),
        link: 'public/index.php/adjuvant_tools/colon_cancer',
        iFrameLink: 'adjuvant_tool',
      },
      {
        name: t('GIST'),
        link: 'public/index.php/adjuvant_tools/gist',
        iFrameLink: 'adjuvant_tool',
      },      
      {
        name: t('MELANOMA_TOOL'),
        link: 'public/index.php/adjuvant_tools/melanoma_tool',
        iFrameLink: 'adjuvant_tool',
      },
    ],
  };

  const TOOLS_SUB_ITEMS = [
    {
      name: t('FORMULAS'),
      link: 'public/index.php/formula',
      subSubItems: SUB_SUB_ITEMS.formulas,
    },
    {
      name: t('PROGNOSTIC_SCORES'),
      link: 'public/index.php/prognostic_scores',
      subSubItems: SUB_SUB_ITEMS.prognosticScores,
    },
    { 
      name: t('AJCC_TNM_STAGING'), 
      link: 'public/index.php/ajcc', 
      iFrameLink: 'ajcc_tnm_staging',
    },
    { 
      name: t('TOXICITY_GRADING'), 
      link: 'public/index.php/ctcae_v5', 
      iFrameLink: 'toxicity_grading',
    },
    { 
      name: t('NCCN_TREATMENT_PROTOCOLS'), 
      link: 'public/index.php/nccn_treatment', 
      iFrameLink: 'nccn_protocol',
    },
    { 
      name: t('DRUG_INFO'), 
      link: 'public/index.php/spc_drug_info', 
      iFrameLink: 'drug_info',
    },
    { 
      name: t('DRUG_INTERACTION_CHECKER'), 
      link: 'public/index.php/drug_interaction_checker', 
      iFrameLink: 'drug_interaction_checker',
    },
    {
      name: t('ADJUVANT_TOOLS'),
      link: '#',
      subSubItems: SUB_SUB_ITEMS.adjuvantTools,
      iFrameLink: 'adjuvant_tool',
    },
    {
      name: t('ADVANCED_BREAST_CANCER_TOOL'),
      link: 'public/index.php/advanced_breast_cancer_tool',
      iFrameLink: 'abc_tool',
    },
    { 
      name: t('ONCOVIDEOS'), 
      link: 'public/index.php/audio_video', 
      iFrameLink: 'oncovideos',
    },
    { 
      name: t('IO_TOXICITY_TOOL'), 
      link: 'public/index.php/io_toxicity_tool', 
      iFrameLink: 'io_toxicity',
    },
    { 
      name: t('MCRPC_PROSTATE'), 
      link: '', 
      iFrameLink: 'mcrpc_prostate',
      id: 'mcrpc',
      keywords: 'mcrpc, mcrpc_prostate',
      description : 'Systemic treatment options for metastatic castrate resistant prostate cancer (mCRPC) include AR pathway inhibitors (ARPi), cytotoxic chemotherapy, radioligand therapy, PARP inhibitors and others. This tool is designed to show efficacy outcomes with novel treatment options in recent clinical trials for mCRPC patients.'
    },
    { 
      name: t('PRODUCT_SERVICES'), 
      link: 'public/index.php/cmf', 
      iFrameLink: 'productservices',
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


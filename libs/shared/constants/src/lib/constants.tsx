export const PROD_MODE = process.env.APP_PROD_MODE || "local"; // Default to "local"

export const config = {
  webappURL: "https://webapp.oncoassist.com/",
  backendAPIURL: "https://app.oncoassist.com/api/",
  newsApiEndpoint : 'news/general',
  newsVoteEndpoint : 'news/upvote',
  userDetailsEndpoint : 'public/index.php/dashboard/getUserDetail',
  userIDEncKey : '8f75321b9e8d1b3ecee8d8533aa9d110c0d80292d3322c885643de2deaf61fd1',
  newsPerPage : 10,
  webappURLString : 'public/index.php/',
  firebaseDebugMode :  PROD_MODE === "production" ? false : true,
  firebaseApiKey : PROD_MODE === "production" ? '' : 'AIzaSyDMlJN1U23M_n8vc4jit74egmtoyx1r0_4',
  firebaseAuthDomain : PROD_MODE === "production" ? '' : 'devo-oncoassist.firebaseapp.com',
  firebaseProjectId : PROD_MODE === "production" ? '' : 'devo-oncoassist',
  firebaseStorageBucket : PROD_MODE === "production" ? '' : 'devo-oncoassist.appspot.com',
  firebaseMessagingSenderId : PROD_MODE === "production" ? '' : '595865021011',
  firebaseAppId : PROD_MODE === "production" ? '' : '1:595865021011:web:3e1bd4e8f8a544904b74a6',
  firebaseMeasurementId : PROD_MODE === "production" ? '' : 'G-2HKMZMXD2D',
  intercomAppId : PROD_MODE === "production" ? '' : 'bi84zhce',
  specialityBannerEndPoint : 'bannerspeciality/inline-banners',
  programmaticAdEndPoint : 'programmaticad',
};

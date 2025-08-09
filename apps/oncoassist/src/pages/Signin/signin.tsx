import React, { useEffect,useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userEmailSlice";
import IframeLoader from '../../components/IframeLoader/iFrameLoader';
import { config } from "@oncoassist/shared/constants";
import { logFirebaseEvent } from "../../utils/firebaseUtils";


export function Signin() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let iframeSrc = location.state?.iframeSrc ? `${config.webappURL}${location.state.iframeSrc}` : '';

  const [iframeKey, setIframeKey] = useState(Date.now());  

  useEffect(() => {
  // Only run this after handling UTM / Firebase events
  if (window.location.search) {
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  }
}, []);

  useEffect(() => {
    const handleMessage = (event : any) => {
 
      const email = localStorage.getItem('opuseremail');
      const userFullname = localStorage.getItem('opuser');
      const profession = localStorage.getItem('opprofession');
      const userObjectId = localStorage.getItem('userID');
      const userCountryfetched = localStorage.getItem('opgeoid');
      const userCountry = userCountryfetched ? userCountryfetched.split('-')[0].trim() : '';
      dispatch(setUser({opUserEmail:email,userName: userFullname, userProfession: profession,userID:userObjectId}));
     

      if (event.data === 'LOGIN_SUCCESS' || event?.data?.type === 'SIGNUP_SUCCESS') {
        const isLogin = event.data === 'LOGIN_SUCCESS';
        const isSignup = event?.data?.type === 'SIGNUP_SUCCESS';
        const registrationData = event.data?.data; 

        const utmQueryParamRaw = localStorage.getItem('utmQueryParam');
        const userParams: Record<string, any> = {
          parse_id: userObjectId,
          username: email,
          country: userCountry,
        };

        if (utmQueryParamRaw) {
          try {
            const parsedParams = JSON.parse(utmQueryParamRaw);
            Object.assign(userParams, parsedParams); // Merge UTM values directly

            if (isLogin) {
              logFirebaseEvent('Sign_In_Success', userParams);
            }

            if (isSignup) {             
              logFirebaseEvent('Registrations', registrationData);
            }

            localStorage.removeItem('utmQueryParam');
          } catch (err) {
            console.error('Error parsing utmQueryParam:', err);
          }
        } else {

          if (isLogin) {
            logFirebaseEvent('Sign_In_Success', userParams);
          }

          if (isSignup) {
            logFirebaseEvent('Registrations', registrationData);
          }
        }

        navigate('/dashboard');
      }
      
    };


    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [location.state?.iframeSrc,dispatch, navigate]);

 useEffect(() => {   
    setIframeKey(Date.now()); 
  }, [location.key]);

  

  // Redirect to Dashboard if iframeSrc is missing,on copy paste url
  if (!iframeSrc) {   
    iframeSrc = `${config.webappURL}public/index.php/login`;
  }



  return <IframeLoader key={iframeKey} iframeSrc={iframeSrc} />;
}

export default Signin;

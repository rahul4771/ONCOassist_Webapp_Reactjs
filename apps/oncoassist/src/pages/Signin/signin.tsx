import React, { useEffect,useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userEmailSlice";
import IframeLoader from '../../components/IframeLoader/iFrameLoader';
import { config } from "@oncoassist/shared/constants";

export function Signin() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let iframeSrc = location.state?.iframeSrc ? `${config.webappURL}${location.state.iframeSrc}` : '';

  const [iframeKey, setIframeKey] = useState(Date.now());


  useEffect(() => {
    const handleMessage = (event : any) => {
 
      const email = localStorage.getItem('opuseremail');
      const userFullname = localStorage.getItem('opuser');
      const profession = localStorage.getItem('opprofession');
      const userObjectId = localStorage.getItem('userID');
      dispatch(setUser({opUserEmail:email,userName: userFullname, userProfession: profession,userID:userObjectId}));
      // Navigate to dashboard after login success
      if (event.data === 'LOGIN_SUCCESS') {
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

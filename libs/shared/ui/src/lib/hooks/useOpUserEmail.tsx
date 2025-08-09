import { useState, useEffect } from 'react';

const useOpUserEmail = () => {
  const [opUserEmail, setOpUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch local storage data
    const fetchLocalStorageData = () => {
      const email = localStorage.getItem('opuseremail');
      setOpUserEmail(email);
    };

    fetchLocalStorageData();
  }, []);

  return opUserEmail;
};

export default useOpUserEmail;



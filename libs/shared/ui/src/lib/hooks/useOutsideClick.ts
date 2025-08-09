import { useEffect, useRef } from "react";

/**
 * Hook to handle clicks outside of the referenced element.
 */
const useOutsideClick = (isOpen: boolean, onClose: () => void) => {
  const ref = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {

      if ((event.target as HTMLElement).closest("[data-ignore-outside-click]")) {
        return; 
      }

      if (ref.current && !ref.current.contains(event.target as Node)) {
        setTimeout(() => onClose(), 100); 
      }
    };

    const handleWindowBlur = () => {
      setTimeout(() => onClose(), 100);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("blur", handleWindowBlur);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [isOpen, onClose]);

    
  return ref; 
};

export default useOutsideClick

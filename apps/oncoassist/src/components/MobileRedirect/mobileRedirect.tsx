import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface MobileRedirectProps {
  onClose: () => void;
}

const MobileRedirect: React.FC<MobileRedirectProps> = ({ onClose }) => {
  const appDeepLink = "oncoassist://home";
  const playStoreLink = "https://play.google.com/store/apps/details?id=com.oncoassist.core";
  const appStoreLink = "https://apps.apple.com/in/app/oncoassist/id558299114";

  const handleRedirect = () => {
    window.location.href = appDeepLink;
    setTimeout(() => {
      window.location.href = /iPhone|iPad|iPod/i.test(navigator.userAgent) ? appStoreLink : playStoreLink;
    }, 2000);
  };

  const handleDontAskAgain = () => {
    localStorage.setItem("hideMobilePopup", "true");
    onClose();
  };

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content" style={{ height: "200px" }}>
            <div className="modal-header" style={{ backgroundColor: "#1c93d1" }}>
              <div className="bootstrap-dialog-header">
                <div className="bootstrap-dialog-title" style={{ color: "#fff" }}>
                  Open in Mobile App?
                </div>
              </div>
              {/* X Close Button */}
              <button 
                className="close-btn" 
                onClick={onClose} 
                style={{ 
                position: "absolute",
                top: "8px",
                right: "12px",
                background: "none", 
                border: "none",
                color: "#fff",
                fontSize: "20px",
                cursor: "pointer"
                }}
                >
                &times;
                </button>
            </div>
            <div className="modal-body" style={{fontSize:"14px"}} >
              <p>For a better experience, use our mobile app.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary custom-primary" style={{ padding:"6px", fontSize:"14px"}} onClick={handleRedirect}>
                Open App
              </button>
              {/* <button className="btn btn-secondary custom-secondary" onClick={onClose}>
                Cancel
              </button> */}
              <button className="btn btn-secondary custom-secondary" style={{ padding:"6px", fontSize:"14px"}} onClick={handleDontAskAgain}>
                Don't ask again
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default MobileRedirect;
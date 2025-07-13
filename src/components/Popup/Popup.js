import { useState, useEffect } from "react";
import "./Popup.css";

let addPopupToQueue = () => { };
let closePopup = () => { };
const version = "1.1.0"

function PopupManager() {
  const [queue, setQueue] = useState([]);
  const [currentPopup, setCurrentPopup] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    addPopupToQueue = (popupData) => {
      setQueue((prev) => [...prev, popupData]);
    };

    closePopup = () => {
      setVisible(false);
      setTimeout(() => {
        setCurrentPopup(null);
      }, 300); // czas na animację znikania
    };
  }, []);

  useEffect(() => {
    if (!currentPopup && queue.length > 0) {
      const next = queue[0];
      setQueue((prev) => prev.slice(1));
      setCurrentPopup(next);
      setVisible(true);
    } else if (currentPopup && queue.length > 0 && queue[0].replace) {
      // Jeśli następny popup ma replace, zamknij obecny i pokaż nowy
      setVisible(false);
      setTimeout(() => {
        const next = queue[0];
        setQueue((prev) => prev.slice(1));
        setCurrentPopup(next);
        setVisible(true);
      }, 300); // czas na animację znikania
    }
  }, [queue, currentPopup]);

  useEffect(() => {
    if (!currentPopup) return;

    console.log("Popup shown:", currentPopup.message);
    const timeout = setTimeout(() => {
      closePopup();
    }, currentPopup.duration || 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentPopup]);

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return (
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        );
      case "error":
        return (
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        );
      case "warning":
        return (
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      case "info":
        return (
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
    }
  };

  return (
    <>
      {currentPopup && (
        <div style={currentPopup.style}
          className={`popup ${visible ? "show" : "hide"} ${currentPopup.type} ${currentPopup.position} 
          ${currentPopup.border ? "border" : ""}`}>
          {currentPopup.icon && <span className="popup-icon">{getIcon(currentPopup.type)}</span>}
          <span className="popup-message">{currentPopup.message}</span>
          <button className="close-btn" onClick={closePopup}>×</button>
        </div>
      )}
    </>
  );
}

// Użycie: showPopup({ message: "Treść", type: "error", duration: 5000, position: "top", style: { backgroundColor: 'red' }, border: true, icon: true, replace: true });
function showPopup({ message, type = "default", duration = 3000, position = "bottomLeft", style = {}, border = false, icon = false, replace = false }) {
  addPopupToQueue({ message, type, duration, position, style, border, icon, replace });
}

export { PopupManager, showPopup, closePopup, version };
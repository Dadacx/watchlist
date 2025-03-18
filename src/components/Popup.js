import { useEffect, useState } from 'react';
import '../styles/Popup.css';

const Popup = ({ content = 'Popup', duration = 8000, position = 'bottomLeft', color = 'default', onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false); // Ukrywamy popup zamiast usuwać go ręcznie
            if (onClose) onClose(); // Wywołujemy funkcję zamknięcia, jeśli została przekazana
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible) return null; // Jeśli popup ma być ukryty, zwracamy null

    return (
        <div className={`popup popup-position-${position} popup-color-${color}`}>
            <div className="popup-content">{content}</div>
            {/* <div className="popup-close" onClick={() => setVisible(false)}>X</div> */}
        </div>
    );
};

export default Popup;

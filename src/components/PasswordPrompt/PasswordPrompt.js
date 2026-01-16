import { useRef, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./PasswordPrompt.css";

const version = "1.0.3";

function showPasswordPrompt(title, subtitle) {
  return new Promise((resolve) => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    const close = () => {
      root.unmount();
      container.remove();
    };

    const handleSubmit = (value) => {
      resolve(value);
      close();
    };

    root.render(<PasswordPrompt onSubmit={handleSubmit} title={title} subtitle={subtitle} />);
  });
}

function PasswordPrompt({ onSubmit, title, subtitle }) {
  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOk = () => {
    const password = passwordRef.current?.value || "";
    onSubmit(password);
  };

  const handleCancel = () => {
    onSubmit(null);
  };

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && handleCancel();
    const enter = (e) => e.key === "Enter" && handleOk();
    document.addEventListener("keydown", esc);
    document.addEventListener("keydown", enter);
    return () => {
      document.removeEventListener("keydown", esc);
      document.removeEventListener("keydown", enter);
    };
  }, []);

  return (
    <div className="prompt-overlay">
      <div className="prompt-modal">
        <div className="prompt-title">
          <strong>{title || `Komunikat ze strony ${document.domain}`}</strong>
        </div>
        <label htmlFor="password" className="prompt-label">{subtitle || ``}</label>
        <div className="prompt-input-container">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            autoFocus
            ref={passwordRef}
            className="prompt-input"
          />
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={togglePasswordVisibility}
              className="prompt-input-icon"
              title="Ukryj hasło"
              style={{ cursor: 'pointer' }}
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
              <line x1="1" y1="1" x2="23" y2="23"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={togglePasswordVisibility}
              className="prompt-input-icon"
              title="Pokaż hasło"
              style={{ cursor: 'pointer' }}
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          )}
        </div>
        <div className="prompt-buttons">
          <button className="btn-ok" onClick={handleOk}>OK</button>
          <button className="btn-cancel" onClick={handleCancel}>Anuluj</button>
        </div>
      </div>
    </div>
  );
}

export { showPasswordPrompt, version };
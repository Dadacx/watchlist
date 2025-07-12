import { useRef, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./PasswordPrompt.css";
import showPasswordIcon from "./images/show_password.svg";
import hidePasswordIcon from "./images/hide_password.svg";

const version = "1.0.0";

export function showPasswordPrompt(title, subtitle) {
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
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
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
          <img
            src={showPassword ? hidePasswordIcon : showPasswordIcon}
            alt="Toggle password visibility"
            onClick={togglePasswordVisibility}
            className="prompt-input-icon"
            title={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
          />
        </div>
        <div className="prompt-buttons">
          <button className="btn-ok" onClick={handleOk}>OK</button>
          <button className="btn-cancel" onClick={handleCancel}>Anuluj</button>
        </div>
      </div>
    </div>
  );
}
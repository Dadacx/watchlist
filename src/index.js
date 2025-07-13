import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DevToolsProvider } from './components/DevToolsContext';
import packageJson from '../package.json';
import { version as popupVersion } from './components/Popup/Popup';
import { version as passwordPromptVersion } from './components/PasswordPrompt/PasswordPrompt';

console.log(`v${packageJson.version}`);
console.log(`Popup v${popupVersion}`);
console.log(`PasswordPrompt v${passwordPromptVersion}`);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DevToolsProvider>
    <App />
  </DevToolsProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
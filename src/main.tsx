import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

async function prepare() {
  /*
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'warn',
    });
  }
  */

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}



prepare();
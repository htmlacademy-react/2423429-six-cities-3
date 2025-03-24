import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import { offers } from './mocks/offers';
import { AuthorizationStatus } from './const';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={offers} authorizationStatus={AuthorizationStatus.Auth} />
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import ErrorMessage from './components/error-message/error-message';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOffersAction } from './store/offers/offers-slice';
import { checkAuthAction } from './store/user/user-slice';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>
);

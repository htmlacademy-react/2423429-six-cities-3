import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import ErrorMessage from './components/error-message/error-message';
import { reviews } from './mocks/reviews';
import { nearOffers } from './mocks/near-offers';
import { offerTemplate } from './mocks/offerTemplate';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction } from './store/user-slice';
import { fetchOffersAction } from './store/offers-slice';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App
        reviews={reviews}
        nearOffers={nearOffers}
        offerTemplate={offerTemplate}
        offers={[]}
      />
    </Provider>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';

import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { nearOffers } from './mocks/near-offers';
import { offerTemplate } from './mocks/offerTemplate';
import { AuthorizationStatus } from './const';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offers={offers}
      reviews={reviews}
      authorizationStatus={AuthorizationStatus.Auth}
      nearOffers={nearOffers}
      offerTemplate={offerTemplate}
    />
  </React.StrictMode>
);
